#!/usr/bin/env python3
import re
import json
from pathlib import Path

ROOT = Path(__file__).parent.parent


def scan_html(path, fmt="html"):
    html = Path(path).read_text(encoding="utf-8", errors="replace")
    if fmt == "md":
        blocks = re.split(r"(?=\*\*\d+\\?\.\s)", html)
    else:
        blocks = re.split(r"(?=<p><strong>\d+\.)", html)
    per = {}
    for b in blocks:
        if fmt == "md":
            m = re.match(r"\*\*(\d+)\\?\.", b)
        else:
            m = re.search(r"<strong>(\d+)\.", b)
        if not m:
            continue
        qid = int(m.group(1))
        imgs = re.findall(r'src="(https://itexamanswers[^"]+)"', b)
        imgs = [u for u in imgs if "wpdm" not in u and "data:image" not in u]
        if imgs:
            per[qid] = imgs
    return per


def main():
    scans = {
        "ccna1-mod1-3": ("uploads/ccna1-mod1-3.html", "html"),
        "ccna1-mod4-7": ("uploads/ccna1-mod4-7.html", "html"),
        "ccna1-mod11-13": ("uploads/ccna1-mod11-13.html", "html"),
        "ccna1-mod14-15": ("uploads/ccna1-mod14-15.html", "html"),
        "ccna1-mod16-17": ("uploads/ccna1-mod16-17.html", "html"),
        "ccna1-mod8-10": (
            r"C:\Users\merkeln\.cursor\projects\c-Users-merkeln-OneDrive-L-pple-Ausbildungs-GmbH-Desktop-modul8-10\uploads\ccna-1-v7-modules-8-10-communicating-between-networks-exam-answers-0.html",
            "md",
        ),
    }
    lines = []
    for bank_id, (rel, fmt) in scans.items():
        p = ROOT / rel if not Path(rel).is_absolute() else Path(rel)
        if not p.exists():
            lines.append(f"{bank_id}: HTML not found")
            continue
        per = scan_html(p, fmt)
        bank = json.loads((ROOT / "data/banks" / f"{bank_id}.json").read_text(encoding="utf-8"))
        bmap = {q["id"]: q for q in bank}
        missing = []
        no_file = []
        for qid, urls in sorted(per.items()):
            q = bmap.get(qid)
            if not q:
                continue
            if not q.get("image"):
                missing.append(qid)
            elif not str(q["image"]).startswith("http") and not (ROOT / q["image"]).exists():
                no_file.append(qid)
        lines.append(
            f"{bank_id}: html_q_with_img={len(per)} json_img={sum(1 for q in bank if q.get('image'))} "
            f"exhibit={sum(1 for q in bank if q.get('exhibit'))} missing_json={missing} missing_file={no_file}"
        )
        if len(per) != sum(1 for q in bank if q.get("image")):
            html_ids = set(per.keys())
            json_ids = {q["id"] for q in bank if q.get("image")}
            lines.append(f"  html_only={sorted(html_ids-json_ids)} json_only={sorted(json_ids-html_ids)}")

    # verify every json image file exists
    for bp in sorted((ROOT / "data/banks").glob("*.json")):
        for q in json.loads(bp.read_text(encoding="utf-8")):
            img = q.get("image")
            if img and not str(img).startswith("http") and not (ROOT / img).exists():
                lines.append(f"FILE MISSING: {bp.stem} Q{q['id']}: {img}")

    text = "\n".join(lines)
    (ROOT / "scripts" / "image_scan_report.txt").write_text(text, encoding="utf-8")
    print(text)


if __name__ == "__main__":
    main()
