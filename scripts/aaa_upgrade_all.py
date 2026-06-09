#!/usr/bin/env python3
"""AAA upgrade: fix banks, local images, full DE, mnemonics, verify."""
import json
import re
import time
import hashlib
import urllib.request
from pathlib import Path

from deep_translator import GoogleTranslator

ROOT = Path(__file__).parent.parent
BANKS = ROOT / "data" / "banks"
IMAGES = ROOT / "assets" / "images"
UPLOADS = ROOT / "uploads"
OVERRIDES = json.loads((Path(__file__).parent / "manual_overrides.json").read_text(encoding="utf-8"))

GLOSSARY = {
    "default gateway": "Standard-Gateway",
    "subnet mask": "Subnetzmaske",
    "MAC address": "MAC-Adresse",
    "IP address": "IP-Adresse",
    "packet": "Paket",
    "frame": "Frame",
    "switch": "Switch",
    "router": "Router",
    "broadcast": "Broadcast",
    "multicast": "Multicast",
    "unicast": "Unicast",
    "Ethernet": "Ethernet",
    "TCP": "TCP",
    "UDP": "UDP",
    "DNS": "DNS",
    "HTTP": "HTTP",
    "SSH": "SSH",
    "Telnet": "Telnet",
    "ARP": "ARP",
    "ICMP": "ICMP",
    "IPv4": "IPv4",
    "IPv6": "IPv6",
    "VLAN": "VLAN",
    "OSI": "OSI",
    "PDU": "PDU",
    "CRC": "CRC",
    "FCS": "FCS",
    "NAT": "NAT",
    "ISP": "ISP",
    "BYOD": "BYOD",
    "QoS": "QoS",
    "LAN": "LAN",
    "WAN": "WAN",
    "CLI": "CLI",
    "IOS": "IOS",
    "NVRAM": "NVRAM",
    "EXEC": "EXEC",
    "UTP": "UTP",
    "STP": "STP",
    "CSMA/CD": "CSMA/CD",
    "DSL": "DSL",
    "PT Activity": "PT-Aktivität",
    "Choose two": "Wählen Sie zwei",
    "Choose three": "Wählen Sie drei",
    "Refer to the exhibit": "Beziehen Sie sich auf die Abbildung",
    "Not all options are used": "Nicht alle Optionen werden verwendet",
}

translator = GoogleTranslator(source="en", target="de")
_cache: dict[str, str] = {}


def clean(t):
    t = (t or "").replace("\u200b", "").strip()
    t = re.sub(r"\s+", " ", t)
    return t


def apply_glossary(text):
    for en, de in sorted(GLOSSARY.items(), key=lambda x: -len(x[0])):
        text = re.sub(re.escape(en), de, text, flags=re.I)
    return text


def translate(text, min_len=0):
    text = clean(text)
    if not text:
        return text
    if text in _cache:
        return _cache[text]
    try:
        # chunk long text
        if len(text) > 4500:
            parts = []
            for i in range(0, len(text), 4000):
                chunk = text[i : i + 4000]
                parts.append(translator.translate(chunk))
                time.sleep(0.15)
            result = " ".join(parts)
        else:
            result = translator.translate(text)
            time.sleep(0.12)
        result = apply_glossary(clean(result))
        _cache[text] = result
        return result
    except Exception:
        return text


def download_image(url, bank_id, qid):
    if not url or url.startswith("assets/"):
        return url
    IMAGES.mkdir(parents=True, exist_ok=True)
    ext = Path(url.split("?")[0]).suffix or ".jpg"
    if ext not in (".jpg", ".jpeg", ".png", ".gif", ".webp"):
        ext = ".jpg"
    h = hashlib.md5(url.encode()).hexdigest()[:10]
    fname = f"{bank_id}-q{qid}-{h}{ext}"
    dest = IMAGES / fname
    if not dest.exists():
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        data = urllib.request.urlopen(req, timeout=60).read()
        dest.write_bytes(data)
    return f"assets/images/{fname}"


def mnemonic_for(q):
    if q.get("mnemonic"):
        return q["mnemonic"]
    opts = q.get("optionsDe") or q.get("options", [])
    correct = q.get("correct", [])
    if not opts or not correct:
        return ""
    ans = [opts[i] for i in correct if i < len(opts)]
    if not ans:
        return ""
    short = ans[0][:80] + ("..." if len(ans[0]) > 80 else "")
    topic = (q.get("topic") or "").replace("Topic ", "Thema ")
    if q["type"] in ("multiple", "multiple3"):
        return f"Richtig: {len(correct)} Antworten – {', '.join(a[:40] for a in ans[:3])}"
    if q["type"] == "ordering":
        return f"Alle {len(opts)} Zuordnungen korrekt merken!"
    return f"{topic}: Antwort = {short}" if topic else f"Merke: {short}"


def apply_overrides(bank_id, questions):
    ov = OVERRIDES.get(bank_id, {})
    qmap = {q["id"]: q for q in questions}
    for qid_s, data in ov.items():
        qid = int(qid_s)
        if qid not in qmap:
            continue
        q = qmap[qid]
        for k, v in data.items():
            q[k] = v
        if "options" in data:
            q["correct"] = list(range(len(data["options"])))
    return questions


def fix_from_html(bank_id, questions):
    """Apply HTML-based fixes for known broken questions."""
    html_path = UPLOADS / f"{bank_id}.html"
    if not html_path.exists():
        if bank_id == "ccna1-mod1-3":
            html_path = UPLOADS / "ccna1-mod1-3.html"
        else:
            return questions
    html = html_path.read_text(encoding="utf-8", errors="replace")
    qmap = {q["id"]: q for q in questions}

    # Q46 mod4-7: pre block options
    if bank_id == "ccna1-mod4-7" and 46 in qmap:
        m = re.search(
            r"<strong>46\..*?<pre>(.*?)</pre>",
            html,
            re.DOTALL,
        )
        if m:
            lines = [clean(re.sub(r"<[^>]+>", "", l)) for l in m.group(1).split("\n") if l.strip()]
            opts, correct = [], []
            for line in lines:
                is_c = "color: #ff0000" in line or line.startswith("**")
                line = clean(re.sub(r"\*+", "", line))
                if line:
                    if is_c or ("straight-through, 3 - crossover" in line and "rollover, 2 - straight" in line):
                        correct.append(len(opts))
                    opts.append(line)
            if opts:
                qmap[46].update({"options": opts, "correct": correct or [1], "type": "single"})

    # Q5 mod4-7: 3-column table in explanation
    if bank_id == "ccna1-mod4-7" and 5 in qmap:
        rows = re.findall(
            r"<strong>5\..*?Place the options.*?<table>(.*?)</table>",
            html,
            re.DOTALL,
        )
        if rows:
            trs = re.findall(r"<tr>(.*?)</tr>", rows[0], re.DOTALL)
            opts = []
            for tr in trs[1:]:  # skip header
                cols = [clean(re.sub(r"<[^>]+>", "", c)) for c in re.findall(r"<t[dh]>(.*?)</t[dh]>", tr, re.DOTALL)]
                if len(cols) == 3:
                    for sit, med in zip(cols, ["Copper Cables", "Fiber optic", "Wireless"]):
                        if sit:
                            opts.append(f"{sit} → {med}")
            if opts:
                qmap[5].update({"type": "ordering", "options": opts, "correct": list(range(len(opts)))})

    # Q26 mod11-13: fill-in /60
    if bank_id == "ccna1-mod11-13" and 26 in qmap:
        qmap[26].update({
            "type": "single",
            "options": ["/56", "/58", "/60", "/64"],
            "correct": [2],
            "question": qmap[26]["question"] + " The prefix-length for the range of addresses is ____.",
        })

    # Q13 mod14-15: TCP termination ordering from explanation
    if bank_id == "ccna1-mod14-15" and 13 in qmap:
        opts = [
            "client sends FIN to server → step 1",
            "server sends ACK to client → step 2",
            "server sends FIN to client → step 3",
            "client sends ACK to server → step 4",
        ]
        qmap[13].update({
            "type": "ordering",
            "options": opts,
            "correct": list(range(len(opts))),
            "image": "assets/images/ccna1-mod14-15-q13.jpg",
        })

    # Q11 mod16-17: firewall types from explanation
    if bank_id == "ccna1-mod16-17" and 11 in qmap:
        opts = [
            "Stateful packet inspection → Prevents or allows access based on whether the traffic is in response to requests from internal hosts.",
            "URL filtering → Prevents or allows access based on web addresses or keywords.",
            "Application filtering → Prevents or allows access based on the port numbers used in the request.",
            "Packet filtering → Prevents or allows access based on the IP or MAC addresses of the source and destination.",
        ]
        qmap[11].update({
            "type": "ordering",
            "options": opts,
            "correct": list(range(len(opts))),
        })

    # Q15 mod16-17: SSH config steps (standard CCNA answer set)
    if bank_id == "ccna1-mod16-17" and 15 in qmap:
        opts = [
            "configure IP domain name → required for SSH",
            "generate RSA keys → crypto key generate rsa",
            "configure SSH version 2 → ip ssh version 2",
            "configure vty lines for SSH transport → transport input ssh",
            "create local user authentication → username + secret",
        ]
        qmap[15].update({
            "type": "ordering",
            "options": opts,
            "correct": list(range(len(opts))),
        })

    return list(qmap.values())


def html_id_path_exists(p):
    return p.exists()


def translate_bank(bank_id, questions, skip_de=False):
    if skip_de:
        return questions
    for q in sorted(questions, key=lambda x: x["id"]):
        if q.get("questionDe") and q.get("optionsDe"):
            if not q.get("mnemonic"):
                q["mnemonic"] = mnemonic_for(q)
            continue
        en_q = q["question"]
        q["questionDe"] = translate(en_q)
        if len(q["questionDe"]) < len(en_q) * 0.6 and len(en_q) > 20:
            q["questionDe"] = translate(en_q)  # retry once

        de_opts = []
        for opt in q.get("options", []):
            if " → " in opt:
                left, right = opt.split(" → ", 1)
                de_opts.append(f"{translate(left)} → {translate(right)}")
            else:
                de_opts.append(translate(opt))
        q["optionsDe"] = de_opts
        q["mnemonic"] = mnemonic_for(q)
    return questions


def verify_bank(bank_id, questions):
    errors = []
    ids = [q["id"] for q in questions]
    for q in questions:
        qid = q["id"]
        if not q.get("options"):
            errors.append(f"Q{qid}: NO OPTIONS")
        if not q.get("correct"):
            errors.append(f"Q{qid}: NO CORRECT")
        for c in q.get("correct", []):
            if c >= len(q.get("options", [])):
                errors.append(f"Q{qid}: correct {c} out of range")
        if not q.get("questionDe"):
            errors.append(f"Q{qid}: NO questionDe")
        if not q.get("optionsDe") or len(q.get("optionsDe", [])) != len(q.get("options", [])):
            errors.append(f"Q{qid}: optionsDe mismatch")
        else:
            for i, (en, de) in enumerate(zip(q["options"], q["optionsDe"])):
                en_c = clean(en)
                if len(en_c) > 25 and len(de) < len(en_c) * 0.55:
                    errors.append(f"Q{qid} opt[{i}]: DE too short")
        if q.get("image") and not (ROOT / q["image"]).exists() and not str(q["image"]).startswith("http"):
            errors.append(f"Q{qid}: image missing {q['image']}")
    return errors


def process_bank(bank_id):
    path = BANKS / f"{bank_id}.json"
    if not path.exists():
        print(f"SKIP {bank_id}: no bank file")
        return None
    questions = json.loads(path.read_text(encoding="utf-8"))
    questions = fix_from_html(bank_id, questions)
    questions = apply_overrides(bank_id, questions)

    for q in questions:
        if q.get("image") and str(q["image"]).startswith("http"):
            q["image"] = download_image(q["image"], bank_id, q["id"])

    skip_de = bank_id == "ccna1-mod8-10"
    if not skip_de:
        print(f"  Translating {bank_id} ({len(questions)} questions)...")
        questions = translate_bank(bank_id, questions, skip_de=False)
    else:
        for q in questions:
            if not q.get("mnemonic"):
                q["mnemonic"] = mnemonic_for(q)

    questions = sorted(questions, key=lambda x: x["id"])
    path.write_text(json.dumps(questions, ensure_ascii=False, indent=2), encoding="utf-8")
    errors = verify_bank(bank_id, questions)
    return len(questions), errors


def main():
    import sys
    targets = sys.argv[1:] if len(sys.argv) > 1 else [
        "ccna1-mod1-3", "ccna1-mod4-7", "ccna1-mod8-10",
        "ccna1-mod11-13", "ccna1-mod14-15", "ccna1-mod16-17",
    ]
    report = []
    for bank_id in targets:
        print(f"AAA upgrade: {bank_id}")
        result = process_bank(bank_id)
        if not result:
            continue
        count, errors = result
        report.append(f"{bank_id}: {count}q, {len(errors)} errors")
        for e in errors[:15]:
            report.append(f"  {e}")
        if len(errors) > 15:
            report.append(f"  ... +{len(errors)-15} more")
    out = ROOT / "scripts" / "aaa_report.txt"
    out.write_text("\n".join(report), encoding="utf-8")
    print("\n".join(report))


if __name__ == "__main__":
    main()
