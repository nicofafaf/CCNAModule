#!/usr/bin/env python3
"""Ensure every question needing visuals has image or exhibit; download missing files."""
import json
import re
import hashlib
import urllib.request
from pathlib import Path

ROOT = Path(__file__).parent.parent
BANKS = ROOT / "data" / "banks"
IMAGES = ROOT / "assets" / "images"
UPLOADS = ROOT / "uploads"

MOD810_HTML = Path(
    r"C:\Users\merkeln\.cursor\projects\c-Users-merkeln-OneDrive-L-pple-Ausbildungs-GmbH-Desktop-modul8-10\uploads\ccna-1-v7-modules-8-10-communicating-between-networks-exam-answers-0.html"
)

MOD810_IMAGES = {
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

HTML_MAP = {
    "ccna1-mod1-3": UPLOADS / "ccna1-mod1-3.html",
    "ccna1-mod4-7": UPLOADS / "ccna1-mod4-7.html",
    "ccna1-mod11-13": UPLOADS / "ccna1-mod11-13.html",
    "ccna1-mod14-15": UPLOADS / "ccna1-mod14-15.html",
    "ccna1-mod16-17": UPLOADS / "ccna1-mod16-17.html",
}


def needs_visual(q):
    t = q["question"].lower()
    if q.get("image") or q.get("exhibit"):
        return False
    triggers = (
        "refer to the exhibit",
        "refer to the graphic",
        "refer to the figure",
        "open the pt",
        "shown in the exhibit",
        "match the",
        "place the",
        "ordering",
    )
    if any(x in t for x in triggers):
        return True
    if q["type"] == "ordering" and not q.get("options"):
        return True
    return False


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


def extract_html_images(html):
    per = {}
    blocks = re.split(r"(?=<p><strong>\d+\.)", html)
    for b in blocks:
        m = re.search(r"<strong>(\d+)\.", b)
        if not m:
            continue
        qid = int(m.group(1))
        imgs = re.findall(r'src="(https://itexamanswers\.net/wp-content/uploads/[^"]+)"', b)
        imgs = [
            u
            for u in imgs
            if "gravatar" not in u
            and "wpdm" not in u
            and "avatar" not in u
            and "/2026/" not in u
        ]
        if imgs:
            per[qid] = imgs[0]
    return per


def extract_md_images(html):
    per = {}
    blocks = re.split(r"(?=\*\*\d+\\?\.\s)", html)
    for b in blocks:
        m = re.match(r"\*\*(\d+)\\?\.", b)
        if not m:
            continue
        qid = int(m.group(1))
        imgs = re.findall(r"!\[.*?\]\((https://[^)]+)\)", b)
        imgs += re.findall(r'src="(https://itexamanswers[^"]+)"', b)
        imgs = [u for u in imgs if "itexamanswers" in u]
        if imgs:
            per[qid] = imgs[0]
    return per


def main():
    report = []
    fixes = 0

    for bank_path in sorted(BANKS.glob("*.json")):
        bank_id = bank_path.stem
        questions = json.loads(bank_path.read_text(encoding="utf-8"))
        qmap = {q["id"]: q for q in questions}

        if bank_id == "ccna1-mod8-10":
            for qid, path in MOD810_IMAGES.items():
                if qid in qmap and (ROOT / path).exists():
                    if qmap[qid].get("image") != path:
                        qmap[qid]["image"] = path
                        fixes += 1
        else:
            html_path = HTML_MAP.get(bank_id)
            if html_path and html_path.exists():
                html_imgs = extract_html_images(html_path.read_text(encoding="utf-8", errors="replace"))
                for qid, url in html_imgs.items():
                    if qid not in qmap:
                        continue
                    if not qmap[qid].get("image"):
                        qmap[qid]["image"] = download(url, bank_id, qid)
                        fixes += 1

        need = [q["id"] for q in qmap.values() if needs_visual(q)]
        missing_files = []
        for q in qmap.values():
            img = q.get("image")
            if img and not str(img).startswith("http"):
                if not (ROOT / img).exists():
                    missing_files.append((q["id"], img))

        bank_path.write_text(
            json.dumps(sorted(qmap.values(), key=lambda x: x["id"]), ensure_ascii=False, indent=2),
            encoding="utf-8",
        )
        report.append(
            f"{bank_id}: images={sum(1 for q in qmap.values() if q.get('image'))} "
            f"exhibits={sum(1 for q in qmap.values() if q.get('exhibit'))} "
            f"need_visual={need} missing_files={missing_files}"
        )

    (ROOT / "scripts" / "fix_images_report.txt").write_text(
        "\n".join(report) + f"\nfixes={fixes}\n", encoding="utf-8"
    )
    print("\n".join(report))
    print("fixes:", fixes)


if __name__ == "__main__":
    main()
