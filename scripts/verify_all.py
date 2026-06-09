#!/usr/bin/env python3
"""Final verification of all 76 questions."""
import json, re
from pathlib import Path

JSON = Path(__file__).parent.parent / "js" / "questions.json"
HTML = Path(r"C:\Users\merkeln\.cursor\projects\c-Users-merkeln-OneDrive-L-pple-Ausbildungs-GmbH-Desktop-modul8-10\uploads\ccna-1-v7-modules-8-10-communicating-between-networks-exam-answers-0.html")
IMG = Path(__file__).parent.parent / "assets" / "images"

questions = json.loads(JSON.read_text(encoding='utf-8'))
errors = []

if len(questions) != 76:
    errors.append(f"COUNT: {len(questions)} != 76")

ids = [q['id'] for q in questions]
if ids != list(range(1, 77)):
    missing = [i for i in range(1, 77) if i not in ids]
    errors.append(f"MISSING IDs: {missing}")

for q in questions:
    qid = q['id']
    if not q.get('options'):
        errors.append(f"Q{qid}: NO OPTIONS")
    if not q.get('correct'):
        errors.append(f"Q{qid}: NO CORRECT ANSWER")
    for c in q['correct']:
        if c >= len(q['options']):
            errors.append(f"Q{qid}: correct index {c} out of range")
    if q.get('explanation', '').startswith('**'):
        errors.append(f"Q{qid}: CORRUPT EXPLANATION")
    if q.get('image'):
        img_path = Path(__file__).parent.parent / q['image']
        if not img_path.exists():
            errors.append(f"Q{qid}: IMAGE MISSING {q['image']}")
    # Check question text duplicated in options
    for opt in q['options']:
        if opt == q['question'] or (len(opt) > 50 and opt in q['question']):
            errors.append(f"Q{qid}: QUESTION DUPLICATED IN OPTIONS")
            break
    # Multiple choice type check
    if 'Which two' in q['question'] and q['type'] not in ('multiple', 'ordering'):
        if len(q['correct']) != 2:
            errors.append(f"Q{qid}: 'Which two' but correct={q['correct']}")
        if q['type'] != 'multiple':
            errors.append(f"Q{qid}: 'Which two' but type={q['type']}")
    if 'Which three' in q['question'] and q['type'] != 'multiple3':
        errors.append(f"Q{qid}: 'Which three' but type={q['type']}")

# Image-question mapping verification
EXPECTED_IMAGES = {
    15: "q15-routing.png",
    25: "q25-switch.png",
    28: "q28-arp.jpg",
    31: "q31-commands.jpg",
    33: "q33-access.jpg",
    34: "q34-boot.jpg",
    35: "q35-modes.jpg",
    40: "q40-network.png",
    41: "q41-config.jpg",
    43: "q43-pc1.png",
    48: "q48-pt.jpg",
}
for qid, fname in EXPECTED_IMAGES.items():
    q = next(x for x in questions if x['id'] == qid)
    if fname not in (q.get('image') or ''):
        errors.append(f"Q{qid}: wrong image {q.get('image')} expected {fname}")

report = f"VERIFICATION: {len(errors)} errors\n" + "\n".join(errors)
Path(__file__).parent.joinpath("verify_report.txt").write_text(report, encoding='utf-8')
print(report if errors else "ALL 76 QUESTIONS VERIFIED OK")
