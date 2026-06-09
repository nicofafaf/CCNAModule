#!/usr/bin/env python3
"""Fill empty explanations from HTML source."""
import re, json
from pathlib import Path

HTML = Path(r"C:\Users\merkeln\.cursor\projects\c-Users-merkeln-OneDrive-L-pple-Ausbildungs-GmbH-Desktop-modul8-10\uploads\ccna-1-v7-modules-8-10-communicating-between-networks-exam-answers-0.html")
JSON = Path(__file__).parent.parent / "js" / "questions.json"

text = HTML.read_text(encoding='utf-8')
start = text.find('**1\\. Which information')
end = text.find('## Post navigation')
text = text[start:end]

explanations = {}
for m in re.finditer(r'\*\*(\d+)\\?\.\s+.+?\*\*.*?\*\*Explanation:\*\*\s*(?:Topic\s*[\d.]+\s*)?(.*?)(?=\n\n\*\*\d+|\n\n##|\Z)', text, re.DOTALL):
    explanations[int(m.group(1))] = m.group(2).strip()[:1500]

questions = json.loads(JSON.read_text(encoding='utf-8'))
for q in questions:
    if not q.get('explanation') and q['id'] in explanations:
        q['explanation'] = explanations[q['id']]

JSON.write_text(json.dumps(questions, ensure_ascii=False, indent=2), encoding='utf-8')
js = JSON.parent / 'questions.js'
js.write_text('const QUESTIONS = ' + json.dumps(questions, ensure_ascii=False, indent=2) + ';\n', encoding='utf-8')
filled = sum(1 for q in questions if q.get('explanation'))
print(f"Explanations filled: {filled}/{len(questions)}")
