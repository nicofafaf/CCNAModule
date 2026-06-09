#!/usr/bin/env python3
"""AAA verification for all exam banks."""
import json
from pathlib import Path

ROOT = Path(__file__).parent.parent
BANKS = ROOT / "data" / "banks"


def verify_bank(path):
    questions = json.loads(path.read_text(encoding="utf-8"))
    bank_id = path.stem
    errors = []
    for q in questions:
        qid = q["id"]
        if not q.get("options"):
            errors.append(f"Q{qid}: NO OPTIONS")
        if not q.get("correct"):
            errors.append(f"Q{qid}: NO CORRECT")
        for c in q.get("correct", []):
            if c >= len(q.get("options", [])):
                errors.append(f"Q{qid}: correct index {c} OOR")
        if not q.get("questionDe"):
            errors.append(f"Q{qid}: NO questionDe")
        if not q.get("optionsDe") or len(q["optionsDe"]) != len(q["options"]):
            errors.append(f"Q{qid}: optionsDe count mismatch")
        if not q.get("mnemonic"):
            errors.append(f"Q{qid}: NO mnemonic")
        en_q = q["question"].replace("\u200b", "")
        de_q = q.get("questionDe", "")
        if len(en_q) > 30 and len(de_q) < len(en_q) * 0.55:
            errors.append(f"Q{qid}: questionDe too short ({len(de_q)}/{len(en_q)})")
        for i, (en, de) in enumerate(zip(q["options"], q.get("optionsDe", []))):
            en_c = en.replace("\u200b", "")
            if len(en_c) > 30 and len(de) < len(en_c) * 0.55:
                errors.append(f"Q{qid} opt[{i}]: too short ({len(de)}/{len(en_c)})")
        if q.get("image"):
            img = ROOT / q["image"]
            if not img.exists():
                errors.append(f"Q{qid}: missing image {q['image']}")
    return bank_id, len(questions), errors


def main():
    lines = []
    total_err = 0
    for path in sorted(BANKS.glob("*.json")):
        bank_id, count, errors = verify_bank(path)
        total_err += len(errors)
        status = "OK" if not errors else f"{len(errors)} ERRORS"
        lines.append(f"{bank_id}: {count} questions – {status}")
        for e in errors[:20]:
            lines.append(f"  {e}")
        if len(errors) > 20:
            lines.append(f"  ... +{len(errors)-20} more")
    lines.append(f"\nTOTAL ERRORS: {total_err}")
    report = "\n".join(lines)
    (ROOT / "scripts" / "verify_all_banks_report.txt").write_text(report, encoding="utf-8")
    print(report)


if __name__ == "__main__":
    main()
