#!/usr/bin/env python3
"""Audit and fix images: every HTML img per question must exist locally in bank JSON."""
import json
import re
import hashlib
import urllib.request
from pathlib import Path

ROOT = Path(__file__).parent.parent
BANKS = ROOT / "data" / "banks"
UPLOADS = ROOT / "uploads"
IMAGES = ROOT / "images" if False else ROOT / "assets" / "images"

BANK_HTML = {
    "ccna1-mod1-3": "ccna1-mod1-3.html",
    "ccna1-mod4-7": "ccna1-mod4-7.html",
    "ccna1-mod11-13": "ccna1-mod11-13.html",
    "ccna1-mod14-15": "ccna1-mod14-15.html",
    "ccna1-mod16-17": "ccna1-mod16-17.html",
    "ccna1-mod8-10": r"C:\Users\merkeln\.cursor\projects\c-Users-merkeln-OneDrive-L-pple-Ausbildungs-GmbH-Desktop-modul8-10\uploads\ccna-1-v7-modules-8-10-communicating-between-networks-exam-answers-0.html",
}


def download(url, bank_id, qid):
    IMAGES.mkdir(parents=True, exist_ok=True)
    ext = Path(url.split("?")[0]).suffix or ".jpg"
    if ext not in (".jpg", ".jpeg", ".png", ".gif", ".webp"):
        ext = ".jpg"
    h = hashlib.md5(url.encode()).hexdigest()[:10]
    fname = f"{bank_id}-q{qid}-{h}{ext}"
    dest = IMAGES / fname
    if not dest.exists():
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        dest.write_bytes(urllib.request.urlopen(req, timeout=60).read())
    return f"assets/images/{fname}"


def html_images_per_question(html, bank_id):
    """Map question id -> first meaningful image URL in that question block."""
    mapping = {}
    blocks = re.split(r"(?=<p><strong>\d+\.)", html)
    if len(blocks) <= 1:
        blocks = re.split(r"(?=\*\*\d+\\?\.\s)", html)
    for block in blocks:
        m = re.search(r"<strong>(\d+)\.", block) or re.search(r"\*\*(\d+)\\?\.", block)
        if not m:
            continue
        qid = int(m.group(1))
        imgs = re.findall(r'src="(https://itexamanswers\.net/wp-content/uploads/[^"]+)"', block)
        # skip tiny icons / ads
        imgs = [u for u in imgs if "wpdm_icon" not in u and "20x" not in u.split("/")[-1]]
        if imgs:
            mapping[qid] = imgs[0]
    return mapping


def main():
    report = []
    fixes = 0
    for bank_path in sorted(BANKS.glob("*.json")):
        bank_id = bank_path.stem
        questions = json.loads(bank_path.read_text(encoding="utf-8"))
        qmap = {q["id"]: q for q in questions}

        html_key = BANK_HTML.get(bank_id)
        if not html_key:
            continue
        html_path = Path(html_key) if Path(html_key).is_absolute() else UPLOADS / html_key
        if not html_path.exists():
            report.append(f"{bank_id}: HTML missing {html_path}")
            continue

        html = html_path.read_text(encoding="utf-8", errors="replace")
        expected = html_images_per_question(html, bank_id)

        missing_in_json = []
        missing_files = []
        for qid, url in sorted(expected.items()):
            q = qmap.get(qid)
            if not q:
                continue
            has_visual = q.get("image") or q.get("exhibit")
            if not q.get("image"):
                missing_in_json.append(qid)
                try:
                    local = download(url, bank_id, qid)
                    q["image"] = local
                    fixes += 1
                except Exception as e:
                    report.append(f"{bank_id} Q{qid}: download fail {e}")
            elif q.get("image") and not str(q["image"]).startswith("http"):
                if not (ROOT / q["image"]).exists():
                    missing_files.append((qid, q["image"]))
                    try:
                        q["image"] = download(url, bank_id, qid)
                        fixes += 1
                    except Exception as e:
                        report.append(f"{bank_id} Q{qid}: re-download fail {e}")

        # mod8-10 legacy image paths
        LEGACY = {
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
        if bank_id == "ccna1-mod8-10":
            for qid, path in LEGACY.items():
                if qid in qmap and not qmap[qid].get("image"):
                    if (ROOT / path).exists():
                        qmap[qid]["image"] = path

        bank_path.write_text(json.dumps(sorted(qmap.values(), key=lambda x: x["id"]), ensure_ascii=False, indent=2), encoding="utf-8")
        report.append(
            f"{bank_id}: html_imgs={len(expected)} json_imgs={sum(1 for q in qmap.values() if q.get('image'))} "
            f"added={len(missing_in_json)} file_missing={len(missing_files)}"
        )
        if missing_in_json:
            report.append(f"  added images for Q: {missing_in_json}")

    # verify all image paths exist
    for bank_path in sorted(BANKS.glob("*.json")):
        questions = json.loads(bank_path.read_text(encoding="utf-8"))
        for q in questions:
            if q.get("image") and not str(q["image"]).startswith("http"):
                if not (ROOT / q["image"]).exists():
                    report.append(f"STILL MISSING: {bank_path.stem} Q{q['id']}: {q['image']}")

    out = ROOT / "scripts" / "image_audit_report.txt"
    out.write_text("\n".join(report) + f"\n\nFixes applied: {fixes}\n", encoding="utf-8")
    print("\n".join(report))
    print(f"Fixes: {fixes}")


if __name__ == "__main__":
    main()
