#!/usr/bin/env python3
import json
import re
from pathlib import Path

JSON_PATH = Path(__file__).parent.parent / "js" / "questions.json"
HTML_PATH = Path(r"C:\Users\merkeln\.cursor\projects\c-Users-merkeln-OneDrive-L-pple-Ausbildungs-GmbH-Desktop-modul8-10\uploads\ccna-1-v7-modules-8-10-communicating-between-networks-exam-answers-0.html")

# German translations from user + mnemonics
GERMAN = {
    1: "Welche Informationen werden von Routern verwendet, um ein Datenpaket zu seinem Ziel weiterzuleiten?",
    2: "Ein Computer muss ein Paket an einen Ziel-Host im selben LAN senden. Wie wird das Paket verschickt?",
    3: "Ein Router empfängt ein Paket von der Gigabit-0/0-Schnittstelle und bestimmt, dass das Paket über die Gigabit-0/1-Schnittstelle weitergeleitet werden muss. Was wird der Router als Nächstes tun?",
    4: "Welche IPv4-Adresse kann ein Host verwenden, um die Loopback-Schnittstelle zu pingen?",
    5: "Ein Computer kann auf Geräte im selben Netzwerk zugreifen, aber nicht auf Geräte in anderen Netzwerken. Was ist die wahrscheinliche Ursache?",
    6: "Welche Anweisung beschreibt eine Funktion des IP-Protokolls?",
    7: "Warum wird NAT in IPv6 nicht benötigt?",
    8: "Welchen Parameter verwendet der Router, um den Pfad zum Ziel zu wählen, wenn mehrere Routen verfügbar sind?",
    9: "Welche zwei Dienste bietet die OSI-Netzwerkschicht? (Wähle zwei.)",
    10: "Was ist innerhalb eines Produktionsnetzwerks der Zweck der Konfiguration eines Switches mit einer Standard-Gateway-Adresse?",
    11: "Was ist ein grundlegendes Merkmal des IP-Protokolls?",
    12: "Welches Feld im IPv4-Header verhindert, dass ein Paket endlos ein Netzwerk durchquert?",
    13: "Was ist ein Vorteil des vereinfachten IPv6-Headers gegenüber IPv4?",
    14: "Welches IPv4-Headerfeld identifiziert das Protokoll der oberen Schicht?",
    15: "Ordne die Pakete mit ihrer Ziel-IP-Adresse den ausgehenden Schnittstellen des Routers zu.",
    16: "Welche Informationen liefert der Loopback-Test?",
    17: "Welcher Eintrag in der Routing-Tabelle hat eine Next-Hop-Adresse?",
    18: "Wie stellen Hosts sicher, dass ihre Pakete an das richtige Netzwerkziel geleitet werden?",
    19: "Welches Feld im IPv6-Header informiert Router, denselben Pfad für Echtzeit-Pakete beizubehalten?",
    20: "Welche Aussage beschreibt die Funktion des Address Resolution Protocol (ARP)?",
    21: "Unter welchen zwei Umständen flutet ein Switch einen Frame aus jedem Port? (Wähle zwei.)",
    22: "Welche Aussage beschreibt die Behandlung von ARP-Anfragen auf der lokalen Verbindung?",
    23: "Welche Zieladresse wird in einem ARP-Anforderungsrahmen verwendet?",
    24: "Was ist das Ergebnis des Befehls arp -d * auf einem PC?",
    25: "PC1 hat einen Frame an PC3 gesendet. Was macht der Switch mit dem Frame?",
    26: "Welche zwei IPv6-Nachrichtentypen ersetzen ARP? (Wähle zwei.)",
    27: "Was ist das Ziel eines ARP-Spoofing-Angriffs?",
    28: "PC1 sendet eine ARP-Anfrage an File_server1. Welche MAC-Adresse erhält PC1?",
    29: "Wo werden IPv4-zu-MAC-Zuordnungen auf einem Host gespeichert?",
    30: "Welche Information im Ethernet-Frame-Header nutzt ein Layer-2-Gerät zum Weiterleiten?",
    31: "Ordne die Befehle den korrekten Aktionen zu.",
    32: "Wie testet ein Netzwerkadministrator am schnellsten, ob ein Banner korrekt konfiguriert ist?",
    33: "Ordne die Beschreibung der Zugriffsmethode zu.",
    34: "Ordne die Phasen den Funktionen beim Bootvorgang eines Cisco-Routers zu.",
    35: "Ordne den Befehl dem Gerätemodus zu, in dem er eingegeben wird.",
    36: "Welche zwei Funktionen hat NVRAM? (Wähle zwei.)",
    37: "Ein Router bootet und geht in den Setup-Modus. Was ist der Grund?",
    38: "Was bewirkt ip default-gateway 172.16.100.1 auf einem Switch?",
    39: "Was passiert bei transport input ssh auf den Switch-VTY-Leitungen?",
    40: "Welche IP-Adresse nutzt der PC, um Daten aus dem lokalen Netzwerk herauszusenden?",
    41: "Ordne den Konfigurationsmodus dem verfügbaren Befehl zu.",
    42: "Welche drei Befehle sichern den Konsolenzugang? (Wähle drei.)",
    43: "Was beschreibt die Standard-Gateway-Adresse von PC1?",
    44: "Welche zwei Funktionen sind Hauptfunktionen eines Routers? (Wähle zwei.)",
    45: "Was bewirkt copy running-config startup-config?",
    46: "Was passiert, wenn die Standard-Gateway-Adresse falsch konfiguriert ist?",
    47: "Welche zwei Netzwerkprobleme können durch ARP entstehen? (Wähle zwei.)",
    48: "Welche Schnittstellen in jedem Router sind aktiv und betriebsbereit?",
    49: "Welcher Begriff beschreibt ein IPv4-Headerfeld zur Identifikation des nächsten Protokolls?",
    50: "Welcher Begriff beschreibt ein 8-Bit-Feld zur Paketpriorität?",
    51: "Welcher Begriff beschreibt ein 32-Bit-Feld der sendenden Schnittstelle?",
    52: "Welcher Begriff beschreibt ein Feld zur Erkennung von Header-Korruption?",
    53: "Welche IP-Adresse ist das Standard-Gateway für einen neuen Host im Payroll LAN?",
    54: "Welcher Begriff beschreibt ein Feld mit Unicast/Multicast/Broadcast-Adresse?",
    55: "Welcher Begriff beschreibt ein Feld zur Begrenzung der Paket-Lebensdauer?",
    56: "Welcher Begriff beschreibt ein 4-Bit-Feld mit Wert 0100?",
    57: "Welcher Begriff beschreibt ein Feld zur Identifikation des nächsten Protokolls?",
    58: "Welcher Begriff beschreibt ein 4-Bit-Feld mit Wert 0100 (IPv4)?",
    59: "Welche ARP-Eigenschaft lässt IP-MAC-Einträge länger im Speicher?",
    60: "Welche ARP-Eigenschaft fixiert MAC-Adressen wichtiger Server?",
    61: "Welche ARP-Eigenschaft fixiert MAC-Adressen häufig genutzter Server?",
    62: "Welche ARP-Eigenschaft ermöglicht Hosts den Versand an entfernte Netzwerke?",
    63: "Welche IP-Adresse ist das Standard-Gateway für einen Host im Registrar LAN?",
    64: "Welche ARP-Eigenschaft zwingt alle NICs, ARP-Anfragen zu verarbeiten?",
    65: "Welche ARP-Eigenschaft bewirkt eine Unicast-Antwort nur an den Anfragenden?",
    66: "Welche ARP-Eigenschaft bewirkt Flooding auf allen Switch-Ports?",
    67: "Welche ARP-Eigenschaft leitet den Frame-Inhalt an den ARP-Prozess weiter?",
    68: "Welche ARP-Eigenschaft leitet den Frame-Inhalt an den ARP-Prozess weiter?",
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
    1: "Router schaut nur aufs ZIEL (Layer 3) – nicht Quelle, nicht MAC!",
    2: "Gleiches LAN = Direktversand. Kein Gateway nötig!",
    3: "Routing-Tabelle ✓ → Neuer L2-Frame! (MAC ändert sich pro Hop)",
    4: "127 = Loopback. Merke: 127.0.0.1 = 'Ich selbst'",
    5: "Lokal OK, remote nicht → Gateway falsch!",
    6: "IP = unzuverlässig → TCP räumt auf",
    7: "IPv6 = so viele Adressen, NAT überflüssig",
    8: "Metric: Niedriger = Besser (wie Golf-Score)",
    9: "Netzwerkschicht = Routing + Kapselung (NICHT Fehlererkennung!)",
    10: "Switch-Gateway = für EIGENEN Verkehr (Management), nicht für PCs",
    11: "IP = Connectionless, Media-unabhängig",
    12: "TTL = Time To Live → verhindert Endlosschleifen",
    13: "IPv6 = weniger Checksummen, effizientere Verarbeitung",
    14: "Protocol-Feld = welches Upper-Layer-Protokoll (TCP=6, UDP=17)",
    15: "Routing-Tabelle lesen: Longest Match + Gateway of Last Resort",
    16: "Loopback = nur TCP/IP-Stack testen, NICHT Netzwerk",
    17: "Remote Routes haben Next-Hop, Direct/Local nicht",
    18: "Host hat eigene Routing-Tabelle (Loopback + Lokal + Default)",
    19: "Flow Label = Echtzeit, gleicher Pfad",
    20: "ARP = IP → MAC im GLEICHEN Netzwerk",
    21: "Flooding bei: Broadcast ODER unbekannte MAC",
    22: "ARP = Broadcast → ALLE Geräte müssen verarbeiten",
    23: "ARP-Request Ziel-MAC = FFFF.FFFF.FFFF (Broadcast)",
    24: "arp -d * = ARP-Cache LÖSCHEN (d=delete)",
    25: "MAC unbekannt → Flood alle Ports außer Eingangsport",
    26: "IPv6: Neighbor Solicitation + Advertisement (kein ARP!)",
    27: "ARP Spoofing = falsche IP-MAC-Zuordnung",
    28: "Remote-Ziel → ARP-Antwort vom GATEWAY (R1), nicht Zielserver",
    29: "ARP-Cache = IP↔MAC Zuordnung auf dem Host",
    30: "L2 = Destination MAC Adresse!",
    31: "banner motd=Banner, password=Console, hostname=Name",
    32: "Banner testen: exit + Enter (schnellster Weg)",
    33: "SSH=sicher+remote, Console=out-of-band, AUX=Dialup, Telnet=unsicher",
    34: "Boot: POST → IOS laden → Startup-Config laden",
    35: "enable=R1>, copy=R1#, login=config-line, ip=config-if",
    36: "NVRAM = Non-Volatile → Startup-Config bleibt",
    37: "Setup-Modus = keine Config in NVRAM",
    38: "Switch ip default-gateway = Remote-Management möglich",
    39: "transport input ssh = nur verschlüsselte Verbindungen",
    40: "Default Gateway IP = Router-Interface im lokalen Netz",
    41: "enable→R1>, copy→R1#, login→config-line, interface→config",
    42: "Console sichern: line console 0 + password + login",
    43: "Default Gateway = Router-Interface im SELBEN LAN",
    44: "Router = Paketweiterleitung + Pfadauswahl",
    45: "copy run start = RAM → NVRAM speichern",
    46: "Falsches Gateway = nur Remote-Netze betroffen",
    47: "ARP-Probleme: Broadcast-Delays + Spoofing/Angriffe",
    48: "show ip interface brief → Status+Protocol = up",
    49: "Protocol-Feld = Upper Layer (TCP/UDP/ICMP)",
    50: "Differentiated Services = Priorität (8 Bit)",
    51: "Source IP = 32 Bit, Absender-Interface",
    52: "Header Checksum = Header-Integrität prüfen",
    53: "Gateway = Router-IP im GLEICHEN LAN (description lesen!)",
    54: "Destination IP = Ziel (Unicast/Multicast/Broadcast)",
    55: "TTL = Lebensdauer begrenzen",
    56: "Version 0100 = IPv4 (4 in Binär)",
    57: "Protocol = nächstes Protokoll (wie Frage 49)",
    58: "Version 0100 = IPv4",
    59: "Dynamische Einträge = Timeout/Aging",
    60: "Statischer Eintrag = manuell, kein Timeout",
    61: "Statischer Eintrag = fixiert für Server",
    62: "Remote senden = Gateway-MAC per ARP lernen",
    63: "Gateway = gi0/1 IP wenn 'Registrar LAN' in description",
    64: "FF:FF:FF:FF:FF:FF = Broadcast, alle NICs verarbeiten",
    65: "Source MAC in Request → Unicast-Reply zurück",
    66: "Broadcast MAC → Switch floodet alle Ports",
    67: "EtherType 0x0806 = ARP an OS weitergeben",
    68: "EtherType 0x0806 = ARP-Prozess",
    69: "Service LAN → gi0/1 IP-Adresse",
    70: "Medical LAN → gi0/1 IP-Adresse",
    71: "Registrar LAN → gi0/1 IP-Adresse",
    72: "Manager LAN → gi0/0 IP-Adresse",
    73: "Store LAN → gi0/0 IP-Adresse",
    74: "Store LAN → gi0/0 IP-Adresse",
    75: "Service LAN → gi0/1 IP-Adresse",
    76: "Medical LAN → gi0/1 IP-Adresse",
}

LEARNING_TOPICS = {
    8: "Netzwerkschicht (IP, IPv6, Routing, Gateway)",
    9: "Address Resolution (ARP, Switching, Ethernet)",
    10: "Cisco IOS (Router-Konfiguration, Boot, Sicherheit)",
}

def parse_config_questions(text):
    """Parse questions 53+ that have config blocks before question text."""
    pattern = r'((?:RTR1|Floor|Main|BldgA|HQ)\(config\).*?end)\s*\n+\s*\*\*Refer to the exhibit\.\s*(.+?)\*\*\s*\n+\s*(\*.*?\n)*\*\*Explanation:\*\*'
    extra = []
    for m in re.finditer(pattern, text, re.DOTALL):
        exhibit = m.group(1).strip()
        question = "Refer to the exhibit. " + m.group(2).strip()
        body = m.group(0)
        options = []
        correct = []
        for line in body.split('\n'):
            line = line.strip()
            if line.startswith('*'):
                content = line[1:].strip()
                is_correct = content.startswith('**') and content.endswith('**')
                opt = content.strip('*').strip()
                if opt and not opt.startswith('Explanation'):
                    if is_correct:
                        correct.append(len(options))
                    options.append(opt)
        expl = re.search(r'\*\*Explanation:\*\*\s*(?:Topic\s*([\d.]+)\s*)?(.*?)(?=\n\n\*\*|\n\n##|\Z)', body, re.DOTALL)
        topic = expl.group(1) if expl else '10.3.1'
        explanation = expl.group(2).strip() if expl else ''
        extra.append({
            'exhibit': exhibit,
            'question': question,
            'options': options,
            'correct': correct,
            'explanation': explanation,
            'topic': f'Topic {topic}',
        })
    return extra

def main():
    questions = json.loads(JSON_PATH.read_text(encoding='utf-8'))
    text = HTML_PATH.read_text(encoding='utf-8')
    start = text.find('**1\\. Which information')
    end = text.find('## Post navigation')
    text = text[start:end]

    config_qs = parse_config_questions(text)
    config_ids = [53, 63, 69, 70, 71, 72, 73, 74, 75, 76]
    existing_ids = {q['id'] for q in questions}

    for i, cq in enumerate(config_qs):
        if i >= len(config_ids):
            break
        qid = config_ids[i]
        if qid in existing_ids:
            continue
        questions.append({
            'id': qid,
            'module': 10,
            'type': 'single',
            'question': cq['question'],
            'options': cq['options'],
            'correct': cq['correct'],
            'explanation': cq['explanation'][:2000],
            'topic': cq['topic'],
            'image': None,
            'exhibit': cq['exhibit'],
        })

    # Enhance all questions
    for q in questions:
        qid = q['id']
        q['questionDe'] = GERMAN.get(qid, q['question'])
        q['mnemonic'] = MNEMONICS.get(qid, '')
        q['moduleName'] = LEARNING_TOPICS.get(q['module'], '')
        if not q.get('explanation'):
            # Try to extract from HTML
            pass

    questions.sort(key=lambda x: x['id'])
    JSON_PATH.write_text(json.dumps(questions, ensure_ascii=False, indent=2), encoding='utf-8')
    print(f"Enhanced {len(questions)} questions")

if __name__ == '__main__':
    main()
