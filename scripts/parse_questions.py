#!/usr/bin/env python3
"""Parse CCNA exam HTML and generate questions.json"""
import re
import json
from pathlib import Path

HTML_PATH = Path(r"C:\Users\merkeln\.cursor\projects\c-Users-merkeln-OneDrive-L-pple-Ausbildungs-GmbH-Desktop-modul8-10\uploads\ccna-1-v7-modules-8-10-communicating-between-networks-exam-answers-0.html")
OUT_PATH = Path(__file__).parent.parent / "js" / "questions.json"

IMAGE_MAP = {
    15: "assets/images/q15-routing.png",
    25: "assets/images/q25-switch.png",
    28: "assets/images/q28-arp.jpg",
    31: "assets/images/q31-commands.jpg",
    33: "assets/images/q33-access.jpg",
    34: "assets/images/q34-boot.jpg",
    35: "assets/images/q35-modes.jpg",
    40: "assets/images/q40-network.png",
    41: "assets/images/q41-config.jpg",
    43: "assets/images/q43-pc1.png",
    48: "assets/images/q48-pt.jpg",
}

def get_module(qnum):
    if qnum <= 19:
        return 8
    if qnum <= 31:
        return 9
    return 10

def parse_questions(text):
    blocks = re.split(r'\n(?=\*\*\d+\\?\.)', text)
    questions = []

    for block in blocks:
        header = re.match(r'\*\*(\d+)\\?\.\s+(.+?)\*\*', block)
        if not header:
            continue
        qnum = int(header.group(1))
        question_text = header.group(2).strip()
        body = block[header.end():]

        # Determine type
        q_type = 'single'
        if re.search(r'Choose two|Wähle zwei|\(Choose two\.\)', question_text):
            q_type = 'multiple'
        elif re.search(r'Choose three', question_text):
            q_type = 'multiple3'
        elif 'Match the' in question_text or 'Place the options' in body:
            q_type = 'ordering'

        options = []
        correct = []

        if q_type == 'ordering':
            rows = re.findall(r'^\|\s*(.+?)\s*\|\s*(.+?)\s*\|', body, re.MULTILINE)
            for left, right in rows:
                if '---' in left or left.strip() == '':
                    continue
                options.append(f"{left.strip()} → {right.strip()}")
            correct = list(range(len(options)))
        else:
            for line in body.split('\n'):
                line = line.strip()
                if not line.startswith('*'):
                    if line.startswith('**Explanation'):
                        break
                    continue
                content = line[1:].strip()
                is_correct = content.startswith('**') and content.endswith('**')
                if is_correct:
                    opt = content.strip('*').strip()
                    correct.append(len(options))
                else:
                    opt = content.strip('*').strip()
                if opt and not opt.startswith('Explanation'):
                    options.append(opt)

        expl_match = re.search(r'\*\*Explanation:\*\*\s*(?:Topic\s*([\d.]+)\s*)?(.*?)(?=\n\n\*\*\d+|\n\n## |\Z)', body, re.DOTALL)
        topic = expl_match.group(1) if expl_match else ''
        explanation = expl_match.group(2).strip() if expl_match else ''

        # Code exhibit for router config questions
        exhibit = None
        code_match = re.search(
            r'((?:RTR1|Floor|Main|BldgA|HQ)\(config\).*?end)',
            body, re.DOTALL
        )
        if code_match:
            exhibit = code_match.group(1).strip()

        if not options and q_type != 'ordering':
            continue

        questions.append({
            'id': qnum,
            'module': get_module(qnum),
            'type': q_type,
            'question': question_text,
            'options': options,
            'correct': correct if correct else [0],
            'explanation': explanation[:2000],
            'topic': f"Topic {topic}" if topic else '',
            'image': IMAGE_MAP.get(qnum),
            'exhibit': exhibit,
        })

    return sorted(questions, key=lambda x: x['id'])

if __name__ == '__main__':
    text = HTML_PATH.read_text(encoding='utf-8')
    start = text.find('**1\\. Which information')
    end = text.find('## Post navigation')
    text = text[start:end]
    questions = parse_questions(text)
    OUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUT_PATH.write_text(json.dumps(questions, ensure_ascii=False, indent=2), encoding='utf-8')
    print(f"Parsed {len(questions)} questions -> {OUT_PATH}")
