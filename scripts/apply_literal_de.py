#!/usr/bin/env python3
"""Apply literal German question and option translations."""

import json
from pathlib import Path

from options_de import OPTIONS_DE
from questions_de import QUESTION_DE


ROOT = Path(__file__).parent.parent
JSON_PATH = ROOT / "js" / "questions.json"
QUESTIONS_JS_PATH = ROOT / "js" / "questions.js"
OPTIONS_DE_JS_PATH = ROOT / "js" / "options-de-data.js"
EXPECTED_COUNT = 76


def _validate_ids(mapping: dict, name: str) -> None:
    expected_ids = set(range(1, EXPECTED_COUNT + 1))
    actual_ids = set(mapping.keys())
    missing = sorted(expected_ids - actual_ids)
    extra = sorted(actual_ids - expected_ids)
    if missing or extra:
        raise ValueError(f"{name} ID mismatch: missing={missing} extra={extra}")


def main() -> None:
    questions = json.loads(JSON_PATH.read_text(encoding="utf-8"))
    if len(questions) != EXPECTED_COUNT:
        raise ValueError(
            f"questions.json count mismatch: got={len(questions)} expected={EXPECTED_COUNT}"
        )

    _validate_ids(QUESTION_DE, "QUESTION_DE")
    _validate_ids(OPTIONS_DE, "OPTIONS_DE")

    errors = []
    for q in questions:
        qid = q["id"]
        de_question = QUESTION_DE.get(qid)
        de_options = OPTIONS_DE.get(qid)

        if de_question is None:
            errors.append(f"Q{qid}: missing question translation")
            continue
        if de_options is None:
            errors.append(f"Q{qid}: missing options translation")
            continue
        if len(de_options) != len(q["options"]):
            errors.append(
                f"Q{qid}: options count mismatch de={len(de_options)} en={len(q['options'])}"
            )
            continue

        q["questionDe"] = de_question
        q["optionsDe"] = de_options

    if errors:
        for err in errors:
            print("ERROR:", err)
        raise SystemExit(1)

    JSON_PATH.write_text(
        json.dumps(questions, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    QUESTIONS_JS_PATH.write_text(
        "const QUESTIONS = " + json.dumps(questions, ensure_ascii=False, indent=2) + ";\n",
        encoding="utf-8",
    )
    OPTIONS_DE_JS_PATH.write_text(
        "const OPTIONS_DE_DATA = "
        + json.dumps(OPTIONS_DE, ensure_ascii=False, indent=2)
        + ";\n",
        encoding="utf-8",
    )

    print(f"Applied literal German translations for {EXPECTED_COUNT} questions.")


if __name__ == "__main__":
    main()
