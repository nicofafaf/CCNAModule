#!/usr/bin/env python3
import urllib.request
from pathlib import Path

ROOT = Path(__file__).parent.parent
UPLOADS = ROOT / "uploads"
SLUGS = {
    "ccna1-mod4-7": "ccna-1-v7-modules-4-7-ethernet-concepts-exam-answers",
    "ccna1-mod11-13": "ccna-1-v7-modules-11-13-ip-addressing-exam-answers",
    "ccna1-mod14-15": "ccna-1-v7-modules-14-15-network-application-communications-exam-answers",
    "ccna1-mod16-17": "ccna-1-v7-modules-16-17-building-and-securing-a-small-network-exam-answers",
}

UPLOADS.mkdir(exist_ok=True)
for bid, slug in SLUGS.items():
    url = f"https://itexamanswers.net/{slug}.html"
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    html = urllib.request.urlopen(req, timeout=60).read().decode("utf-8", "replace")
    start = html.find("<strong>1.")
    if start < 0:
        start = html.find("1. ")
    end = html.find('class="screen-reader-text">Post navigation')
    chunk = html[start:end] if end > start else html[start : start + 250000]
    (UPLOADS / f"{bid}.html").write_text(chunk, encoding="utf-8")
    print(f"{bid}: {len(chunk)} chars")
