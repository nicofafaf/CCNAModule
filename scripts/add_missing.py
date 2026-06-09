#!/usr/bin/env python3
import json
from pathlib import Path

JSON_PATH = Path(__file__).parent.parent / "js" / "questions.json"

MISSING = [
    {"id": 63, "exhibit": """Floor(config)# interface gi0/1
Floor(config-if)# description Connects to the Registrar LAN
Floor(config-if)# ip address 192.168.235.234 255.255.255.0
Floor(config-if)# no shutdown
Floor(config-if)# interface gi0/0
Floor(config-if)# description Connects to the Manager LAN
Floor(config-if)# ip address 192.168.234.114 255.255.255.0
Floor(config-if)# no shutdown
Floor(config-if)# interface s0/0/0
Floor(config-if)# description Connects to the ISP
Floor(config-if)# ip address 10.234.235.254 255.255.255.0
Floor(config-if)# no shutdown
Floor(config-if)# interface s0/0/1
Floor(config-if)# description Connects to the Head Office WAN
Floor(config-if)# ip address 203.0.113.3 255.255.255.0
Floor(config-if)# no shutdown
Floor(config-if)# end""", "correct": [0], "options": ["192.168.235.234", "192.168.235.1", "10.234.235.254", "203.0.113.3", "192.168.234.114"]},
    {"id": 69, "exhibit": """Main(config)# interface gi0/1
Main(config-if)# description Connects to the Service LAN
Main(config-if)# ip address 172.29.157.156 255.255.255.0
Main(config-if)# no shutdown
Main(config-if)# interface gi0/0
Main(config-if)# description Connects to the Engineering LAN
Main(config-if)# ip address 172.29.156.36 255.255.255.0
Main(config-if)# no shutdown
Main(config-if)# interface s0/0/0
Main(config-if)# description Connects to the ISP
Main(config-if)# ip address 10.156.157.254 255.255.255.0
Main(config-if)# no shutdown
Main(config-if)# interface s0/0/1
Main(config-if)# description Connects to the Head Office WAN
Main(config-if)# ip address 198.51.100.177 255.255.255.0
Main(config-if)# no shutdown
Main(config-if)# end""", "correct": [0], "options": ["172.29.157.156", "172.29.157.1", "10.156.157.254", "198.51.100.177", "172.29.156.36"]},
    {"id": 70, "exhibit": """BldgA(config)# interface gi0/1
BldgA(config-if)# description Connects to the Medical LAN
BldgA(config-if)# ip address 192.168.191.189 255.255.255.0
BldgA(config-if)# no shutdown
BldgA(config-if)# interface gi0/0
BldgA(config-if)# description Connects to the Client LAN
BldgA(config-if)# ip address 192.168.190.70 255.255.255.0
BldgA(config-if)# no shutdown
BldgA(config-if)# interface s0/0/0
BldgA(config-if)# description Connects to the ISP
BldgA(config-if)# ip address 10.190.191.254 255.255.255.0
BldgA(config-if)# no shutdown
BldgA(config-if)# interface s0/0/1
BldgA(config-if)# description Connects to the Head Office WAN
BldgA(config-if)# ip address 198.51.100.213 255.255.255.0
BldgA(config-if)# no shutdown
BldgA(config-if)# end""", "correct": [0], "options": ["192.168.191.189", "192.168.191.1", "10.190.191.254", "198.51.100.213", "192.168.190.70"]},
    {"id": 71, "exhibit": """Floor(config)# interface gi0/1
Floor(config-if)# description Connects to the Registrar LAN
Floor(config-if)# ip address 192.168.225.223 255.255.255.0
Floor(config-if)# no shutdown
Floor(config-if)# interface gi0/0
Floor(config-if)# description Connects to the Manager LAN
Floor(config-if)# ip address 192.168.224.103 255.255.255.0
Floor(config-if)# no shutdown
Floor(config-if)# interface s0/0/0
Floor(config-if)# description Connects to the ISP
Floor(config-if)# ip address 10.224.225.254 255.255.255.0
Floor(config-if)# no shutdown
Floor(config-if)# interface s0/0/1
Floor(config-if)# description Connects to the Head Office WAN
Floor(config-if)# ip address 203.0.113.246 255.255.255.0
Floor(config-if)# no shutdown
Floor(config-if)# end""", "correct": [0], "options": ["192.168.225.223", "192.168.225.1", "10.224.225.254", "203.0.113.246", "192.168.224.103"]},
    {"id": 72, "exhibit": """Floor(config)# interface gi0/1
Floor(config-if)# description Connects to the Registrar LAN
Floor(config-if)# ip address 10.118.63.65 255.255.255.0
Floor(config-if)# no shutdown
Floor(config-if)# interface gi0/0
Floor(config-if)# description Connects to the Manager LAN
Floor(config-if)# ip address 10.118.62.196 255.255.255.0
Floor(config-if)# no shutdown
Floor(config-if)# interface s0/0/0
Floor(config-if)# description Connects to the ISP
Floor(config-if)# ip address 10.62.63.254 255.255.255.0
Floor(config-if)# no shutdown
Floor(config-if)# interface s0/0/1
Floor(config-if)# description Connects to the Head Office WAN
Floor(config-if)# ip address 209.165.200.87 255.255.255.0
Floor(config-if)# no shutdown
Floor(config-if)# end""", "correct": [0], "options": ["10.118.62.196", "10.118.62.1", "10.62.63.254", "209.165.200.87", "10.118.63.65"]},
    {"id": 73, "exhibit": """HQ(config)# interface gi0/1
HQ(config-if)# description Connects to the Branch LAN
HQ(config-if)# ip address 172.19.99.99 255.255.255.0
HQ(config-if)# no shutdown
HQ(config-if)# interface gi0/0
HQ(config-if)# description Connects to the Store LAN
HQ(config-if)# ip address 172.19.98.230 255.255.255.0
HQ(config-if)# no shutdown
HQ(config-if)# interface s0/0/0
HQ(config-if)# description Connects to the ISP
HQ(config-if)# ip address 10.98.99.254 255.255.255.0
HQ(config-if)# no shutdown
HQ(config-if)# interface s0/0/1
HQ(config-if)# description Connects to the Head Office WAN
HQ(config-if)# ip address 209.165.200.120 255.255.255.0
HQ(config-if)# no shutdown
HQ(config-if)# end""", "correct": [0], "options": ["172.19.98.230", "172.19.98.1", "10.98.99.254", "209.165.200.120", "172.19.99.99"]},
    {"id": 74, "exhibit": """HQ(config)# interface gi0/1
HQ(config-if)# description Connects to the Branch LAN
HQ(config-if)# ip address 172.20.133.132 255.255.255.0
HQ(config-if)# no shutdown
HQ(config-if)# interface gi0/0
HQ(config-if)# description Connects to the Store LAN
HQ(config-if)# ip address 172.20.132.13 255.255.255.0
HQ(config-if)# no shutdown
HQ(config-if)# interface s0/0/0
HQ(config-if)# description Connects to the ISP
HQ(config-if)# ip address 10.132.133.254 255.255.255.0
HQ(config-if)# no shutdown
HQ(config-if)# interface s0/0/1
HQ(config-if)# description Connects to the Head Office WAN
HQ(config-if)# ip address 198.51.100.156 255.255.255.0
HQ(config-if)# no shutdown
HQ(config-if)# end""", "correct": [0], "options": ["172.20.132.13", "172.20.132.1", "10.132.133.254", "198.51.100.156", "172.20.133.132"]},
    {"id": 75, "exhibit": """Main(config)# interface gi0/1
Main(config-if)# description Connects to the Service LAN
Main(config-if)# ip address 192.168.167.166 255.255.255.0
Main(config-if)# no shutdown
Main(config-if)# interface gi0/0
Main(config-if)# description Connects to the Engineering LAN
Main(config-if)# ip address 192.168.166.46 255.255.255.0
Main(config-if)# no shutdown
Main(config-if)# interface s0/0/0
Main(config-if)# description Connects to the ISP
Main(config-if)# ip address 10.166.167.254 255.255.255.0
Main(config-if)# no shutdown
Main(config-if)# interface s0/0/1
Main(config-if)# description Connects to the Head Office WAN
Main(config-if)# ip address 198.51.100.189 255.255.255.0
Main(config-if)# no shutdown
Main(config-if)# end""", "correct": [0], "options": ["192.168.167.166", "192.168.167.1", "10.166.167.254", "198.51.100.189", "192.168.166.46"]},
    {"id": 76, "exhibit": """BldgA(config)# interface gi0/1
BldgA(config-if)# description Connects to the Medical LAN
BldgA(config-if)# ip address 192.168.201.200 255.255.255.0
BldgA(config-if)# no shutdown
BldgA(config-if)# interface gi0/0
BldgA(config-if)# description Connects to the Client LAN
BldgA(config-if)# ip address 192.168.200.80 255.255.255.0
BldgA(config-if)# no shutdown
BldgA(config-if)# interface s0/0/0
BldgA(config-if)# description Connects to the ISP
BldgA(config-if)# ip address 10.200.201.254 255.255.255.0
BldgA(config-if)# no shutdown
BldgA(config-if)# interface s0/0/1
BldgA(config-if)# description Connects to the Head Office WAN
BldgA(config-if)# ip address 203.0.113.222 255.255.255.0
BldgA(config-if)# no shutdown
BldgA(config-if)# end""", "correct": [0], "options": ["192.168.201.200", "192.168.201.1", "10.200.201.254", "203.0.113.222", "192.168.200.80"]},
]

GERMAN = {
    63: "Welche IP-Adresse ist das Standard-Gateway für einen Host im Registrar LAN?",
    69: "Welche IP-Adresse ist das Standard-Gateway für einen Host im Service LAN?",
    70: "Welche IP-Adresse ist das Standard-Gateway für einen Host im Medical LAN?",
    71: "Welche IP-Adresse ist das Standard-Gateway für einen Host im Registrar LAN?",
    72: "Welche IP-Adresse ist das Standard-Gateway für einen Host im Manager LAN?",
    73: "Welche IP-Adresse ist das Standard-Gateway für einen Host im Store LAN?",
    74: "Welche IP-Adresse ist das Standard-Gateway für einen Host im Store LAN?",
    75: "Welche IP-Adresse ist das Standard-Gateway für einen Host im Service LAN?",
    76: "Welche IP-Adresse ist das Standard-Gateway für einen Host im Medical LAN?",
}

MNEMONICS = {
    63: "Registrar LAN → gi0/1 IP (description lesen!)",
    69: "Service LAN → gi0/1 IP-Adresse",
    70: "Medical LAN → gi0/1 IP-Adresse",
    71: "Registrar LAN → gi0/1 IP-Adresse",
    72: "Manager LAN → gi0/0 IP-Adresse",
    73: "Store LAN → gi0/0 IP-Adresse",
    74: "Store LAN → gi0/0 IP-Adresse",
    75: "Service LAN → gi0/1 IP-Adresse",
    76: "Medical LAN → gi0/1 IP-Adresse",
}

def main():
    questions = json.loads(JSON_PATH.read_text(encoding='utf-8'))
    ids = {q['id'] for q in questions}
    for m in MISSING:
        if m['id'] in ids:
            continue
        questions.append({
            'id': m['id'],
            'module': 10,
            'type': 'single',
            'question': 'Refer to the exhibit. A network administrator is connecting a new host. The host needs to communicate with remote networks. What IP address would be configured as the default gateway on the new host?',
            'questionDe': GERMAN[m['id']],
            'options': m['options'],
            'correct': m['correct'],
            'explanation': 'Das Standard-Gateway muss die IP-Adresse der Router-Schnittstelle sein, die direkt mit dem LAN des Hosts verbunden ist. Lies die "description" in der Konfiguration!',
            'topic': 'Topic 10.3.1',
            'image': None,
            'exhibit': m['exhibit'],
            'mnemonic': MNEMONICS[m['id']],
            'moduleName': 'Cisco IOS (Router-Konfiguration, Boot, Sicherheit)',
        })
    questions.sort(key=lambda x: x['id'])
    JSON_PATH.write_text(json.dumps(questions, ensure_ascii=False, indent=2), encoding='utf-8')
    # Also create questions.js
    js_path = JSON_PATH.parent / 'questions.js'
    js_path.write_text('const QUESTIONS = ' + json.dumps(questions, ensure_ascii=False, indent=2) + ';\n', encoding='utf-8')
    print(f"Total: {len(questions)} questions")

if __name__ == '__main__':
    main()
