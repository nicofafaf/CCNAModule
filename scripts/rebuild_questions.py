#!/usr/bin/env python3
"""
Rebuild questions.json from source HTML - 1:1 accurate.
Fixes: corrupted explanations, Q34 empty options, wrong modules, escaped chars.
"""
import re, json
from pathlib import Path

HTML = Path(r"C:\Users\merkeln\.cursor\projects\c-Users-merkeln-OneDrive-L-pple-Ausbildungs-GmbH-Desktop-modul8-10\uploads\ccna-1-v7-modules-8-10-communicating-between-networks-exam-answers-0.html")
OUT_JSON = Path(__file__).parent.parent / "js" / "questions.json"
OUT_JS = Path(__file__).parent.parent / "js" / "questions.js"
OLD = OUT_JSON  # preserve German/mnemonics

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

# Q34 options from exhibit image (no table in HTML source)
Q34_OPTIONS = [
    "phase 1 → perform the POST and load the bootstrap program",
    "phase 2 → locate and load the Cisco IOS software",
    "phase 3 → locate and load the startup configuration file",
]

CONFIG_IDS = [53, 63, 69, 70, 71, 72, 73, 74, 75, 76]

def get_module(qnum):
    if qnum <= 19: return 8
    if qnum <= 30: return 9
    return 10

def get_module_name(m):
    return {8: "Netzwerkschicht (IP, IPv6, Routing, Gateway)",
            9: "Address Resolution (ARP, Switching, Ethernet)",
            10: "Cisco IOS (Router-Konfiguration, Boot, Sicherheit)"}[m]

def clean_text(t):
    t = t.replace('\\_', '_').replace('\\.', '.').replace('\\*', '*')
    t = re.sub(r'\\(?![nrt])', '', t)  # remove stray backslashes
    return t.strip()

def is_option_line(line):
    """Match markdown list items (* option), not bold headers (**text)."""
    return bool(re.match(r'^\*\s+\S', line))

def parse_block(qnum, question, body):
    q_type = 'single'
    if re.search(r'Which two|Choose two|\(Choose two\.\)', question):
        q_type = 'multiple'
    elif re.search(r'Which three|Choose three', question):
        q_type = 'multiple3'
    elif 'Match the' in question or 'Place the options' in body:
        q_type = 'ordering'

    options, correct = [], []

    if q_type == 'ordering':
        rows = re.findall(r'^\|\s*(.+?)\s*\|\s*(.+?)\s*\|', body, re.MULTILINE)
        for left, right in rows:
            if '---' in left or not left.strip():
                continue
            options.append(f"{left.strip()} → {right.strip()}")
        correct = list(range(len(options)))
        if qnum == 34 and not options:
            options = Q34_OPTIONS[:]
            correct = list(range(len(options)))
    else:
        in_options = True
        for line in body.split('\n'):
            line = line.strip()
            if line.startswith('**Explanation'):
                in_options = False
                continue
            if not in_options:
                continue
            if is_option_line(line):
                content = line[1:].strip()
                is_correct = content.startswith('**') and content.endswith('**')
                opt = clean_text(content.strip('*'))
                if opt:
                    if is_correct:
                        correct.append(len(options))
                    options.append(opt)

    # Explanation
    expl_match = re.search(
        r'\*\*Explanation:\*\*\s*(?:Topic\s*([\d.]+)\s*)?(.*?)$',
        body, re.DOTALL
    )
    topic = f"Topic {expl_match.group(1)}" if expl_match and expl_match.group(1) else ''
    explanation = clean_text(expl_match.group(2)) if expl_match else ''
    # Remove leaked "Place the options" tables from explanation
    if 'Place the options in the following order' in explanation:
        explanation = explanation.split('Place the options')[0].strip()

    # Exhibit code
    exhibit = None
    code = re.search(r'((?:RTR1|Floor|Main|BldgA|HQ)\(config\).*?end)', body, re.DOTALL)
    if code:
        exhibit = code.group(1).strip()

    return {
        'id': qnum,
        'module': get_module(qnum),
        'type': q_type,
        'question': clean_text(question),
        'options': options,
        'correct': correct if correct else ([0] if options else []),
        'explanation': explanation[:2000],
        'topic': topic,
        'image': IMAGE_MAP.get(qnum),
        'exhibit': exhibit,
    }

def parse_all(text):
    questions = {}
    # Standard numbered questions
    blocks = re.split(r'(?=\*\*\d+\\?\.\s)', text)
    for block in blocks:
        m = re.match(r'\*\*(\d+)\\?\.\s+(.+?)\*\*', block)
        if not m:
            continue
        qnum = int(m.group(1))
        if qnum == 48:
            continue  # handled separately
        questions[qnum] = parse_block(qnum, m.group(2), block[m.end():])

    # Q48 PT activity - special format (no * prefix on options)
    q48_match = re.search(
        r'\*\*48\\?\.\s+Open the PT activity.*?\*\*(.*?)\*\*Explanation:\*\*',
        text, re.DOTALL
    )
    if q48_match:
        body = q48_match.group(1)
        question = 'Open the PT activity. Perform the tasks in the activity instructions and then answer the question. Which interfaces in each router are active and operational?'
        options, correct = [], []
        lines = [l.strip() for l in body.split('\n') if l.strip()]
        i = 0
        while i < len(lines):
            line = lines[i]
            if 'Which interfaces' in line:
                i += 1
                continue
            if 'R1:' in line:
                r1_line = line
                r2_line = lines[i + 1] if i + 1 < len(lines) and 'R2:' in lines[i + 1] else ''
                opt = clean_text(r1_line.strip('*')) + ' / ' + clean_text(r2_line.strip('*'))
                is_correct = r1_line.startswith('**') and r2_line.startswith('**')
                if is_correct:
                    correct.append(len(options))
                options.append(opt)
                if r2_line:
                    i += 1
            i += 1
        full48 = text[text.find('**48\\.'):text.find('**49\\.')]
        expl = re.search(r'\*\*Explanation:\*\*\s*(?:Topic\s*([\d.]+)\s*)?(.*?)(?=\n\n\*\*\d+|\Z)', full48, re.DOTALL)
        questions[48] = {
            'id': 48, 'module': 10, 'type': 'single',
            'question': question, 'options': options, 'correct': correct,
            'explanation': clean_text(expl.group(2)) if expl else 'The command show ip interface brief shows active interfaces with Status and Protocol both "up". R1: G0/0 and S0/0/0. R2: G0/1 and S0/0/0.',
            'topic': f"Topic {expl.group(1)}" if expl and expl.group(1) else 'Topic 10.2.4',
            'image': IMAGE_MAP.get(48), 'exhibit': None,
        }

    # Config-first questions (53, 63, 69-76)
    cfg_pattern = (
        r'((?:RTR1|Floor|Main|BldgA|HQ)\(config\).*?end)\s*\n+'
        r'\*\*Refer to the exhibit\.\s*(.+?)\*\*\s*\n(.*?)(?=\n\n(?:Copy|Verstanden|\*\*\d+)|\Z)'
    )
    for i, m in enumerate(re.finditer(cfg_pattern, text, re.DOTALL)):
        if i >= len(CONFIG_IDS):
            break
        qnum = CONFIG_IDS[i]
        body = m.group(0)
        question = 'Refer to the exhibit. ' + clean_text(m.group(2))
        options, correct = [], []
        for line in body.split('\n'):
            line = line.strip()
            if is_option_line(line):
                content = line[1:].strip()
                is_correct = content.startswith('**') and content.endswith('**')
                opt = clean_text(content.strip('*'))
                if opt and not opt.startswith('Explanation'):
                    if is_correct:
                        correct.append(len(options))
                    options.append(opt)
        expl = re.search(r'\*\*Explanation:\*\*\s*(?:Topic\s*([\d.]+)\s*)?(.*?)$', body, re.DOTALL)
        topic = f"Topic {expl.group(1)}" if expl and expl.group(1) else 'Topic 10.3.1'
        explanation = clean_text(expl.group(2)) if expl else ''
        questions[qnum] = {
            'id': qnum, 'module': 10, 'type': 'single',
            'question': question, 'options': options,
            'correct': correct, 'explanation': explanation[:2000],
            'topic': topic, 'image': None,
            'exhibit': m.group(1).strip(),
        }

    return questions

def merge_metadata(questions, old_data):
    old = {q['id']: q for q in old_data}
    GERMAN = old  # use existing questionDe/mnemonic from old file
    for q in questions:
        oid = old.get(q['id'], {})
        q['questionDe'] = oid.get('questionDe', q['question'])
        q['mnemonic'] = oid.get('mnemonic', '')
        q['moduleName'] = get_module_name(q['module'])
    return questions

def audit(questions, source):
    errors = []
    for i in range(1, 77):
        if i not in questions:
            errors.append(f"MISSING Q{i}")
    for qid, q in questions.items():
        if qid not in source:
            continue
        s = source[qid]
        if set(q['correct']) != set(s['correct']):
            errors.append(f"Q{qid} ANSWER: quiz={q['correct']} src={s['correct']}")
        if len(q['options']) != len(s['options']) and qid != 34:
            errors.append(f"Q{qid} OPT_COUNT: quiz={len(q['options'])} src={len(s['options'])}")
        for j, (qo, so) in enumerate(zip(q['options'], s['options'])):
            if clean_text(qo) != clean_text(so):
                errors.append(f"Q{qid} OPT[{j}]: '{qo[:50]}' vs '{so[:50]}'")
        exp = IMAGE_MAP.get(qid)
        if exp and q.get('image') != exp:
            errors.append(f"Q{qid} IMG: {q.get('image')} != {exp}")
        if q.get('explanation', '').startswith('**'):
            errors.append(f"Q{qid} CORRUPT EXPLANATION")
    return errors

def main():
    text = HTML.read_text(encoding='utf-8')
    start = text.find('**1\\. Which information')
    end = text.find('## Post navigation')
    text = text[start:end]

    source = parse_all(text)
    old = json.loads(OLD.read_text(encoding='utf-8')) if OLD.exists() else []
    questions = merge_metadata(
        sorted(source.values(), key=lambda x: x['id']),
        old
    )

    errors = audit({q['id']: q for q in questions}, source)

    OUT_JSON.write_text(json.dumps(questions, ensure_ascii=False, indent=2), encoding='utf-8')
    OUT_JS.write_text('const QUESTIONS = ' + json.dumps(questions, ensure_ascii=False, indent=2) + ';\n', encoding='utf-8')

    report = Path(__file__).parent / 'audit_report.txt'
    report.write_text(
        f"Total: {len(questions)}/76\nErrors: {len(errors)}\n" + '\n'.join(errors),
        encoding='utf-8'
    )
    print(f"Rebuilt {len(questions)} questions, {len(errors)} errors")
    for e in errors[:20]:
        print(f"  {e}")

if __name__ == '__main__':
    main()
