#!/usr/bin/env python3
"""Audit EN source vs quiz data and German translation completeness."""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).parent.parent
HTML = Path(r"C:\Users\merkeln\.cursor\projects\c-Users-merkeln-OneDrive-L-pple-Ausbildungs-GmbH-Desktop-modul8-10\uploads\ccna-1-v7-modules-8-10-communicating-between-networks-exam-answers-0.html")
JSON_PATH = ROOT / "js" / "questions.json"
sys.path.insert(0, str(Path(__file__).parent))
from options_de import OPTIONS_DE  # noqa: E402


def parse_source(html_text):
    start = html_text.find("**1\\. Which information")
    end = html_text.find("## Post navigation")
    text = html_text[start:end]
    parts = re.split(r"\n\*\*(\d+)\\\. ", text)
    out = {}
    for i in range(1, len(parts), 2):
        qnum = int(parts[i])
        chunk = parts[i + 1]
        lines = chunk.split("\n")
        question = lines[0].strip()
        body = "\n".join(lines[1:])
        options, correct = [], []
        if "Match the" in question or "Place the options" in body:
            rows = re.findall(r"^\|\s*(.+?)\s*\|\s*(.+?)\s*\|", body, re.MULTILINE)
            for left, right in rows:
                if "---" in left or not left.strip():
                    continue
                options.append(f"{left.strip()} → {right.strip()}")
            correct = list(range(len(options)))
        else:
            for line in body.split("\n"):
                line = line.strip()
                if not line.startswith("* "):
                    continue
                opt = line[2:].strip()
                if opt.startswith("**") and opt.endswith("**"):
                    opt = opt[2:-2]
                    correct.append(len(options))
                options.append(opt)
        out[qnum] = {"question": question, "options": options, "correct": correct}
    return out


def main():
    html = HTML.read_text(encoding="utf-8")
    source = parse_source(html)
    quiz = {q["id"]: q for q in json.loads(JSON_PATH.read_text(encoding="utf-8"))}
    issues = []

    for qid in range(1, 77):
        if qid not in source:
            issues.append(f"Q{qid}: missing in source HTML")
            continue
        if qid not in quiz:
            issues.append(f"Q{qid}: missing in quiz")
            continue
        s, q = source[qid], quiz[qid]
        if s["question"] != q["question"].replace("\u200b", "").strip():
            issues.append(f"Q{qid} EN QUESTION mismatch")
        if len(s["options"]) != len(q["options"]):
            issues.append(f"Q{qid} option count src={len(s['options'])} quiz={len(q['options'])}")
        for i, (so, qo) in enumerate(zip(s["options"], q["options"])):
            if so.replace("\u200b", "").strip() != qo.replace("\u200b", "").strip():
                issues.append(f"Q{qid} EN opt[{i}] mismatch")
        if s["correct"] != q["correct"]:
            issues.append(f"Q{qid} correct mismatch src={s['correct']} quiz={q['correct']}")

        if not q.get("questionDe"):
            issues.append(f"Q{qid}: missing questionDe")
        elif len(q["questionDe"]) < len(q["question"]) * 0.45:
            issues.append(f"Q{qid}: questionDe possibly shortened ({len(q['questionDe'])} vs {len(q['question'])} chars)")

        de_opts = q.get("optionsDe") or OPTIONS_DE.get(qid)
        if not de_opts:
            issues.append(f"Q{qid}: missing optionsDe")
        elif len(de_opts) != len(q["options"]):
            issues.append(f"Q{qid}: optionsDe count mismatch")

    print(f"Source questions: {len(source)}")
    print(f"Quiz questions: {len(quiz)}")
    print(f"Issues: {len(issues)}")
    for i in issues:
        print(" -", i)
    if issues:
        raise SystemExit(1)
    print("Translation structure audit OK")


if __name__ == "__main__":
    main()
