#!/usr/bin/env python3
"""Full audit: compare questions.json against source HTML."""
import re, json
from pathlib import Path

HTML = Path(r"C:\Users\merkeln\.cursor\projects\c-Users-merkeln-OneDrive-L-pple-Ausbildungs-GmbH-Desktop-modul8-10\uploads\ccna-1-v7-modules-8-10-communicating-between-networks-exam-answers-0.html")
JSON = Path(__file__).parent.parent / "js" / "questions.json"

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

def parse_source(text):
    start = text.find('**1\\. Which information')
    end = text.find('## Post navigation')
    text = text[start:end]
    blocks = re.split(r'\n(?=\*\*\d+\\?\.)', text)
    source = {}

    for block in blocks:
        header = re.match(r'\*\*(\d+)\\?\.\s+(.+?)\*\*', block)
        if not header:
            # Config-before-question format (53+)
            cfg = re.search(r'((?:RTR1|Floor|Main|BldgA|HQ)\(config\).*?end)', block, re.DOTALL)
            ref = re.search(r'\*\*Refer to the exhibit\.\s*(.+?)\*\*', block)
            if cfg and ref:
                # find question number from nearby context - use exhibit+question as key
                pass
            continue
        qnum = int(header.group(1))
        question = header.group(2).strip()
        body = block[header.end():]

        options = []
        correct = []
        for line in body.split('\n'):
            line = line.strip()
            if not line.startswith('*'):
                if line.startswith('**Explanation'):
                    break
                continue
            content = line[1:].strip()
            is_correct = content.startswith('**') and content.endswith('**')
            opt = content.strip('*').strip()
            if opt and not opt.startswith('Explanation'):
                if is_correct:
                    correct.append(len(options))
                options.append(opt)

        # Match/ordering tables
        if 'Place the options' in body or 'Match the' in question:
            rows = re.findall(r'^\|\s*(.+?)\s*\|\s*(.+?)\s*\|', body, re.MULTILINE)
            options = []
            for left, right in rows:
                if '---' in left:
                    continue
                options.append(f"{left.strip()} → {right.strip()}")
            correct = list(range(len(options)))

        expl = re.search(r'\*\*Explanation:\*\*\s*(?:Topic\s*([\d.]+)\s*)?(.*?)(?=\n\n\*\*\d+|\n\n##|\Z)', body, re.DOTALL)
        explanation = expl.group(2).strip()[:500] if expl else ''

        source[qnum] = {
            'question': question,
            'options': options,
            'correct': correct,
            'explanation': explanation,
        }

    # Parse config questions separately
    config_pattern = r'((?:RTR1|Floor|Main|BldgA|HQ)\(config\).*?end)\s*\n+\s*\*\*Refer to the exhibit\.\s*(.+?)\*\*'
    config_ids = [53, 63, 69, 70, 71, 72, 73, 74, 75, 76]
    for i, m in enumerate(re.finditer(config_pattern, text, re.DOTALL)):
        if i >= len(config_ids):
            break
        qnum = config_ids[i]
        body = m.group(0)
        options, correct = [], []
        for line in body.split('\n'):
            line = line.strip()
            if line.startswith('*'):
                content = line[1:].strip()
                is_correct = content.startswith('**') and content.endswith('**')
                opt = content.strip('*').strip()
                if opt and not opt.startswith('Explanation'):
                    if is_correct:
                        correct.append(len(options))
                    options.append(opt)
        source[qnum] = {
            'question': 'Refer to the exhibit. ' + m.group(2).strip(),
            'options': options,
            'correct': correct,
            'explanation': '',
        }

    return source

def main():
    text = HTML.read_text(encoding='utf-8')
    source = parse_source(text)
    quiz = {q['id']: q for q in json.loads(JSON.read_text(encoding='utf-8'))}

    errors = []
    warnings = []

    # Check count
    for i in range(1, 77):
        if i not in quiz:
            errors.append(f"MISSING in quiz: Q{i}")
        if i not in source:
            warnings.append(f"MISSING in source parse: Q{i}")

    for qid in range(1, 77):
        if qid not in quiz or qid not in source:
            continue
        q = quiz[qid]
        s = source[qid]

        # Correct answers
        if set(q['correct']) != set(s['correct']):
            errors.append(f"Q{qid} WRONG ANSWER: quiz={q['correct']} source={s['correct']}")

        # Options count
        if len(q['options']) != len(s['options']):
            errors.append(f"Q{qid} OPTION COUNT: quiz={len(q['options'])} source={len(s['options'])}")

        # Options content
        for i, (qo, so) in enumerate(zip(q['options'], s['options'])):
            if qo.strip() != so.strip():
                errors.append(f"Q{qid} OPTION[{i}] MISMATCH: quiz='{qo[:60]}' source='{so[:60]}'")

        # Image check
        expected_img = IMAGE_MAP.get(qid)
        if expected_img and q.get('image') != expected_img:
            errors.append(f"Q{qid} IMAGE WRONG: {q.get('image')} expected {expected_img}")
        if q.get('image') and qid not in IMAGE_MAP:
            warnings.append(f"Q{qid} has image but not in IMAGE_MAP")

    # Questions that SHOULD have images per source page
    for qid, img in IMAGE_MAP.items():
        if qid in quiz and not quiz[qid].get('image'):
            errors.append(f"Q{qid} MISSING IMAGE: should have {img}")

    print("=== AUDIT RESULTS ===")
    print(f"Source parsed: {len(source)} questions")
    print(f"Quiz has: {len(quiz)} questions")
    print(f"\nERRORS ({len(errors)}):")
    for e in errors:
        print(f"  ❌ {e}")
    print(f"\nWARNINGS ({len(warnings)}):")
    for w in warnings:
        print(f"  ⚠️  {w}")
    if not errors:
        print("\n✅ No critical errors found!")

if __name__ == '__main__':
    main()
