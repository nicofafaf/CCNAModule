#!/usr/bin/env python3
"""Universal ITExamAnswers parser for CCNA v7 checkpoint exams."""
import re
import json
import urllib.request
from pathlib import Path

ROOT = Path(__file__).parent.parent
BANKS = ROOT / "data" / "banks"
UPLOADS = ROOT / "uploads"

EXAMS = [
    {
        "id": "ccna1-mod1-3",
        "slug": "ccna-1-v7-modules-1-3-basic-network-connectivity-and-communications-exam-answers",
        "modules": [1, 2, 3],
        "module_ranges": [(1, 1, 20), (21, 2, 40), (41, 3, 999)],
    },
    {
        "id": "ccna1-mod4-7",
        "slug": "ccna-1-v7-modules-4-7-ethernet-concepts-exam-answers",
        "modules": [4, 5, 6, 7],
        "module_ranges": [(1, 4, 18), (19, 5, 36), (37, 6, 54), (55, 7, 999)],
    },
    {
        "id": "ccna1-mod8-10",
        "slug": "ccna-1-v7-modules-8-10-communicating-between-networks-exam-answers",
        "modules": [8, 9, 10],
        "module_ranges": [(1, 8, 19), (20, 9, 30), (31, 10, 999)],
        "local_html": "ccna-1-v7-modules-8-10-communicating-between-networks-exam-answers-0.html",
        "preserve_de": True,
    },
    {
        "id": "ccna1-mod11-13",
        "slug": "ccna-1-v7-modules-11-13-ip-addressing-exam-answers",
        "modules": [11, 12, 13],
        "module_ranges": [(1, 11, 25), (26, 12, 50), (51, 13, 999)],
    },
    {
        "id": "ccna1-mod14-15",
        "slug": "ccna-1-v7-modules-14-15-network-application-communications-exam-answers",
        "modules": [14, 15],
        "module_ranges": [(1, 14, 30), (31, 15, 999)],
    },
    {
        "id": "ccna1-mod16-17",
        "slug": "ccna-1-v7-modules-16-17-building-and-securing-a-small-network-exam-answers",
        "modules": [16, 17],
        "module_ranges": [(1, 16, 30), (31, 17, 999)],
    },
]


def clean_text(t):
    t = t.replace("\\_", "_").replace("\\.", ".").replace("\\*", "*")
    t = re.sub(r"\\(?![nrt])", "", t)
    return t.strip()


def is_option_line(line):
    return bool(re.match(r"^\*\s+\S", line))


def get_module(qnum, cfg):
    for start, mod, end in cfg.get("module_ranges", []):
        if start <= qnum <= end:
            return mod
    topic_mod = cfg.get("modules")
    return topic_mod[0] if topic_mod else 0


def detect_type(question, body):
    if re.search(r"Which two|Choose two|\(Choose two\.\)", question, re.I):
        return "multiple"
    if re.search(r"Which three|Choose three", question, re.I):
        return "multiple3"
    if "Match the" in question or "Place the options" in body:
        return "ordering"
    return "single"


def parse_block(qnum, question, body, cfg):
    q_type = detect_type(question, body)
    options, correct = [], []

    if q_type == "ordering":
        rows = re.findall(r"^\|\s*(.+?)\s*\|\s*(.+?)\s*\|", body, re.MULTILINE)
        for left, right in rows:
            if "---" in left or not left.strip():
                continue
            options.append(f"{left.strip()} → {right.strip()}")
        correct = list(range(len(options)))
    else:
        in_options = True
        for line in body.split("\n"):
            line = line.strip()
            if line.startswith("**Explanation"):
                in_options = False
                continue
            if not in_options:
                continue
            if is_option_line(line):
                content = line[1:].strip()
                is_correct = content.startswith("**") and content.endswith("**")
                opt = clean_text(content.strip("*"))
                if opt:
                    if is_correct:
                        correct.append(len(options))
                    options.append(opt)

    expl_match = re.search(
        r"\*\*Explanation:\*\*\s*(?:Topic\s*([\d.]+)\s*)?(.*?)$",
        body,
        re.DOTALL,
    )
    topic_num = expl_match.group(1) if expl_match and expl_match.group(1) else ""
    topic = f"Topic {topic_num}" if topic_num else ""
    explanation = clean_text(expl_match.group(2)) if expl_match else ""
    if "Place the options in the following order" in explanation:
        explanation = explanation.split("Place the options")[0].strip()

    module = get_module(qnum, cfg)
    if topic_num and cfg.get("modules"):
        try:
            mod_from_topic = int(topic_num.split(".")[0])
            if mod_from_topic in cfg["modules"]:
                module = mod_from_topic
        except ValueError:
            pass

    exhibit = None
    code = re.search(r"((?:RTR1|Floor|Main|BldgA|HQ)\(config\).*?end)", body, re.DOTALL)
    if code:
        exhibit = code.group(1).strip()

    return {
        "id": qnum,
        "module": module or None,
        "type": q_type,
        "question": clean_text(question),
        "options": options,
        "correct": correct if correct else ([0] if options else []),
        "explanation": explanation[:2000],
        "topic": topic,
        "image": None,
        "exhibit": exhibit,
        "bankId": cfg["id"],
    }


def strip_html_tags(text):
    text = re.sub(r"<br\s*/?>", "\n", text, flags=re.I)
    text = re.sub(r"<[^>]+>", "", text)
    text = text.replace("&#8217;", "'").replace("&nbsp;", " ")
    return clean_text(text)


def is_correct_li(li_html):
    return "color: #ff0000" in li_html or "color:#ff0000" in li_html


def parse_html_exam(html, cfg):
    """Parse WordPress HTML format (ul/li options, p strong questions)."""
    questions = {}
    start = re.search(r"<p><strong>1\.", html) or re.search(r"<strong>1\.", html)
    if not start:
        start = re.search(r"1\.\s+[A-Z]", html)
    if not start:
        return questions

    chunk = html[start.start() :]
    end = chunk.find('class="screen-reader-text">Post navigation')
    if end > 0:
        chunk = chunk[:end]

    blocks = re.split(r"(?=<p><strong>\d+\.)", chunk)
    if len(blocks) <= 1:
        blocks = re.split(r"(?=<strong>\d+\.)", chunk)

    for block in blocks:
        qm = re.search(r"<strong>(\d+)\.\s*(.+?)</strong>", block, re.DOTALL)
        if not qm:
            qm = re.search(r"<strong>(\d+)\.\s*(.+?)</strong>", block)
        if not qm:
            continue
        qnum = int(qm.group(1))
        question = strip_html_tags(qm.group(2))

        img = re.search(r'src="(https://itexamanswers\.net/wp-content/uploads/[^"]+)"', block)
        image = img.group(1) if img else None

        options, correct = [], []
        for li in re.findall(r"<li>(.*?)</li>", block, re.DOTALL):
            opt = strip_html_tags(li)
            if not opt:
                continue
            if is_correct_li(li):
                correct.append(len(options))
            options.append(opt)

        if not options:
            rows = re.findall(r"<tr>\s*<td>(.*?)</td>\s*<td>(.*?)</td>\s*</tr>", block, re.DOTALL)
            for left, right in rows:
                left, right = strip_html_tags(left), strip_html_tags(right)
                if left and right and "---" not in left:
                    options.append(f"{left} → {right}")
            if options:
                correct = list(range(len(options)))

        expl = re.search(
            r"(?:Explanation:|Explanation:)\s*(?:</b>|</strong>)?\s*(?:Topic\s*([\d.]+)\s*)?(.*?)</p>",
            block,
            re.DOTALL | re.I,
        )
        topic_num = expl.group(1).strip() if expl and expl.group(1) else ""
        topic = f"Topic {topic_num}" if topic_num else ""
        explanation = strip_html_tags(expl.group(2)) if expl else ""

        module = get_module(qnum, cfg)
        if topic_num:
            try:
                mod_from_topic = int(topic_num.split(".")[0])
                if not cfg.get("modules") or mod_from_topic in cfg["modules"]:
                    module = mod_from_topic
            except ValueError:
                pass

        q_type = detect_type(question, block)
        if q_type == "ordering" and options and correct == list(range(len(options))):
            pass
        elif q_type == "multiple" and len(correct) != 2:
            q_type = "single" if len(correct) <= 1 else q_type
        elif q_type == "multiple3" and len(correct) != 3:
            q_type = "multiple" if len(correct) == 2 else "single"

        questions[qnum] = {
            "id": qnum,
            "module": module or None,
            "type": q_type,
            "question": question,
            "options": options,
            "correct": correct if correct else ([0] if options else []),
            "explanation": explanation[:2000],
            "topic": topic,
            "image": image,
            "exhibit": None,
            "bankId": cfg["id"],
        }
    return questions


def extract_exam_text(html):
    markers = [
        r"\*\*1\\?\.\s",
        r"(?<=\n)1\.\s+[A-Z]",
        r"\*\*1\\?\.\s+Which",
        r"\*\*1\\?\.\s+What",
        r"\*\*1\\?\.\s+Match",
        r"\*\*1\\?\.\s+Refer",
        r"\*\*1\\?\.\s+Open",
    ]
    start = -1
    for pat in markers:
        m = re.search(pat, html)
        if m:
            start = m.start()
            break
    if start < 0:
        return ""

    end_markers = ["## Post navigation", "## Related Posts", "<!-- wp:comments"]
    end = len(html)
    for em in end_markers:
        idx = html.find(em, start)
        if idx > 0:
            end = min(end, idx)
    return html[start:end]


def parse_all(text, cfg):
    questions = {}
    blocks = re.split(r"(?=\*\*\d+\\?\.\s)", text)
    for block in blocks:
        m = re.match(r"\*\*(\d+)\\?\.\s+(.+?)\*\*", block, re.DOTALL)
        if not m:
            continue
        qnum = int(m.group(1))
        questions[qnum] = parse_block(qnum, m.group(2), block[m.end() :], cfg)

    if not questions:
        blocks = re.split(r"(?=\n\d+\.\s+[A-Z])", text)
        for block in blocks:
            m = re.match(r"(\d+)\.\s+(.+?)(?:\n|$)", block)
            if not m:
                continue
            qnum = int(m.group(1))
            if qnum in questions:
                continue
            questions[qnum] = parse_block(qnum, m.group(2), block[m.end() :], cfg)

    return questions


def fetch_html(cfg):
    local_name = cfg.get("local_html")
    if local_name:
        for base in [UPLOADS, Path(r"C:\Users\merkeln\.cursor\projects\c-Users-merkeln-OneDrive-L-pple-Ausbildungs-GmbH-Desktop-modul8-10\uploads")]:
            p = base / local_name
            if p.exists():
                return p.read_text(encoding="utf-8", errors="replace")

    url = f"https://itexamanswers.net/{cfg['slug']}.html"
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 CCNA-Quiz-Builder/1.0"})
    with urllib.request.urlopen(req, timeout=60) as resp:
        return resp.read().decode("utf-8", errors="replace")


def merge_german(questions, bank_id):
    old_path = ROOT / "js" / "questions.json"
    if bank_id != "ccna1-mod8-10" or not old_path.exists():
        return questions
    old = {q["id"]: q for q in json.loads(old_path.read_text(encoding="utf-8"))}
    for q in questions:
        o = old.get(q["id"], {})
        q["questionDe"] = o.get("questionDe", q["question"])
        q["optionsDe"] = o.get("optionsDe", q["options"])
        q["mnemonic"] = o.get("mnemonic", "")
        q["moduleName"] = o.get("moduleName", "")
        if q.get("image") is None and o.get("image"):
            q["image"] = o["image"]
    return questions


def build_bank(cfg, download=True):
    if cfg["id"] == "ccna1-mod8-10":
        src = ROOT / "js" / "questions.json"
        if src.exists():
            questions = json.loads(src.read_text(encoding="utf-8"))
            for q in questions:
                q["bankId"] = cfg["id"]
            out = BANKS / f"{cfg['id']}.json"
            out.write_text(json.dumps(questions, ensure_ascii=False, indent=2), encoding="utf-8")
            return questions, None
        return None, "mod8-10 source missing"

    html = fetch_html(cfg) if download else ""
    if not html:
        return None, "no html"

    parsed = parse_html_exam(html, cfg)
    if len(parsed) < 5:
        text = extract_exam_text(html)
        if text:
            parsed = parse_all(text, cfg)

    if not parsed or len(parsed) < 5:
        return None, f"only {len(parsed)} questions parsed"
    questions = merge_german(sorted(parsed.values(), key=lambda x: x["id"]), cfg["id"])
    out = BANKS / f"{cfg['id']}.json"
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps(questions, ensure_ascii=False, indent=2), encoding="utf-8")
    return questions, None


def update_manifest(built_counts):
    manifest = ROOT / "data" / "exams.json"
    data = json.loads(manifest.read_text(encoding="utf-8"))
    for course in data["courses"]:
        for exam in course["exams"]:
            count = built_counts.get(exam["id"])
            if count and count >= 5:
                exam["available"] = True
    manifest.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def main():
    import sys
    target = sys.argv[1] if len(sys.argv) > 1 else None
    built_counts = {}
    for cfg in EXAMS:
        if target and cfg["id"] != target:
            continue
        print(f"Building {cfg['id']}...")
        questions, err = build_bank(cfg)
        if err:
            print(f"  FAILED: {err}")
            continue
        print(f"  OK: {len(questions)} questions")
        built_counts[cfg["id"]] = len(questions)
    if built_counts:
        update_manifest(built_counts)
        print(f"Updated manifest: {built_counts}")


if __name__ == "__main__":
    main()
