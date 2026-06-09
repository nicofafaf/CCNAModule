#!/usr/bin/env python3
"""Add optionsDe to questions.json and regenerate questions.js."""
import json
from pathlib import Path

from options_de import OPTIONS_DE

ROOT = Path(__file__).parent.parent
JSON_PATH = ROOT / "js" / "questions.json"
JS_PATH = ROOT / "js" / "questions.js"
FALLBACK_PATH = ROOT / "js" / "options-de-data.js"


def main():
    questions = json.loads(JSON_PATH.read_text(encoding="utf-8"))
    errors = []

    for q in questions:
        qid = q["id"]
        de = OPTIONS_DE.get(qid)
        if not de:
            errors.append(f"Q{qid}: missing German options")
            continue
        if len(de) != len(q["options"]):
            errors.append(
                f"Q{qid}: count mismatch de={len(de)} en={len(q['options'])}"
            )
            continue
        q["optionsDe"] = de

    if errors:
        for e in errors:
            print("ERROR:", e)
        raise SystemExit(1)

    JSON_PATH.write_text(
        json.dumps(questions, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    JS_PATH.write_text(
        "const QUESTIONS = " + json.dumps(questions, ensure_ascii=False, indent=2) + ";\n",
        encoding="utf-8",
    )
    FALLBACK_PATH.write_text(
        "const OPTIONS_DE_DATA = " + json.dumps(OPTIONS_DE, ensure_ascii=False, indent=2) + ";\n",
        encoding="utf-8",
    )
    print(f"Updated {len(questions)} questions with optionsDe")


if __name__ == "__main__":
    main()
