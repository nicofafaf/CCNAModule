const QUESTIONS = [
  {
    "id": 1,
    "module": 8,
    "type": "single",
    "question": "Which information is used by routers to forward a data packet toward its destination?",
    "options": [
      "source IP address",
      "destination IP address",
      "source data-link address",
      "destination data-link address"
    ],
    "correct": [
      1
    ],
    "explanation": "",
    "topic": "Topic 8.5.1",
    "image": null,
    "exhibit": null,
    "questionDe": "Welche Informationen werden von Routern verwendet, um ein Datenpaket in Richtung seines Ziels weiterzuleiten?",
    "mnemonic": "Router schaut nur aufs ZIEL (Layer 3) – nicht Quelle, nicht MAC!",
    "moduleName": "Netzwerkschicht (IP, IPv6, Routing, Gateway)",
    "optionsDe": [
      "Quell-IP-Adresse",
      "Ziel-IP-Adresse",
      "Quell-Datenverbindungsadresse",
      "Ziel-Datenverbindungsadresse"
    ]
  },
  {
    "id": 2,
    "module": 8,
    "type": "single",
    "question": "A computer has to send a packet to a destination host in the same LAN. How will the packet be sent?",
    "options": [
      "The packet will be sent to the default gateway first, and then, depending on the response from the gateway, it may be sent to the destination host.",
      "The packet will be sent directly to the destination host.",
      "The packet will first be sent to the default gateway, and then from the default gateway it will be sent directly to the destination host.",
      "The packet will be sent only to the default gateway."
    ],
    "correct": [
      1
    ],
    "explanation": "",
    "topic": "Topic 8.4.1",
    "image": null,
    "exhibit": null,
    "questionDe": "Ein Computer muss ein Paket an einen Ziel-Host im selben LAN senden. Wie wird das Paket gesendet?",
    "mnemonic": "Gleiches LAN = Direktversand. Kein Gateway nötig!",
    "moduleName": "Netzwerkschicht (IP, IPv6, Routing, Gateway)",
    "optionsDe": [
      "Das Paket wird zuerst an das Standard-Gateway gesendet und je nach Antwort des Gateways eventuell an den Ziel-Host.",
      "Das Paket wird direkt an den Ziel-Host gesendet.",
      "Das Paket wird zuerst an das Standard-Gateway gesendet und von dort direkt an den Ziel-Host.",
      "Das Paket wird nur an das Standard-Gateway gesendet."
    ]
  },
  {
    "id": 3,
    "module": 8,
    "type": "single",
    "question": "A router receives a packet from the Gigabit 0/0 interface and determines that the packet needs to be forwarded out the Gigabit 0/1 interface. What will the router do next?",
    "options": [
      "route the packet out the Gigabit 0/1 interface",
      "create a new Layer 2 Ethernet frame to be sent to the destination",
      "look into the ARP cache to determine the destination IP address",
      "look into the routing table to determine if the destination network is in the routing table"
    ],
    "correct": [
      1
    ],
    "explanation": "",
    "topic": "Topic 8.5.1",
    "image": null,
    "exhibit": null,
    "questionDe": "Ein Router empfängt ein Paket über die Gigabit-0/0-Schnittstelle und bestimmt, dass das Paket über die Gigabit-0/1-Schnittstelle weitergeleitet werden muss. Was wird der Router als Nächstes tun?",
    "mnemonic": "Routing-Tabelle ✓ → Neuer L2-Frame! (MAC ändert sich pro Hop)",
    "moduleName": "Netzwerkschicht (IP, IPv6, Routing, Gateway)",
    "optionsDe": [
      "Das Paket über die Gigabit-0/1-Schnittstelle weiterleiten",
      "Einen neuen Layer-2-Ethernet-Frame für das Ziel erstellen",
      "Den ARP-Cache prüfen, um die Ziel-IP-Adresse zu ermitteln",
      "Die Routing-Tabelle prüfen, ob das Zielnetzwerk in der Routing-Tabelle ist"
    ]
  },
  {
    "id": 4,
    "module": 8,
    "type": "single",
    "question": "Which IPv4 address can a host use to ping the loopback interface?",
    "options": [
      "126.0.0.1",
      "127.0.0.0",
      "126.0.0.0",
      "127.0.0.1"
    ],
    "correct": [
      3
    ],
    "explanation": "",
    "topic": "Topic 8.4.1",
    "image": null,
    "exhibit": null,
    "questionDe": "Welche IPv4-Adresse kann ein Host verwenden, um die Loopback-Schnittstelle anzupingen?",
    "mnemonic": "127 = Loopback. Merke: 127.0.0.1 = 'Ich selbst'",
    "moduleName": "Netzwerkschicht (IP, IPv6, Routing, Gateway)",
    "optionsDe": [
      "126.0.0.1",
      "127.0.0.0",
      "126.0.0.0",
      "127.0.0.1"
    ]
  },
  {
    "id": 5,
    "module": 8,
    "type": "single",
    "question": "A computer can access devices on the same network but cannot access devices on other networks. What is the probable cause of this problem?",
    "options": [
      "The cable is not connected properly to the NIC.",
      "The computer has an invalid IP address.",
      "The computer has an incorrect subnet mask.",
      "The computer has an invalid default gateway address."
    ],
    "correct": [
      3
    ],
    "explanation": "",
    "topic": "Topic 8.4.2",
    "image": null,
    "exhibit": null,
    "questionDe": "Ein Computer kann auf Geräte im selben Netzwerk zugreifen, aber nicht auf Geräte in anderen Netzwerken. Was ist die wahrscheinliche Ursache dieses Problems?",
    "mnemonic": "Lokal OK, remote nicht → Gateway falsch!",
    "moduleName": "Netzwerkschicht (IP, IPv6, Routing, Gateway)",
    "optionsDe": [
      "Das Kabel ist nicht richtig an die NIC angeschlossen.",
      "Der Computer hat eine ungültige IP-Adresse.",
      "Der Computer hat eine falsche Subnetzmaske.",
      "Der Computer hat eine ungültige Standard-Gateway-Adresse."
    ]
  },
  {
    "id": 6,
    "module": 8,
    "type": "single",
    "question": "Which statement describes a feature of the IP protocol?",
    "options": [
      "IP encapsulation is modified based on network media.",
      "IP relies on Layer 2 protocols for transmission error control.",
      "MAC addresses are used during the IP packet encapsulation.",
      "IP relies on upper layer services to handle situations of missing or out-of-order packets."
    ],
    "correct": [
      3
    ],
    "explanation": "IP protocol is a connection-less protocol, considered unreliable in terms of end-to-end delivery. It does not provide error control in the cases where receiving packets are out-of-order or in cases of missing packets. It relies on upper layer services, such as TCP, to resolve these issues.",
    "topic": "Topic 8.1.5",
    "image": null,
    "exhibit": null,
    "questionDe": "Welche Aussage beschreibt ein Merkmal des IP-Protokolls?",
    "mnemonic": "IP = unzuverlässig → TCP räumt auf",
    "moduleName": "Netzwerkschicht (IP, IPv6, Routing, Gateway)",
    "optionsDe": [
      "Die IP-Kapselung wird je nach Netzwerkmedium angepasst.",
      "IP verlässt sich auf Layer-2-Protokolle zur Übertragungsfehlerkontrolle.",
      "MAC-Adressen werden bei der IP-Paket-Kapselung verwendet.",
      "IP verlässt sich auf höhere Schichten bei fehlenden oder falsch sortierten Paketen."
    ]
  },
  {
    "id": 7,
    "module": 8,
    "type": "single",
    "question": "Why is NAT not needed in IPv6?​",
    "options": [
      "Because IPv6 has integrated security, there is no need to hide the IPv6 addresses of internal networks.​",
      "Any host or user can get a public IPv6 network address because the number of available IPv6 addresses is extremely large.​",
      "The problems that are induced by NAT applications are solved because the IPv6 header improves packet handling by intermediate routers.​",
      "The end-to-end connectivity problems that are caused by NAT are solved because the number of routes increases with the number of nodes that are connected to the Internet."
    ],
    "correct": [
      1
    ],
    "explanation": "The large number of public IPv6 addresses eliminates the need for NAT. Sites from the largest enterprises to single households can get public IPv6 network addresses. This avoids some of the NAT-induced application problems that are experienced by applications that require end-to-end connectivity.",
    "topic": "Topic 8.3.2",
    "image": null,
    "exhibit": null,
    "questionDe": "Warum wird NAT in IPv6 nicht benötigt?",
    "mnemonic": "IPv6 = so viele Adressen, NAT überflüssig",
    "moduleName": "Netzwerkschicht (IP, IPv6, Routing, Gateway)",
    "optionsDe": [
      "Da IPv6 integrierte Sicherheit hat, müssen IPv6-Adressen interner Netze nicht verborgen werden.",
      "Jeder Host kann eine öffentliche IPv6-Adresse erhalten, weil extrem viele IPv6-Adressen verfügbar sind.",
      "NAT-Probleme werden gelöst, weil der IPv6-Header die Paketverarbeitung durch Router verbessert.",
      "End-to-End-Probleme durch NAT werden gelöst, weil die Routenanzahl mit der Anzahl der Internet-Knoten steigt."
    ]
  },
  {
    "id": 8,
    "module": 8,
    "type": "single",
    "question": "Which parameter does the router use to choose the path to the destination when there are multiple routes available?",
    "options": [
      "the lower metric value that is associated with the destination network",
      "the lower gateway IP address to get to the destination network",
      "the higher metric value that is associated with the destination network",
      "the higher gateway IP address to get to the destination network"
    ],
    "correct": [
      0
    ],
    "explanation": "",
    "topic": "Topic 8.5.1",
    "image": null,
    "exhibit": null,
    "questionDe": "Welchen Parameter verwendet der Router, um den Pfad zum Ziel zu wählen, wenn mehrere Routen verfügbar sind?",
    "mnemonic": "Metric: Niedriger = Besser (wie Golf-Score)",
    "moduleName": "Netzwerkschicht (IP, IPv6, Routing, Gateway)",
    "optionsDe": [
      "der niedrigere Metrikwert des Zielnetzwerks",
      "die niedrigere Gateway-IP-Adresse zum Zielnetzwerk",
      "der höhere Metrikwert des Zielnetzwerks",
      "die höhere Gateway-IP-Adresse zum Zielnetzwerk"
    ]
  },
  {
    "id": 9,
    "module": 8,
    "type": "multiple",
    "question": "What are two services provided by the OSI network layer? (Choose two.)",
    "options": [
      "performing error detection",
      "routing packets toward the destination",
      "encapsulating PDUs from the transport layer",
      "placement of frames on the media",
      "collision detection"
    ],
    "correct": [
      1,
      2
    ],
    "explanation": "The OSI network layer provides several services to allow communication between devices:\n\n* addressing\n* encapsulation\n* routing\n* de-encapsulation\n\nError detection, placing frames on the media, and collision detection are all functions of the data ink layer.",
    "topic": "Topic 8.1.1",
    "image": null,
    "exhibit": null,
    "questionDe": "Welche zwei Dienste werden von der OSI-Netzwerkschicht bereitgestellt? (Wählen Sie zwei.)",
    "mnemonic": "Netzwerkschicht = Routing + Kapselung (NICHT Fehlererkennung!)",
    "moduleName": "Netzwerkschicht (IP, IPv6, Routing, Gateway)",
    "optionsDe": [
      "Fehlererkennung durchführen",
      "Pakete zum Ziel weiterleiten",
      "PDUs der Transportschicht kapseln",
      "Frames auf das Medium platzieren",
      "Kollisionserkennung"
    ]
  },
  {
    "id": 10,
    "module": 8,
    "type": "single",
    "question": "Within a production network, what is the purpose of configuring a switch with a default gateway address?",
    "options": [
      "Hosts that are connected to the switch can use the switch default gateway address to forward packets to a remote destination.",
      "A switch must have a default gateway to be accessible by Telnet and SSH.",
      "The default gateway address is used to forward packets originating from the switch to remote networks.",
      "It provides a next-hop address for all traffic that flows through the switch."
    ],
    "correct": [
      2
    ],
    "explanation": "A default gateway address allows a switch to forward packets that originate on the switch to remote networks. A default gateway address on a switch does not provide Layer 3 routing for PCs that are connected on that switch. A switch can still be accessible from Telnet as long as the source of the Telnet connection is on the local network.",
    "topic": "Topic 8.4.2",
    "image": null,
    "exhibit": null,
    "questionDe": "Was ist innerhalb eines Produktionsnetzwerks der Zweck, einen Switch mit einer Standard-Gateway-Adresse zu konfigurieren?",
    "mnemonic": "Switch-Gateway = für EIGENEN Verkehr (Management), nicht für PCs",
    "moduleName": "Netzwerkschicht (IP, IPv6, Routing, Gateway)",
    "optionsDe": [
      "Hosts am Switch können die Standard-Gateway-Adresse des Switches nutzen, um Pakete an ein entferntes Ziel zu senden.",
      "Ein Switch benötigt ein Standard-Gateway, um per Telnet und SSH erreichbar zu sein.",
      "Die Standard-Gateway-Adresse wird genutzt, um vom Switch ausgehende Pakete an entfernte Netze weiterzuleiten.",
      "Sie liefert eine Next-Hop-Adresse für den gesamten durch den Switch fließenden Verkehr."
    ]
  },
  {
    "id": 11,
    "module": 8,
    "type": "single",
    "question": "What is a basic characteristic of the IP protocol?",
    "options": [
      "connectionless",
      "media dependent",
      "user data segmentation",
      "reliable end-to-end delivery"
    ],
    "correct": [
      0
    ],
    "explanation": "Internet Protocol (IP) is a network layer protocol that does not require initial exchange of control information to establish an end-to-end connection before packets are forwarded. Thus, IP is connectionless and does not provide reliable end-to-end delivery by itself. IP is media independent. User data segmentation is a service provided at the transport layer.",
    "topic": "Topic 8.1.3",
    "image": null,
    "exhibit": null,
    "questionDe": "Was ist ein grundlegendes Merkmal des IP-Protokolls?",
    "mnemonic": "IP = Connectionless, Media-unabhängig",
    "moduleName": "Netzwerkschicht (IP, IPv6, Routing, Gateway)",
    "optionsDe": [
      "verbindungslos",
      "medienabhängig",
      "Segmentierung von Nutzerdaten",
      "zuverlässige End-to-End-Übertragung"
    ]
  },
  {
    "id": 12,
    "module": 8,
    "type": "single",
    "question": "Which field in the IPv4 header is used to prevent a packet from traversing a network endlessly?",
    "options": [
      "Time-to-Live",
      "Sequence Number",
      "Acknowledgment Number",
      "Differentiated Services"
    ],
    "correct": [
      0
    ],
    "explanation": "The value of the Time-to-Live (TTL) field in the IPv4 header is used to limit the lifetime of a packet. The sending host sets the initial TTL value; which is decreased by one each time the packet is processed by a router. If the TTL field decrements to zero, the router discards the packet and sends an Internet Control Message Protocol (ICMP) Time Exceeded message to the source IP address. The Differentiated Services (DS) field is used to determine the priority of each packet. Sequence Number and Acknowledgment Number are two fields in the TCP header.",
    "topic": "Topic 8.2.2",
    "image": null,
    "exhibit": null,
    "questionDe": "Welches Feld im IPv4-Header wird verwendet, um zu verhindern, dass ein Paket ein Netzwerk endlos durchläuft?",
    "mnemonic": "TTL = Time To Live → verhindert Endlosschleifen",
    "moduleName": "Netzwerkschicht (IP, IPv6, Routing, Gateway)",
    "optionsDe": [
      "Time-to-Live",
      "Sequenznummer",
      "Bestätigungsnummer",
      "Differentiated Services"
    ]
  },
  {
    "id": 13,
    "module": 8,
    "type": "single",
    "question": "What is one advantage that the IPv6 simplified header offers over IPv4?",
    "options": [
      "smaller-sized header",
      "little requirement for processing checksums",
      "smaller-sized source and destination IP addresses",
      "efficient packet handling"
    ],
    "correct": [
      3
    ],
    "explanation": "The IPv6 simplified header offers several advantages over IPv4:\n\n* Better routing efficiency and efficient packet handling for performance and forwarding-rate scalability\n* No requirement for processing checksums\n* Simplified and more efficient extension header mechanisms (as opposed to the IPv4 Options field)\n* A Flow Label field for per-flow processing with no need to open the transport inner packet to identify the various traffic flows",
    "topic": "Topic 8.3.3",
    "image": null,
    "exhibit": null,
    "questionDe": "Was ist ein Vorteil, den der vereinfachte IPv6-Header gegenüber IPv4 bietet?",
    "mnemonic": "IPv6 = weniger Checksummen, effizientere Verarbeitung",
    "moduleName": "Netzwerkschicht (IP, IPv6, Routing, Gateway)",
    "optionsDe": [
      "kleinerer Header",
      "geringerer Aufwand für Prüfsummenberechnung",
      "kleinere Quell- und Ziel-IP-Adressen",
      "effiziente Paketverarbeitung"
    ]
  },
  {
    "id": 14,
    "module": 8,
    "type": "single",
    "question": "What IPv4 header field identifies the upper layer protocol carried in the packet?",
    "options": [
      "Protocol",
      "Identification",
      "Version",
      "Differentiated Services"
    ],
    "correct": [
      0
    ],
    "explanation": "It is the Protocol field in the IP header that identifies the upper-layer protocol the packet is carrying. The Version field identifies the IP version. The Differential Services field is used for setting packet priority. The Identification field is used to reorder fragmented packets.",
    "topic": "Topic 8.2.2",
    "image": null,
    "exhibit": null,
    "questionDe": "Welches IPv4-Headerfeld identifiziert das Protokoll der oberen Schicht, das im Paket transportiert wird?",
    "mnemonic": "Protocol-Feld = welches Upper-Layer-Protokoll (TCP=6, UDP=17)",
    "moduleName": "Netzwerkschicht (IP, IPv6, Routing, Gateway)",
    "optionsDe": [
      "Protokoll",
      "Identifikation",
      "Version",
      "Differentiated Services"
    ]
  },
  {
    "id": 15,
    "module": 8,
    "type": "ordering",
    "question": "Refer to the exhibit. Match the packets with their destination IP address to the exiting interfaces on the router. (Not all targets are used.)",
    "options": [
      "packets with destination of 172.17.6.15 → FastEthernet0/0",
      "packets with destination of 172.17.14.8 → FastEthernet0/1",
      "packets with destination of 172.17.12.10 → FastEthernet1/0",
      "packets with destination of 172.17.10.5 → FastEthernet1/1",
      "packets with destination of 172.17.8.20 → Serial0/0/0"
    ],
    "correct": [
      0,
      1,
      2,
      3,
      4
    ],
    "explanation": "Packets with a destination of 172.17.6.15 are forwarded through Fa0/0. Packets with a destination of 172.17.10.5 are forwarded through Fa1/1. Packets with a destination of 172.17.12.10 are forwarded through Fa1/0. Packets with a destination of 172.17.14.8 are forwarded through Fa0/1. Because network 172.17.8.0 has no entry in the routing table, it will take the gateway of last resort, which means that packets with a destination of 172.17.8.20 are forwarded through Serial0/0/0. Because a gateway of last resort exists, no packets will be dropped.",
    "topic": "Topic 8.5.1",
    "image": "assets/images/q15-routing.png",
    "exhibit": null,
    "questionDe": "Beziehen Sie sich auf die Abbildung. Ordnen Sie die Pakete anhand ihrer Ziel-IP-Adresse den ausgehenden Schnittstellen am Router zu. (Nicht alle Ziele werden verwendet.)",
    "mnemonic": "Routing-Tabelle lesen: Longest Match + Gateway of Last Resort",
    "moduleName": "Netzwerkschicht (IP, IPv6, Routing, Gateway)",
    "optionsDe": [
      "Pakete mit Zieladresse 172.17.6.15 → FastEthernet0/0",
      "Pakete mit Zieladresse 172.17.14.8 → FastEthernet0/1",
      "Pakete mit Zieladresse 172.17.12.10 → FastEthernet1/0",
      "Pakete mit Zieladresse 172.17.10.5 → FastEthernet1/1",
      "Pakete mit Zieladresse 172.17.8.20 → Serial0/0/0"
    ]
  },
  {
    "id": 16,
    "module": 8,
    "type": "single",
    "question": "What information does the loopback test provide?",
    "options": [
      "The TCP/IP stack on the device is working correctly.",
      "The device has end-to-end connectivity.",
      "DHCP is working correctly.",
      "The Ethernet cable is working correctly.",
      "The device has the correct IP address on the network."
    ],
    "correct": [
      0
    ],
    "explanation": "Because the loopback test sends packets back to the host device, it does not provide information about network connectivity to other hosts. The loopback test verifies that the host NIC, drivers, and TCP/IP stack are functioning.",
    "topic": "Topic 8.4.1",
    "image": null,
    "exhibit": null,
    "questionDe": "Welche Informationen liefert der Loopback-Test?",
    "mnemonic": "Loopback = nur TCP/IP-Stack testen, NICHT Netzwerk",
    "moduleName": "Netzwerkschicht (IP, IPv6, Routing, Gateway)",
    "optionsDe": [
      "Der TCP/IP-Stack auf dem Gerät funktioniert korrekt.",
      "Das Gerät hat End-to-End-Konnektivität.",
      "DHCP funktioniert korrekt.",
      "Das Ethernet-Kabel funktioniert korrekt.",
      "Das Gerät hat die richtige IP-Adresse im Netzwerk."
    ]
  },
  {
    "id": 17,
    "module": 8,
    "type": "single",
    "question": "What routing table entry has a next hop address associated with a destination network?",
    "options": [
      "directly-connected routes",
      "local routes",
      "remote routes",
      "C and L source routes"
    ],
    "correct": [
      2
    ],
    "explanation": "Routing table entries for remote routes will have a next hop IP address. The next hop IP address is the address of the router interface of the next device to be used to reach the destination network. Directly-connected and local routes have no next hop, because they do not require going through another router to be reached.",
    "topic": "Topic 8.5.4",
    "image": null,
    "exhibit": null,
    "questionDe": "Welcher Routing-Tabelleneintrag hat eine Next-Hop-Adresse, die einem Zielnetzwerk zugeordnet ist?",
    "mnemonic": "Remote Routes haben Next-Hop, Direct/Local nicht",
    "moduleName": "Netzwerkschicht (IP, IPv6, Routing, Gateway)",
    "optionsDe": [
      "direkt verbundene Routen",
      "lokale Routen",
      "Remote-Routen",
      "C- und L-Quellrouten"
    ]
  },
  {
    "id": 18,
    "module": 8,
    "type": "single",
    "question": "How do hosts ensure that their packets are directed to the correct network destination?",
    "options": [
      "They have to keep their own local routing table that contains a route to the loopback interface, a local network route, and a remote default route.​",
      "They always direct their packets to the default gateway, which will be responsible for the packet delivery.",
      "They search in their own local routing table for a route to the network destination address and pass this information to the default gateway.",
      "They send a query packet to the default gateway asking for the best route."
    ],
    "correct": [
      0
    ],
    "explanation": "Hosts must maintain their own local routing table to ensure that network layer packets are directed to the correct destination network. This local table typically contains a route to the loopback interface, a route to the network that the host is connected to, and a local default route, which represents the route that packets must take to reach all remote network addresses.",
    "topic": "Topic 8.4.4",
    "image": null,
    "exhibit": null,
    "questionDe": "Wie stellen Hosts sicher, dass ihre Pakete zum richtigen Netzwerkziel geleitet werden?",
    "mnemonic": "Host hat eigene Routing-Tabelle (Loopback + Lokal + Default)",
    "moduleName": "Netzwerkschicht (IP, IPv6, Routing, Gateway)",
    "optionsDe": [
      "Sie führen eine eigene lokale Routing-Tabelle mit Route zur Loopback-Schnittstelle, lokaler Netzwerk-Route und Remote-Default-Route.",
      "Sie leiten alle Pakete immer an das Standard-Gateway weiter, das für die Zustellung zuständig ist.",
      "Sie suchen in der lokalen Routing-Tabelle nach einer Route zum Ziel und übergeben diese Information an das Standard-Gateway.",
      "Sie senden ein Abfragepaket an das Standard-Gateway und fragen nach der besten Route."
    ]
  },
  {
    "id": 19,
    "module": 8,
    "type": "single",
    "question": "When transporting data from real-time applications, such as streaming audio and video, which field in the IPv6 header can be used to inform the routers and switches to maintain the same path for the packets in the same conversation?",
    "options": [
      "Next Header",
      "Flow Label",
      "Traffic Class",
      "Differentiated Services"
    ],
    "correct": [
      1
    ],
    "explanation": "The Flow Label in IPv6 header is a 20-bit field that provides a special service for real-time applications. This field can be used to inform routers and switches to maintain the same path for the packet flow so that packets will not be reordered.",
    "topic": "Topic 8.3.4",
    "image": null,
    "exhibit": null,
    "questionDe": "Beim Transport von Daten aus Echtzeitanwendungen, wie Streaming-Audio und -Video: Welches Feld im IPv6-Header kann verwendet werden, um Router und Switches darüber zu informieren, für die Pakete derselben Konversation denselben Pfad beizubehalten?",
    "mnemonic": "Flow Label = Echtzeit, gleicher Pfad",
    "moduleName": "Netzwerkschicht (IP, IPv6, Routing, Gateway)",
    "optionsDe": [
      "Next Header",
      "Flow Label",
      "Traffic Class",
      "Differentiated Services"
    ]
  },
  {
    "id": 20,
    "module": 9,
    "type": "single",
    "question": "What statement describes the function of the Address Resolution Protocol?",
    "options": [
      "ARP is used to discover the IP address of any host on a different network.",
      "ARP is used to discover the IP address of any host on the local network.",
      "ARP is used to discover the MAC address of any host on a different network.",
      "ARP is used to discover the MAC address of any host on the local network."
    ],
    "correct": [
      3
    ],
    "explanation": "When a PC wants to send data on the network, it always knows the IP address of the destination. However, it also needs to discover the MAC address of the destination. ARP is the protocol that is used to discover the MAC address of a host that belongs to the same network.",
    "topic": "Topic 9.2.1",
    "image": null,
    "exhibit": null,
    "questionDe": "Welche Aussage beschreibt die Funktion des Address Resolution Protocol?",
    "mnemonic": "ARP = IP → MAC im GLEICHEN Netzwerk",
    "moduleName": "Address Resolution (ARP, Switching, Ethernet)",
    "optionsDe": [
      "ARP wird genutzt, um die IP-Adresse eines Hosts in einem anderen Netzwerk zu ermitteln.",
      "ARP wird genutzt, um die IP-Adresse eines Hosts im lokalen Netzwerk zu ermitteln.",
      "ARP wird genutzt, um die MAC-Adresse eines Hosts in einem anderen Netzwerk zu ermitteln.",
      "ARP wird genutzt, um die MAC-Adresse eines Hosts im lokalen Netzwerk zu ermitteln."
    ]
  },
  {
    "id": 21,
    "module": 9,
    "type": "multiple",
    "question": "Under which two circumstances will a switch flood a frame out of every port except the port that the frame was received on? (Choose two.)",
    "options": [
      "The frame has the broadcast address as the destination address.",
      "The destination address is unknown to the switch.",
      "The source address in the frame header is the broadcast address.",
      "The source address in the frame is a multicast address.",
      "The destination address in the frame is a known unicast address."
    ],
    "correct": [
      0,
      1
    ],
    "explanation": "A switch will flood a frame out of every port, except the one that the frame was received from, under two circumstances. Either the frame has the broadcast address as the destination address, or the destination address is unknown to the switch.",
    "topic": "Topic 9.2.3",
    "image": null,
    "exhibit": null,
    "questionDe": "Unter welchen zwei Umständen wird ein Switch einen Frame über jeden Port fluten, außer über den Port, an dem der Frame empfangen wurde? (Wählen Sie zwei.)",
    "mnemonic": "Flooding bei: Broadcast ODER unbekannte MAC",
    "moduleName": "Address Resolution (ARP, Switching, Ethernet)",
    "optionsDe": [
      "Der Frame hat die Broadcast-Adresse als Zieladresse.",
      "Die Zieladresse ist dem Switch unbekannt.",
      "Die Quelladresse im Frame-Header ist die Broadcast-Adresse.",
      "Die Quelladresse im Frame ist eine Multicast-Adresse.",
      "Die Zieladresse im Frame ist eine bekannte Unicast-Adresse."
    ]
  },
  {
    "id": 22,
    "module": 9,
    "type": "single",
    "question": "Which statement describes the treatment of ARP requests on the local link?",
    "options": [
      "They must be forwarded by all routers on the local network.",
      "They are received and processed by every device on the local network.",
      "They are dropped by all switches on the local network.",
      "They are received and processed only by the target device."
    ],
    "correct": [
      1
    ],
    "explanation": "One of the negative issues with ARP requests is that they are sent as a broadcast. This means all devices on the local link must receive and process the request.",
    "topic": "Topic 9.2.8",
    "image": null,
    "exhibit": null,
    "questionDe": "Welche Aussage beschreibt die Behandlung von ARP-Anfragen auf der lokalen Verbindung?",
    "mnemonic": "ARP = Broadcast → ALLE Geräte müssen verarbeiten",
    "moduleName": "Address Resolution (ARP, Switching, Ethernet)",
    "optionsDe": [
      "Sie müssen von allen Routern im lokalen Netzwerk weitergeleitet werden.",
      "Sie werden von jedem Gerät im lokalen Netzwerk empfangen und verarbeitet.",
      "Sie werden von allen Switches im lokalen Netzwerk verworfen.",
      "Sie werden nur vom Zielgerät empfangen und verarbeitet."
    ]
  },
  {
    "id": 23,
    "module": 9,
    "type": "single",
    "question": "Which destination address is used in an ARP request frame?",
    "options": [
      "0.0.0.0",
      "255.255.255.255",
      "FFFF.FFFF.FFFF",
      "AAAA.AAAA.AAAA",
      "the physical address of the destination host"
    ],
    "correct": [
      2
    ],
    "explanation": "The purpose of an ARP request is to find the MAC address of the destination host on an Ethernet LAN. The ARP process sends a Layer 2 broadcast to all devices on the Ethernet LAN. The frame contains the IP address of the destination and the broadcast MAC address, FFFF.FFFF.FFFF. The host with the IP address that matches the IP address in the ARP request will reply with a unicast frame that includes the MAC address of the host. Thus the original sending host will obtain the destination IP and MAC address pair to continue the encapsulation process for data transmission.",
    "topic": "Topic 9.2.3",
    "image": null,
    "exhibit": null,
    "questionDe": "Welche Zieladresse wird in einem ARP-Request-Frame verwendet?",
    "mnemonic": "ARP-Request Ziel-MAC = FFFF.FFFF.FFFF (Broadcast)",
    "moduleName": "Address Resolution (ARP, Switching, Ethernet)",
    "optionsDe": [
      "0.0.0.0",
      "255.255.255.255",
      "FFFF.FFFF.FFFF",
      "AAAA.AAAA.AAAA",
      "die physische Adresse des Ziel-Hosts"
    ]
  },
  {
    "id": 24,
    "module": 9,
    "type": "single",
    "question": "A network technician issues the arp -d * command on a PC after the router that is connected to the LAN is reconfigured. What is the result after this command is issued?",
    "options": [
      "The ARP cache is cleared.",
      "The current content of the ARP cache is displayed.",
      "The detailed information of the ARP cache is displayed.",
      "The ARP cache is synchronized with the router interface."
    ],
    "correct": [
      0
    ],
    "explanation": "Issuing the **arp –d *** command on a PC will clear the ARP cache content. This is helpful when a network technician wants to ensure the cache is populated with updated information.",
    "topic": "Topic 9.2.6",
    "image": null,
    "exhibit": null,
    "questionDe": "Ein Netzwerktechniker führt auf einem PC den Befehl arp -d * aus, nachdem der mit dem LAN verbundene Router neu konfiguriert wurde. Was ist das Ergebnis, nachdem dieser Befehl ausgeführt wurde?",
    "mnemonic": "arp -d * = ARP-Cache LÖSCHEN (d=delete)",
    "moduleName": "Address Resolution (ARP, Switching, Ethernet)",
    "optionsDe": [
      "Der ARP-Cache wird geleert.",
      "Der aktuelle Inhalt des ARP-Cache wird angezeigt.",
      "Detaillierte Informationen des ARP-Cache werden angezeigt.",
      "Der ARP-Cache wird mit der Router-Schnittstelle synchronisiert."
    ]
  },
  {
    "id": 25,
    "module": 9,
    "type": "single",
    "question": "Refer to the exhibit. The exhibit shows a small switched network and the contents of the MAC address table of the switch. PC1 has sent a frame addressed to PC3. What will the switch do with the frame?",
    "options": [
      "The switch will discard the frame.",
      "The switch will forward the frame only to port 2.",
      "The switch will forward the frame to all ports except port 4.",
      "The switch will forward the frame to all ports.",
      "The switch will forward the frame only to ports 1 and 3."
    ],
    "correct": [
      2
    ],
    "explanation": "The MAC address of PC3 is not present in the MAC table of the switch. Because the switch does not know where to send the frame that is addressed to PC3, it will forward the frame to all the switch ports, except for port 4, which is the incoming port.",
    "topic": "Topic 9.2.8",
    "image": "assets/images/q25-switch.png",
    "exhibit": null,
    "questionDe": "Beziehen Sie sich auf die Abbildung. Die Abbildung zeigt ein kleines geswitchtes Netzwerk und den Inhalt der MAC-Adresstabelle des Switches. PC1 hat einen an PC3 adressierten Frame gesendet. Was wird der Switch mit dem Frame tun?",
    "mnemonic": "MAC unbekannt → Flood alle Ports außer Eingangsport",
    "moduleName": "Address Resolution (ARP, Switching, Ethernet)",
    "optionsDe": [
      "Der Switch verwirft den Frame.",
      "Der Switch leitet den Frame nur an Port 2 weiter.",
      "Der Switch leitet den Frame an alle Ports außer Port 4 weiter.",
      "Der Switch leitet den Frame an alle Ports weiter.",
      "Der Switch leitet den Frame nur an Port 1 und 3 weiter."
    ]
  },
  {
    "id": 26,
    "module": 9,
    "type": "multiple",
    "question": "Which two types of IPv6 messages are used in place of ARP for address resolution?",
    "options": [
      "anycast",
      "broadcast",
      "echo reply",
      "echo request",
      "neighbor solicitation",
      "neighbor advertisement"
    ],
    "correct": [
      4,
      5
    ],
    "explanation": "IPv6 does not use ARP. Instead, ICMPv6 neighbor discovery is used by sending neighbor solicitation and neighbor advertisement messages.",
    "topic": "Topic 9.3.2",
    "image": null,
    "exhibit": null,
    "questionDe": "Welche zwei Typen von IPv6-Nachrichten werden anstelle von ARP für die Adressauflösung verwendet?",
    "mnemonic": "IPv6: Neighbor Solicitation + Advertisement (kein ARP!)",
    "moduleName": "Address Resolution (ARP, Switching, Ethernet)",
    "optionsDe": [
      "Anycast",
      "Broadcast",
      "Echo Reply",
      "Echo Request",
      "Neighbor Solicitation",
      "Neighbor Advertisement"
    ]
  },
  {
    "id": 27,
    "module": 9,
    "type": "single",
    "question": "What is the aim of an ARP spoofing attack?",
    "options": [
      "to flood the network with ARP reply broadcasts",
      "to fill switch MAC address tables with bogus addresses",
      "to associate IP addresses to the wrong MAC address",
      "to overwhelm network hosts with ARP requests"
    ],
    "correct": [
      2
    ],
    "explanation": "In an ARP spoofing attack, a malicious host intercepts ARP requests and replies to them so that network hosts will map an IP address to the MAC address of the malicious host.",
    "topic": "Topic 9.2.8",
    "image": null,
    "exhibit": null,
    "questionDe": "Was ist das Ziel eines ARP-Spoofing-Angriffs?",
    "mnemonic": "ARP Spoofing = falsche IP-MAC-Zuordnung",
    "moduleName": "Address Resolution (ARP, Switching, Ethernet)",
    "optionsDe": [
      "Das Netzwerk mit ARP-Antwort-Broadcasts fluten",
      "Switch-MAC-Tabellen mit falschen Adressen füllen",
      "IP-Adressen falschen MAC-Adressen zuordnen",
      "Netzwerk-Hosts mit ARP-Anfragen überlasten"
    ]
  },
  {
    "id": 28,
    "module": 9,
    "type": "single",
    "question": "Refer to the exhibit. PC1 attempts to connect to File_server1 and sends an ARP request to obtain a destination MAC address. Which MAC address will PC1 receive in the ARP reply?",
    "options": [
      "the MAC address of S1",
      "the MAC address of the G0/0 interface on R1",
      "the MAC address of the G0/0 interface on R2",
      "the MAC address of S2",
      "the MAC address of File_server1"
    ],
    "correct": [
      1
    ],
    "explanation": "PC1 must have a MAC address to use as a destination Layer 2 address. PC1 will send an ARP request as a broadcast and R1 will send back an ARP reply with its G0/0 interface MAC address. PC1 can then forward the packet to the MAC address of the default gateway, R1.",
    "topic": "Topic 9.2.5",
    "image": "assets/images/q28-arp.jpg",
    "exhibit": null,
    "questionDe": "Beziehen Sie sich auf die Abbildung. PC1 versucht, eine Verbindung zu File_server1 herzustellen, und sendet eine ARP-Anfrage, um eine Ziel-MAC-Adresse zu erhalten. Welche MAC-Adresse wird PC1 in der ARP-Antwort erhalten?",
    "mnemonic": "Remote-Ziel → ARP-Antwort vom GATEWAY (R1), nicht Zielserver",
    "moduleName": "Address Resolution (ARP, Switching, Ethernet)",
    "optionsDe": [
      "die MAC-Adresse von S1",
      "die MAC-Adresse der G0/0-Schnittstelle auf R1",
      "die MAC-Adresse der G0/0-Schnittstelle auf R2",
      "die MAC-Adresse von S2",
      "die MAC-Adresse von File_server1"
    ]
  },
  {
    "id": 29,
    "module": 9,
    "type": "single",
    "question": "Where are IPv4 address to Layer 2 Ethernet address mappings maintained on a host computer?",
    "options": [
      "neighbor table",
      "ARP cache",
      "routing table",
      "MAC address table"
    ],
    "correct": [
      1
    ],
    "explanation": "The ARP cache is used to store IPv4 addresses and the Ethernet physical addresses or MAC addresses to which the IPv4 addresses are mapped. Incorrect mappings of IP addresses to MAC addresses can result in loss of end-to-end connectivity.",
    "topic": "Topic 9.2.2",
    "image": null,
    "exhibit": null,
    "questionDe": "Wo werden Zuordnungen von IPv4-Adressen zu Layer-2-Ethernet-Adressen auf einem Host-Computer gepflegt?",
    "mnemonic": "ARP-Cache = IP↔MAC Zuordnung auf dem Host",
    "moduleName": "Address Resolution (ARP, Switching, Ethernet)",
    "optionsDe": [
      "Neighbor-Tabelle",
      "ARP-Cache",
      "Routing-Tabelle",
      "MAC-Adresstabelle"
    ]
  },
  {
    "id": 30,
    "module": 9,
    "type": "single",
    "question": "What important information is examined in the Ethernet frame header by a Layer 2 device in order to forward the data onward?",
    "options": [
      "source MAC address",
      "source IP address",
      "destination MAC address",
      "Ethernet type",
      "destination IP address"
    ],
    "correct": [
      2
    ],
    "explanation": "The Layer 2 device, such as a switch, uses the destination MAC address to determine which path (interface or port) should be used to send the data onward to the destination device.",
    "topic": "Topic 9.1.1",
    "image": null,
    "exhibit": null,
    "questionDe": "Welche wichtige Information im Ethernet-Frame-Header wird von einem Layer-2-Gerät untersucht, um die Daten weiterzuleiten?",
    "mnemonic": "L2 = Destination MAC Adresse!",
    "moduleName": "Address Resolution (ARP, Switching, Ethernet)",
    "optionsDe": [
      "Quell-MAC-Adresse",
      "Quell-IP-Adresse",
      "Ziel-MAC-Adresse",
      "Ethernet-Typ",
      "Ziel-IP-Adresse"
    ]
  },
  {
    "id": 31,
    "module": 10,
    "type": "ordering",
    "question": "Match the commands to the correct actions. (Not all options are used.)",
    "options": [
      "displays a message after accessing the router → Router(config)# banner motd #",
      "provides security on the console → Router(config-line)# password class",
      "configures a name on the router → Router(config)# hostname CL1"
    ],
    "correct": [
      0,
      1,
      2
    ],
    "explanation": "",
    "topic": "Topic 10.1.1",
    "image": "assets/images/q31-commands.jpg",
    "exhibit": null,
    "questionDe": "Ordnen Sie die Befehle den richtigen Aktionen zu. (Nicht alle Optionen werden verwendet.)",
    "mnemonic": "banner motd=Banner, password=Console, hostname=Name",
    "moduleName": "Cisco IOS (Router-Konfiguration, Boot, Sicherheit)",
    "optionsDe": [
      "eine Nachricht nach dem Zugriff auf den Router anzeigen → Router(config)# banner motd #",
      "Sicherheit auf der Konsole bereitstellen → Router(config-line)# password class",
      "einen Namen auf dem Router konfigurieren → Router(config)# hostname CL1"
    ]
  },
  {
    "id": 32,
    "module": 10,
    "type": "single",
    "question": "A new network administrator has been asked to enter a banner message on a Cisco device. What is the fastest way a network administrator could test whether the banner is properly configured?",
    "options": [
      "Reboot the device.",
      "Enter CTRL-Z at the privileged mode prompt.",
      "Exit global configuration mode.",
      "Power cycle the device.",
      "Exit privileged EXEC mode and press Enter."
    ],
    "correct": [
      4
    ],
    "explanation": "While at the privileged mode prompt such as Router#, type **exit,press Enter,** and the banner message appears. Power cycling a network device that has had the **banner motd** command issued will also display the banner message, but this is not a quick way to test the configuration.",
    "topic": "Topic 10.1.1",
    "image": null,
    "exhibit": null,
    "questionDe": "Ein neuer Netzwerkadministrator wurde gebeten, auf einem Cisco-Gerät eine Banner-Nachricht einzugeben. Wie kann ein Netzwerkadministrator am schnellsten testen, ob das Banner korrekt konfiguriert ist?",
    "mnemonic": "Banner testen: exit + Enter (schnellster Weg)",
    "moduleName": "Cisco IOS (Router-Konfiguration, Boot, Sicherheit)",
    "optionsDe": [
      "Das Gerät neu starten.",
      "STRG-Z im Privileged-Modus eingeben.",
      "Den globalen Konfigurationsmodus verlassen.",
      "Das Gerät stromlos schalten.",
      "Privileged-EXEC-Modus verlassen und Enter drücken."
    ]
  },
  {
    "id": 33,
    "module": 10,
    "type": "ordering",
    "question": "A network administrator requires access to manage routers and switches locally and remotely. Match the description to the access method. (Not all options are used.)",
    "options": [
      "remote access method that uses encryption → SSH",
      "preferred out-of-band access method → console",
      "remote access via a dialup connection → AUX",
      "unsecure remote access → Telnet"
    ],
    "correct": [
      0,
      1,
      2,
      3
    ],
    "explanation": "Both the console and AUX ports can be used to directly connect to a Cisco network device for management purposes. However, it is more common to use the console port. The AUX port is more often used for remote access via a dial up connection. SSH and Telnet are both remote access methods that depend on an active network connection. SSH uses a stronger password authentication than Telnet uses and also uses encryption on transmitted data.",
    "topic": "Topic 10.1.1",
    "image": "assets/images/q33-access.jpg",
    "exhibit": null,
    "questionDe": "Ein Netzwerkadministrator benötigt Zugriff, um Router und Switches lokal und remote zu verwalten. Ordnen Sie die Beschreibung der Zugriffsmethode zu. (Nicht alle Optionen werden verwendet.)",
    "mnemonic": "SSH=sicher+remote, Console=out-of-band, AUX=Dialup, Telnet=unsicher",
    "moduleName": "Cisco IOS (Router-Konfiguration, Boot, Sicherheit)",
    "optionsDe": [
      "Remote-Zugriffsmethode, die Verschlüsselung verwendet → SSH",
      "bevorzugte Out-of-Band-Zugriffsmethode → Konsole",
      "Remote-Zugriff über eine Einwahlverbindung → AUX",
      "unsicherer Remote-Zugriff → Telnet"
    ]
  },
  {
    "id": 34,
    "module": 10,
    "type": "ordering",
    "question": "Match the phases to the functions during the boot up process of a Cisco router. (Not all options are used.)",
    "options": [
      "phase 1 → perform the POST and load the bootstrap program",
      "phase 2 → locate and load the Cisco IOS software",
      "phase 3 → locate and load the startup configuration file"
    ],
    "correct": [
      0,
      1,
      2
    ],
    "explanation": "There are three major phases to the bootup process of a Cisco router:\n\n1. Perform the POST and load the bootstrap program.\n2. Locate and load the Cisco IOS software.\n3. Locate and load the startup configuration file\n\nIf a startup configuration file cannot be located, the router will enter setup mode by displaying the setup mode prompt.",
    "topic": "Topic 10.1.1",
    "image": "assets/images/q34-boot.jpg",
    "exhibit": null,
    "questionDe": "Ordnen Sie die Phasen den Funktionen während des Bootvorgangs eines Cisco-Routers zu. (Nicht alle Optionen werden verwendet.)",
    "mnemonic": "Boot: POST → IOS laden → Startup-Config laden",
    "moduleName": "Cisco IOS (Router-Konfiguration, Boot, Sicherheit)",
    "optionsDe": [
      "Phase 1 → POST ausführen und Bootstrap-Programm laden",
      "Phase 2 → Cisco-IOS-Software finden und laden",
      "Phase 3 → Startup-Konfigurationsdatei finden und laden"
    ]
  },
  {
    "id": 35,
    "module": 10,
    "type": "ordering",
    "question": "Match the command with the device mode at which the command is entered. (Not all options are used.)",
    "options": [
      "service password-encryption → R1(config)#",
      "enable → R1>",
      "copy running-config startup-config → R1#",
      "login → R1(config-line)#",
      "ip address 192.168.4.4 255.255.255.0 → R1(config-if)#"
    ],
    "correct": [
      0,
      1,
      2,
      3,
      4
    ],
    "explanation": "The **enable** command is entered in R1> mode. The **login** command is entered in R1(config-line)# mode. The **copy running-config startup-config** command is entered in R1# mode. The **ip address 192.168.4.4 255.255.255.0** command is entered in R1(config-if)# mode. The **service password-encryption** command is entered in global configuration mode.",
    "topic": "Topic 10.1.1",
    "image": "assets/images/q35-modes.jpg",
    "exhibit": null,
    "questionDe": "Ordnen Sie den Befehl dem Gerätemodus zu, in dem der Befehl eingegeben wird. (Nicht alle Optionen werden verwendet.)",
    "mnemonic": "enable=R1>, copy=R1#, login=config-line, ip=config-if",
    "moduleName": "Cisco IOS (Router-Konfiguration, Boot, Sicherheit)",
    "optionsDe": [
      "service password-encryption → R1(config)#",
      "enable → R1>",
      "copy running-config startup-config → R1#",
      "login → R1(config-line)#",
      "ip address 192.168.4.4 255.255.255.0 → R1(config-if)#"
    ]
  },
  {
    "id": 36,
    "module": 10,
    "type": "multiple",
    "question": "What are two functions of NVRAM? (Choose two.)",
    "options": [
      "to store the routing table",
      "to retain contents when power is removed",
      "to store the startup configuration file",
      "to contain the running configuration file",
      "to store the ARP table"
    ],
    "correct": [
      1,
      2
    ],
    "explanation": "NVRAM is permanent memory storage, so the startup configuration file is preserved even if the router loses power.",
    "topic": "Topic 10.1.1",
    "image": null,
    "exhibit": null,
    "questionDe": "Welche zwei Funktionen hat NVRAM? (Wählen Sie zwei.)",
    "mnemonic": "NVRAM = Non-Volatile → Startup-Config bleibt",
    "moduleName": "Cisco IOS (Router-Konfiguration, Boot, Sicherheit)",
    "optionsDe": [
      "Routing-Tabelle speichern",
      "Inhalt bei Stromausfall behalten",
      "Startup-Konfigurationsdatei speichern",
      "Running-Konfigurationsdatei enthalten",
      "ARP-Tabelle speichern"
    ]
  },
  {
    "id": 37,
    "module": 10,
    "type": "single",
    "question": "A router boots and enters setup mode. What is the reason for this?",
    "options": [
      "The IOS image is corrupt.",
      "Cisco IOS is missing from flash memory.",
      "The configuration file is missing from NVRAM.",
      "The POST process has detected hardware failure."
    ],
    "correct": [
      2
    ],
    "explanation": "If a router cannot locate the startup-config file in NVRAM, it will enter setup mode to allow the configuration to be entered from the console device.",
    "topic": "Topic 10.1.1",
    "image": null,
    "exhibit": null,
    "questionDe": "Ein Router startet und wechselt in den Setup-Modus. Was ist der Grund dafür?",
    "mnemonic": "Setup-Modus = keine Config in NVRAM",
    "moduleName": "Cisco IOS (Router-Konfiguration, Boot, Sicherheit)",
    "optionsDe": [
      "Das IOS-Image ist beschädigt.",
      "Cisco IOS fehlt im Flash-Speicher.",
      "Die Konfigurationsdatei fehlt im NVRAM.",
      "Der POST-Prozess hat einen Hardwarefehler erkannt."
    ]
  },
  {
    "id": 38,
    "module": 10,
    "type": "single",
    "question": "The global configuration command ip default-gateway 172.16.100.1 is applied to a switch. What is the effect of this command?",
    "options": [
      "The switch will have a management interface with the address 172.16.100.1.",
      "The switch can be remotely managed from a host on another network.",
      "The switch can communicate with other hosts on the 172.16.100.0 network.",
      "The switch is limited to sending and receiving frames to and from the gateway 172.16.100.1."
    ],
    "correct": [
      1
    ],
    "explanation": "A default gateway address is typically configured on all devices to allow them to communicate beyond just their local network.In a switch this is achieved using the command ip default-gateway <ip address>.",
    "topic": "Topic 10.3.2",
    "image": null,
    "exhibit": null,
    "questionDe": "Der globale Konfigurationsbefehl ip default-gateway 172.16.100.1 wird auf einen Switch angewendet. Welche Auswirkung hat dieser Befehl?",
    "mnemonic": "Switch ip default-gateway = Remote-Management möglich",
    "moduleName": "Cisco IOS (Router-Konfiguration, Boot, Sicherheit)",
    "optionsDe": [
      "Der Switch erhält eine Management-Schnittstelle mit der Adresse 172.16.100.1.",
      "Der Switch kann von einem Host in einem anderen Netzwerk remote verwaltet werden.",
      "Der Switch kann mit anderen Hosts im Netz 172.16.100.0 kommunizieren.",
      "Der Switch darf Frames nur an das Gateway 172.16.100.1 senden und empfangen."
    ]
  },
  {
    "id": 39,
    "module": 10,
    "type": "single",
    "question": "What happens when the transport input ssh command is entered on the switch vty lines?",
    "options": [
      "The SSH client on the switch is enabled.",
      "Communication between the switch and remote users is encrypted.",
      "The switch requires a username/password combination for remote access.",
      "The switch requires remote connections via a proprietary client software."
    ],
    "correct": [
      1
    ],
    "explanation": "The **transport input ssh** command when entered on the switch vty (virtual terminal lines) will encrypt all inbound controlled telnet connections.",
    "topic": "Topic 10.1.1",
    "image": null,
    "exhibit": null,
    "questionDe": "Was passiert, wenn der Befehl transport input ssh auf den vty-Leitungen des Switches eingegeben wird?",
    "mnemonic": "transport input ssh = nur verschlüsselte Verbindungen",
    "moduleName": "Cisco IOS (Router-Konfiguration, Boot, Sicherheit)",
    "optionsDe": [
      "Der SSH-Client auf dem Switch wird aktiviert.",
      "Die Kommunikation zwischen Switch und Remote-Benutzern wird verschlüsselt.",
      "Der Switch verlangt Benutzername/Passwort für Remote-Zugriff.",
      "Der Switch verlangt Remote-Verbindungen über proprietäre Client-Software."
    ]
  },
  {
    "id": 40,
    "module": 10,
    "type": "single",
    "question": "Refer to the exhibit. A user PC has successfully transmitted packets to www.cisco.com. Which IP address does the user PC target in order to forward its data off the local network?",
    "options": [
      "172.24.255.17",
      "172.24.1.22",
      "172.20.0.254",
      "172.24.255.4",
      "172.20.1.18"
    ],
    "correct": [
      2
    ],
    "explanation": "",
    "topic": "Topic 10.3.1",
    "image": "assets/images/q40-network.png",
    "exhibit": null,
    "questionDe": "Beziehen Sie sich auf die Abbildung. Ein Benutzer-PC hat erfolgreich Pakete zu www.cisco.com übertragen. Welche IP-Adresse verwendet der Benutzer-PC als Ziel, um seine Daten aus dem lokalen Netzwerk weiterzuleiten?",
    "mnemonic": "Default Gateway IP = Router-Interface im lokalen Netz",
    "moduleName": "Cisco IOS (Router-Konfiguration, Boot, Sicherheit)",
    "optionsDe": [
      "172.24.255.17",
      "172.24.1.22",
      "172.20.0.254",
      "172.24.255.4",
      "172.20.1.18"
    ]
  },
  {
    "id": 41,
    "module": 10,
    "type": "ordering",
    "question": "Match the configuration mode with the command that is available in that mode. (Not all options are used.)",
    "options": [
      "R1> → enable",
      "R1# → copy running-config startup-config",
      "R1(config-line)# → login",
      "R1(config)# → interface fastethernet 0/0"
    ],
    "correct": [
      0,
      1,
      2,
      3
    ],
    "explanation": "The **enable** command is entered at the R1> prompt. The **login** command is entered at the R1(config-line)# prompt. The **copy running-config startup-config** command is entered at the R1# prompt. The **interface fastethernet 0/0** command is entered at the R1(config)# prompt.",
    "topic": "Topic 10.2.1",
    "image": "assets/images/q41-config.jpg",
    "exhibit": null,
    "questionDe": "Ordnen Sie den Konfigurationsmodus dem Befehl zu, der in diesem Modus verfügbar ist. (Nicht alle Optionen werden verwendet.)",
    "mnemonic": "enable→R1>, copy→R1#, login→config-line, interface→config",
    "moduleName": "Cisco IOS (Router-Konfiguration, Boot, Sicherheit)",
    "optionsDe": [
      "R1> → enable",
      "R1# → copy running-config startup-config",
      "R1(config-line)# → login",
      "R1(config)# → interface fastethernet 0/0"
    ]
  },
  {
    "id": 42,
    "module": 10,
    "type": "multiple3",
    "question": "Which three commands are used to set up secure access to a router through a connection to the console interface? (Choose three.)",
    "options": [
      "interface fastethernet 0/0",
      "line vty 0 4",
      "line console 0",
      "enable secret cisco",
      "login",
      "password cisco"
    ],
    "correct": [
      2,
      4,
      5
    ],
    "explanation": "The three commands needed to password protect the console port are as follows:\n\n* **line console 0**\n* **password cisco**\n* **login**\n\nThe **interface fastethernet 0/0** command is commonly used to access the configuration mode used to apply specific parameters such as the IP address to the Fa0/0 port. The **line vty 0 4** command is used to access the configuration mode for Telnet. The0and 4 parameters specify ports 0 through 4, or a maximum of five simultaneous Telnet connections. The **enable secret** command is used to apply a password used on the router to access the privileged mode.",
    "topic": "Topic 10.1.1",
    "image": null,
    "exhibit": null,
    "questionDe": "Welche drei Befehle werden verwendet, um einen sicheren Zugriff auf einen Router über eine Verbindung zur Konsolenschnittstelle einzurichten? (Wählen Sie drei.)",
    "mnemonic": "Console sichern: line console 0 + password + login",
    "moduleName": "Cisco IOS (Router-Konfiguration, Boot, Sicherheit)",
    "optionsDe": [
      "interface fastethernet 0/0",
      "line vty 0 4",
      "line console 0",
      "enable secret cisco",
      "login",
      "password cisco"
    ]
  },
  {
    "id": 43,
    "module": 10,
    "type": "single",
    "question": "Refer to the exhibit. Consider the IP address configuration shown from PC1. What is a description of the default gateway address?",
    "options": [
      "It is the IP address of the Router1 interface that connects the company to the Internet.",
      "It is the IP address of the Router1 interface that connects the PC1 LAN to Router1.",
      "It is the IP address of Switch1 that connects PC1 to other devices on the same LAN.",
      "It is the IP address of the ISP network device located in the cloud."
    ],
    "correct": [
      1
    ],
    "explanation": "The default gateway is used to route packets destined for remote networks. The default gateway IP address is the address of the first Layer 3 device (the router interface) that connects to the same network.",
    "topic": "Topic 10.3.1",
    "image": "assets/images/q43-pc1.png",
    "exhibit": null,
    "questionDe": "Beziehen Sie sich auf die Abbildung. Betrachten Sie die gezeigte IP-Adresskonfiguration von PC1. Was beschreibt die Standard-Gateway-Adresse?",
    "mnemonic": "Default Gateway = Router-Interface im SELBEN LAN",
    "moduleName": "Cisco IOS (Router-Konfiguration, Boot, Sicherheit)",
    "optionsDe": [
      "Es ist die IP-Adresse der Router1-Schnittstelle, die das Unternehmen mit dem Internet verbindet.",
      "Es ist die IP-Adresse der Router1-Schnittstelle, die das PC1-LAN mit Router1 verbindet.",
      "Es ist die IP-Adresse von Switch1, der PC1 mit anderen Geräten im LAN verbindet.",
      "Es ist die IP-Adresse des ISP-Netzwerkgeräts in der Cloud."
    ]
  },
  {
    "id": 44,
    "module": 10,
    "type": "multiple",
    "question": "Which two functions are primary functions of a router? (Choose two.)",
    "options": [
      "packet forwarding",
      "microsegmentation",
      "domain name resolution",
      "path selection",
      "flow control"
    ],
    "correct": [
      0,
      3
    ],
    "explanation": "A router accepts a packet and accesses its routing table to determine the appropriate exit interface based on the destination address. The router then forwards the packet out of that interface.",
    "topic": "Topic 8.1.1",
    "image": null,
    "exhibit": null,
    "questionDe": "Welche zwei Funktionen sind primäre Funktionen eines Routers? (Wählen Sie zwei.)",
    "mnemonic": "Router = Paketweiterleitung + Pfadauswahl",
    "moduleName": "Cisco IOS (Router-Konfiguration, Boot, Sicherheit)",
    "optionsDe": [
      "Paketweiterleitung",
      "Mikrosegmentierung",
      "Domänennamenauflösung",
      "Pfadauswahl",
      "Flusskontrolle"
    ]
  },
  {
    "id": 45,
    "module": 10,
    "type": "single",
    "question": "What is the effect of using the Router# copy running-config startup-config command on a router?",
    "options": [
      "The contents of ROM will change.",
      "The contents of RAM will change.",
      "The contents of NVRAM will change.",
      "The contents of flash will change."
    ],
    "correct": [
      2
    ],
    "explanation": "The command **copy running-config startup-config** copies the running-configuration file from RAM into NVRAM and saves it as the startup-configuration file. Since NVRAM is none-volatile memory it will be able to retain the configuration details when the router is powered off.",
    "topic": "Topic 10.1.1",
    "image": null,
    "exhibit": null,
    "questionDe": "Welche Auswirkung hat die Verwendung des Befehls Router# copy running-config startup-config auf einem Router?",
    "mnemonic": "copy run start = RAM → NVRAM speichern",
    "moduleName": "Cisco IOS (Router-Konfiguration, Boot, Sicherheit)",
    "optionsDe": [
      "Der Inhalt des ROM ändert sich.",
      "Der Inhalt des RAM ändert sich.",
      "Der Inhalt des NVRAM ändert sich.",
      "Der Inhalt des Flash ändert sich."
    ]
  },
  {
    "id": 46,
    "module": 10,
    "type": "single",
    "question": "What will happen if the default gateway address is incorrectly configured on a host?",
    "options": [
      "The host cannot communicate with other hosts in the local network.",
      "The switch will not forward packets initiated by the host.",
      "The host will have to use ARP to determine the correct address of the default gateway.",
      "The host cannot communicate with hosts in other networks.",
      "A ping from the host to 127.0.0.1 would not be successful."
    ],
    "correct": [
      3
    ],
    "explanation": "When a host needs to send a message to another host located on the same network, it can forward the message directly. However, when a host needs to send a message to a remote network, it must use the router, also known as the default gateway. This is because the data link frame address of the remote destination host cannot be used directly. Instead, the IP packet has to be sent to the router (default gateway) and the router will forward the packet toward its destination. Therefore, if the default gateway is incorrectly configured, the host can communicate with other hosts on the same network, but not with hosts on remote networks.",
    "topic": "Topic 10.3.1",
    "image": null,
    "exhibit": null,
    "questionDe": "Was passiert, wenn die Standard-Gateway-Adresse auf einem Host falsch konfiguriert ist?",
    "mnemonic": "Falsches Gateway = nur Remote-Netze betroffen",
    "moduleName": "Cisco IOS (Router-Konfiguration, Boot, Sicherheit)",
    "optionsDe": [
      "Der Host kann nicht mit anderen Hosts im lokalen Netzwerk kommunizieren.",
      "Der Switch leitet vom Host initiierte Pakete nicht weiter.",
      "Der Host muss ARP nutzen, um die korrekte Standard-Gateway-Adresse zu ermitteln.",
      "Der Host kann nicht mit Hosts in anderen Netzwerken kommunizieren.",
      "Ein Ping vom Host zu 127.0.0.1 wäre nicht erfolgreich."
    ]
  },
  {
    "id": 47,
    "module": 10,
    "type": "multiple",
    "question": "What are two potential network problems that can result from ARP operation? (Choose two.)",
    "options": [
      "Manually configuring static ARP associations could facilitate ARP poisoning or MAC address spoofing.",
      "On large networks with low bandwidth, multiple ARP broadcasts could cause data communication delays.",
      "Network attackers could manipulate MAC address and IP address mappings in ARP messages with the intent of intercepting network traffic.",
      "Large numbers of ARP request broadcasts could cause the host MAC address table to overflow and prevent the host from communicating on the network.",
      "Multiple ARP replies result in the switch MAC address table containing entries that match the MAC addresses of hosts that are connected to the relevant switch port."
    ],
    "correct": [
      1,
      2
    ],
    "explanation": "Large numbers of ARP broadcast messages could cause momentary data communications delays. Network attackers could manipulate MAC address and IP address mappings in ARP messages with the intent to intercept network traffic. ARP requests and replies cause entries to be made into the ARP table, not the MAC address table. ARP table overflows are very unlikely. Manually configuring static ARP associations is a way to prevent, not facilitate, ARP poisoning and MAC address spoofing. Multiple ARP replies resulting in the switch MAC address table containing entries that match the MAC addresses of connected nodes and are associated with the relevant switch port are required for normal switch frame forwarding operations. It is not an ARP caused network problem.",
    "topic": "Topic 9.2.8",
    "image": null,
    "exhibit": null,
    "questionDe": "Welche zwei potenziellen Netzwerkprobleme können sich aus dem ARP-Betrieb ergeben? (Wählen Sie zwei.)",
    "mnemonic": "ARP-Probleme: Broadcast-Delays + Spoofing/Angriffe",
    "moduleName": "Cisco IOS (Router-Konfiguration, Boot, Sicherheit)",
    "optionsDe": [
      "Manuelle statische ARP-Einträge könnten ARP-Poisoning oder MAC-Spoofing erleichtern.",
      "Auf großen Netzen mit geringer Bandbreite können viele ARP-Broadcasts Verzögerungen verursachen.",
      "Angreifer könnten IP-MAC-Zuordnungen in ARP-Nachrichten manipulieren, um Verkehr abzufangen.",
      "Viele ARP-Anfragen könnten die Host-MAC-Tabelle überlaufen und Kommunikation verhindern.",
      "Mehrere ARP-Antworten führen dazu, dass die Switch-MAC-Tabelle passende Einträge enthält."
    ]
  },
  {
    "id": 48,
    "module": 10,
    "type": "single",
    "question": "Open the PT activity. Perform the tasks in the activity instructions and then answer the question. Which interfaces in each router are active and operational?",
    "options": [
      "R1: G0/0 and S0/0/0 / R2: G0/0 and S0/0/0",
      "R1: G0/1 and S0/0/1 / R2: G0/0 and S0/0/1",
      "R1: G0/0 and S0/0/0 / R2: G0/1 and S0/0/0",
      "R1: G0/0 and S0/0/1 / R2: G0/1 and S0/0/1"
    ],
    "correct": [
      2
    ],
    "explanation": "The command to use for this activity is **show ip interface brief** in each router. The active and operational interfaces are represented by the value “up” in the “Status” and “Protocol” columns. The interfaces in R1 with these characteristics are G0/0 and S0/0/0. In R2 they are G0/1 and S0/0/0.",
    "topic": "Topic 10.2.4",
    "image": "assets/images/q48-pt.jpg",
    "exhibit": null,
    "questionDe": "Öffnen Sie die PT-Aktivität. Führen Sie die Aufgaben in den Aktivitätsanweisungen aus und beantworten Sie anschließend die Frage. Welche Schnittstellen in jedem Router sind aktiv und betriebsbereit?",
    "mnemonic": "show ip interface brief → Status+Protocol = up",
    "moduleName": "Cisco IOS (Router-Konfiguration, Boot, Sicherheit)",
    "optionsDe": [
      "R1: G0/0 und S0/0/0 / R2: G0/0 und S0/0/0",
      "R1: G0/1 und S0/0/1 / R2: G0/0 und S0/0/1",
      "R1: G0/0 und S0/0/0 / R2: G0/1 und S0/0/0",
      "R1: G0/0 und S0/0/1 / R2: G0/1 und S0/0/1"
    ]
  },
  {
    "id": 49,
    "module": 10,
    "type": "single",
    "question": "Which term describes a field in the IPv4 packet header used to identify the next level protocol?",
    "options": [
      "protocol",
      "destination IPv4 address",
      "source IPv4 address",
      "TTL"
    ],
    "correct": [
      0
    ],
    "explanation": "The **protocol** field in the IPv4 packet header is an 8-bit field used to identify the specific upper-layer protocol (Transport layer or next level) carried inside the packet’s payload. Once the destination host receives the Layer 3 packet and completes its processing, it inspects this field to determine which particular protocol handler or service should receive the de-encapsulated data. Common predefined decimal values used in this field include **6** for **TCP**, **17** for **UDP**, and **1** for **ICMP**, which enables seamless multiplexing between the Network and Transport layers.",
    "topic": "Topic 8.2.2",
    "image": null,
    "exhibit": null,
    "questionDe": "Welcher Begriff beschreibt ein Feld im IPv4-Paketheader, das verwendet wird, um das Protokoll der nächsten Ebene zu identifizieren?",
    "mnemonic": "Protocol-Feld = Upper Layer (TCP/UDP/ICMP)",
    "moduleName": "Cisco IOS (Router-Konfiguration, Boot, Sicherheit)",
    "optionsDe": [
      "Protokoll",
      "Ziel-IPv4-Adresse",
      "Quell-IPv4-Adresse",
      "TTL"
    ]
  },
  {
    "id": 50,
    "module": 10,
    "type": "single",
    "question": "Which term describes a field in the IPv4 packet header that contains an 8-bit binary value used to determine the priority of each packet?",
    "options": [
      "differentiated services",
      "destination IPv4 address",
      "source IPv4 address",
      "protocol"
    ],
    "correct": [
      0
    ],
    "explanation": "",
    "topic": "Topic 8.2.2",
    "image": null,
    "exhibit": null,
    "questionDe": "Welcher Begriff beschreibt ein Feld im IPv4-Paketheader, das einen 8-Bit-Binärwert enthält, der verwendet wird, um die Priorität jedes Pakets zu bestimmen?",
    "mnemonic": "Differentiated Services = Priorität (8 Bit)",
    "moduleName": "Cisco IOS (Router-Konfiguration, Boot, Sicherheit)",
    "optionsDe": [
      "Differentiated Services",
      "Ziel-IPv4-Adresse",
      "Quell-IPv4-Adresse",
      "Protokoll"
    ]
  },
  {
    "id": 51,
    "module": 10,
    "type": "single",
    "question": "Which term describes a field in the IPv4 packet header that contains a 32-bit binary value associated with an interface on the sending device?",
    "options": [
      "source IPv4 address",
      "destination IPv4 address",
      "protocol",
      "TTL"
    ],
    "correct": [
      0
    ],
    "explanation": "The **source IPv4 address** is a 32-bit field within the IPv4 packet header that identifies the logical address of the interface on the sending device. When a host transmits data across a network, it inserts its own IP address into this field. This allows the destination device to identify the origin of the packet, ensuring it knows exactly where to send any subsequent return traffic, acknowledgments, or error messages.",
    "topic": "Topic 8.2.2",
    "image": null,
    "exhibit": null,
    "questionDe": "Welcher Begriff beschreibt ein Feld im IPv4-Paketheader, das einen 32-Bit-Binärwert enthält, der einer Schnittstelle auf dem sendenden Gerät zugeordnet ist?",
    "mnemonic": "Source IP = 32 Bit, Absender-Interface",
    "moduleName": "Cisco IOS (Router-Konfiguration, Boot, Sicherheit)",
    "optionsDe": [
      "Quell-IPv4-Adresse",
      "Ziel-IPv4-Adresse",
      "Protokoll",
      "TTL"
    ]
  },
  {
    "id": 52,
    "module": 10,
    "type": "single",
    "question": "Which term describes a field in the IPv4 packet header used to detect corruption in the IPv4 header?",
    "options": [
      "header checksum",
      "source IPv4 address",
      "protocol",
      "TTL"
    ],
    "correct": [
      0
    ],
    "explanation": "The **header checksum** field is a 16-bit field in the IPv4 header used to verify the integrity of the header data. During transmission, the sending device calculates a checksum value based on the fields within the IP header. When the packet arrives at its destination, the receiving device performs the same calculation. If the calculated value does not match the received value, the packet is considered corrupted and is discarded immediately by the receiving node.\n\n**53.** \n\nCopy\n\nRTR1(config)# interface gi0/1\nRTR1(config-if)# description Connects to the Marketing LAN\nRTR1(config-if)# ip address 10.27.15.17 255.255.255.0\nRTR1(config-if)# no shutdown\nRTR1(config-if)# interface gi0/0\nRTR1(config-if)# description Connects to the Payroll LAN\nRTR1(config-if)# ip address 10.27.14.148 255.255.255.0\nRTR1(config-if)# no shutdown\nRTR1(config-if)# interface s0/0/0\nRTR1(config-if)# description Connects to the ISP\nRTR1(config-if)# ip address 10.14.15.254 255.255.255.0\nRTR1(config-if)# no shutdown\nRTR1(config-if)# interface s0/0/1\nRTR1(config-if)# description Connects to the Head Office WAN\nRTR1(config-if)# ip address 203.0.113.39 255.255.255.0\nRTR1(config-if)# no shutdown\nRTR1(config-if)# end\n\n**Refer to the exhibit. A network administrator is connecting a new host to the Payroll LAN. The host needs to communicate with remote networks. What IP address would be configured as the default gateway on the new host?**\n\n* **10.27.14.148**\n* 10.27.14.1\n* 10.14.15.254\n* 203.0.113.39\n* 10.27.15.17\n\n**Explanation:** Topic 10.3.1\n\nA host’s default gateway must always correspond to the IP address of the local router interface that is directly attached to its specific network segment. By examining the configuration output in the exhibit, it is evident that interface **gi0/0** is configured with the description description Connects to the Payroll LAN. The unique IP address assigned to this interface is **10.27.14.148**. Consequently, any new host deployed on the “Payroll LAN” must use this exac",
    "topic": "Topic 8.2.2",
    "image": null,
    "exhibit": "RTR1(config)# interface gi0/1\nRTR1(config-if)# description Connects to the Marketing LAN\nRTR1(config-if)# ip address 10.27.15.17 255.255.255.0\nRTR1(config-if)# no shutdown\nRTR1(config-if)# interface gi0/0\nRTR1(config-if)# description Connects to the Payroll LAN\nRTR1(config-if)# ip address 10.27.14.148 255.255.255.0\nRTR1(config-if)# no shutdown\nRTR1(config-if)# interface s0/0/0\nRTR1(config-if)# description Connects to the ISP\nRTR1(config-if)# ip address 10.14.15.254 255.255.255.0\nRTR1(config-if)# no shutdown\nRTR1(config-if)# interface s0/0/1\nRTR1(config-if)# description Connects to the Head Office WAN\nRTR1(config-if)# ip address 203.0.113.39 255.255.255.0\nRTR1(config-if)# no shutdown\nRTR1(config-if)# end",
    "questionDe": "Welcher Begriff beschreibt ein Feld im IPv4-Paketheader, das verwendet wird, um Beschädigungen im IPv4-Header zu erkennen?",
    "mnemonic": "Header Checksum = Header-Integrität prüfen",
    "moduleName": "Cisco IOS (Router-Konfiguration, Boot, Sicherheit)",
    "optionsDe": [
      "Header-Prüfsumme",
      "Quell-IPv4-Adresse",
      "Protokoll",
      "TTL"
    ]
  },
  {
    "id": 53,
    "module": 10,
    "type": "single",
    "question": "Refer to the exhibit. A network administrator is connecting a new host to the Payroll LAN. The host needs to communicate with remote networks. What IP address would be configured as the default gateway on the new host?",
    "options": [
      "10.27.14.148",
      "10.27.14.1",
      "10.14.15.254",
      "203.0.113.39",
      "10.27.15.17"
    ],
    "correct": [
      0
    ],
    "explanation": "A host’s default gateway must always correspond to the IP address of the local router interface that is directly attached to its specific network segment. By examining the configuration output in the exhibit, it is evident that interface **gi0/0** is configured with the description description Connects to the Payroll LAN. The unique IP address assigned to this interface is **10.27.14.148**. Consequently, any new host deployed on the “Payroll LAN” must use this exact IP address as its default gateway to successfully communicate with destinations on remote networks.",
    "topic": "Topic 10.3.1",
    "image": null,
    "exhibit": "RTR1(config)# interface gi0/1\nRTR1(config-if)# description Connects to the Marketing LAN\nRTR1(config-if)# ip address 10.27.15.17 255.255.255.0\nRTR1(config-if)# no shutdown\nRTR1(config-if)# interface gi0/0\nRTR1(config-if)# description Connects to the Payroll LAN\nRTR1(config-if)# ip address 10.27.14.148 255.255.255.0\nRTR1(config-if)# no shutdown\nRTR1(config-if)# interface s0/0/0\nRTR1(config-if)# description Connects to the ISP\nRTR1(config-if)# ip address 10.14.15.254 255.255.255.0\nRTR1(config-if)# no shutdown\nRTR1(config-if)# interface s0/0/1\nRTR1(config-if)# description Connects to the Head Office WAN\nRTR1(config-if)# ip address 203.0.113.39 255.255.255.0\nRTR1(config-if)# no shutdown\nRTR1(config-if)# end",
    "questionDe": "Beziehen Sie sich auf die Abbildung. Ein Netzwerkadministrator verbindet einen neuen Host mit dem Payroll LAN. Der Host muss mit entfernten Netzwerken kommunizieren. Welche IP-Adresse würde auf dem neuen Host als Standard-Gateway konfiguriert?",
    "mnemonic": "Gateway = Router-IP im GLEICHEN LAN (description lesen!)",
    "moduleName": "Cisco IOS (Router-Konfiguration, Boot, Sicherheit)",
    "optionsDe": [
      "10.27.14.148",
      "10.27.14.1",
      "10.14.15.254",
      "203.0.113.39",
      "10.27.15.17"
    ]
  },
  {
    "id": 54,
    "module": 10,
    "type": "single",
    "question": "Which term describes a field in the IPv4 packet header that contains a unicast, multicast, or broadcast address?",
    "options": [
      "destination IPv4 address",
      "protocol",
      "TTL",
      "header checksum"
    ],
    "correct": [
      0
    ],
    "explanation": "The **destination IPv4 address** is a 32-bit field in the IP header that specifies the logical address of the end device to which the packet is being sent. This field can hold a **unicast** address (for a specific single host), a **multicast** address (for a specific group of hosts), or a **broadcast** address (for all hosts on the local network segment). Routers inspect this address to perform route lookups in their routing tables, ensuring the packet is forwarded out of the appropriate interface toward the intended destination.",
    "topic": "Topic 8.2.2",
    "image": null,
    "exhibit": null,
    "questionDe": "Welcher Begriff beschreibt ein Feld im IPv4-Paketheader, das eine Unicast-, Multicast- oder Broadcast-Adresse enthält?",
    "mnemonic": "Destination IP = Ziel (Unicast/Multicast/Broadcast)",
    "moduleName": "Cisco IOS (Router-Konfiguration, Boot, Sicherheit)",
    "optionsDe": [
      "Ziel-IPv4-Adresse",
      "Protokoll",
      "TTL",
      "Header-Prüfsumme"
    ]
  },
  {
    "id": 55,
    "module": 10,
    "type": "single",
    "question": "Which term describes a field in the IPv4 packet header used to limit the lifetime of a packet?",
    "options": [
      "TTL",
      "source IPv4 address",
      "protocol",
      "header checksum"
    ],
    "correct": [
      0
    ],
    "explanation": "The **TTL** (_Time-to-Live_) field is an 8-bit value in the IPv4 header used to prevent a packet from circulating endlessly in a network (for instance, due to a routing loop). The originating host sets an initial value; every time a router processes the packet, it decrements this value by one. If the **TTL** reaches zero before reaching its destination, the router discards the packet and sends an ICMP “Time Exceeded” message back to the source.",
    "topic": "Topic 8.2.2",
    "image": null,
    "exhibit": null,
    "questionDe": "Welcher Begriff beschreibt ein Feld im IPv4-Paketheader, das verwendet wird, um die Lebensdauer eines Pakets zu begrenzen?",
    "mnemonic": "TTL = Lebensdauer begrenzen",
    "moduleName": "Cisco IOS (Router-Konfiguration, Boot, Sicherheit)",
    "optionsDe": [
      "TTL",
      "Quell-IPv4-Adresse",
      "Protokoll",
      "Header-Prüfsumme"
    ]
  },
  {
    "id": 56,
    "module": 10,
    "type": "single",
    "question": "Which term describes a field in the IPv4 packet header that contains a 4-bit binary value set to 0100?",
    "options": [
      "version",
      "source IPv4 address",
      "protocol",
      "TTL"
    ],
    "correct": [
      0
    ],
    "explanation": "The **version** field in the IPv4 packet header is a 4-bit field that identifies which internet protocol version is being used to format the Layer 3 data. The binary value **0100** directly translates to the decimal number **4**, which explicitly instructs routers and receiving network devices to process the incoming packet according to IPv4 structural standards and specifications. Conversely, a binary value of 0110 (decimal 6) in this exact field would signify an IPv6 packet architecture.",
    "topic": "Topic 8.2.2",
    "image": null,
    "exhibit": null,
    "questionDe": "Welcher Begriff beschreibt ein Feld im IPv4-Paketheader, das einen 4-Bit-Binärwert enthält, der auf 0100 gesetzt ist?",
    "mnemonic": "Version 0100 = IPv4 (4 in Binär)",
    "moduleName": "Cisco IOS (Router-Konfiguration, Boot, Sicherheit)",
    "optionsDe": [
      "Version",
      "Quell-IPv4-Adresse",
      "Protokoll",
      "TTL"
    ]
  },
  {
    "id": 57,
    "module": 10,
    "type": "single",
    "question": "Which term describes a field in the IPv4 packet header used to identify the next level protocol?",
    "options": [
      "protocol",
      "version",
      "differentiated services",
      "header checksum"
    ],
    "correct": [
      0
    ],
    "explanation": "The **protocol** field in the IPv4 packet header is an 8-bit field used to identify the specific upper-layer protocol (Transport layer or next level) carried inside the packet’s payload. Once the destination host receives the Layer 3 packet and completes its processing, it inspects this field to determine which particular protocol handler or service should receive the de-encapsulated data. Common predefined decimal values used in this field include **6** for **TCP**, **17** for **UDP**, and **1** for **ICMP**, which enables seamless multiplexing between the Network and Transport layers.",
    "topic": "Topic 8.2.2",
    "image": null,
    "exhibit": null,
    "questionDe": "Welcher Begriff beschreibt ein Feld im IPv4-Paketheader, das verwendet wird, um das Protokoll der nächsten Ebene zu identifizieren?",
    "mnemonic": "Protocol = nächstes Protokoll (wie Frage 49)",
    "moduleName": "Cisco IOS (Router-Konfiguration, Boot, Sicherheit)",
    "optionsDe": [
      "Protokoll",
      "Version",
      "Differentiated Services",
      "Header-Prüfsumme"
    ]
  },
  {
    "id": 58,
    "module": 10,
    "type": "single",
    "question": "Which term describes a field in the IPv4 packet header that contains a 4-bit binary value set to 0100?",
    "options": [
      "version",
      "differentiated services",
      "header checksum",
      "TTL"
    ],
    "correct": [
      0
    ],
    "explanation": "The **version** field in the IPv4 packet header is a 4-bit field that identifies which internet protocol version is being used to format the Layer 3 data. The binary value **0100** directly translates to the decimal number **4**, which explicitly instructs routers and receiving network devices to process the incoming packet according to IPv4 structural standards and specifications. Conversely, a binary value of 0110 (decimal 6) in this exact field would signify an IPv6 packet architecture.",
    "topic": "Topic 8.2.2",
    "image": null,
    "exhibit": null,
    "questionDe": "Welcher Begriff beschreibt ein Feld im IPv4-Paketheader, das einen 4-Bit-Binärwert enthält, der auf 0100 gesetzt ist?",
    "mnemonic": "Version 0100 = IPv4",
    "moduleName": "Cisco IOS (Router-Konfiguration, Boot, Sicherheit)",
    "optionsDe": [
      "Version",
      "Differentiated Services",
      "Header-Prüfsumme",
      "TTL"
    ]
  },
  {
    "id": 59,
    "module": 10,
    "type": "single",
    "question": "What property of ARP causes cached IP-to-MAC mappings to remain in memory longer?",
    "options": [
      "Entries in an ARP table are time-stamped and are purged after the timeout expires.",
      "A static IP-to-MAC address entry can be entered manually into an ARP table.",
      "The type field 0x806 appears in the header of the Ethernet frame.",
      "The port-to-MAC address table on a switch has the same entries as the ARP table on the switch."
    ],
    "correct": [
      0
    ],
    "explanation": "",
    "topic": "Topic 9.2.4",
    "image": null,
    "exhibit": null,
    "questionDe": "Welche Eigenschaft von ARP bewirkt, dass zwischengespeicherte IP-zu-MAC-Zuordnungen länger im Speicher bleiben?",
    "mnemonic": "Dynamische Einträge = Timeout/Aging",
    "moduleName": "Cisco IOS (Router-Konfiguration, Boot, Sicherheit)",
    "optionsDe": [
      "Einträge in der ARP-Tabelle sind zeitgestempelt und werden nach Timeout gelöscht.",
      "Ein statischer IP-zu-MAC-Eintrag kann manuell in die ARP-Tabelle eingegeben werden.",
      "Das Typ-Feld 0x806 erscheint im Ethernet-Frame-Header.",
      "Die Port-zu-MAC-Tabelle eines Switches hat dieselben Einträge wie die ARP-Tabelle."
    ]
  },
  {
    "id": 60,
    "module": 10,
    "type": "single",
    "question": "What property of ARP allows MAC addresses of frequently used servers to be fixed in the ARP table?",
    "options": [
      "A static IP-to-MAC address entry can be entered manually into an ARP table.",
      "Entries in an ARP table are time-stamped and are purged after the timeout expires.",
      "The type field 0x806 appears in the header of the Ethernet frame.",
      "The port-to-MAC address table on a switch has the same entries as the ARP table on the switch."
    ],
    "correct": [
      0
    ],
    "explanation": "",
    "topic": "Topic 9.2.4",
    "image": null,
    "exhibit": null,
    "questionDe": "Welche Eigenschaft von ARP ermöglicht es, MAC-Adressen häufig verwendeter Server in der ARP-Tabelle fest zu hinterlegen?",
    "mnemonic": "Statischer Eintrag = manuell, kein Timeout",
    "moduleName": "Cisco IOS (Router-Konfiguration, Boot, Sicherheit)",
    "optionsDe": [
      "Ein statischer IP-zu-MAC-Eintrag kann manuell in die ARP-Tabelle eingegeben werden.",
      "Einträge in der ARP-Tabelle sind zeitgestempelt und werden nach Timeout gelöscht.",
      "Das Typ-Feld 0x806 erscheint im Ethernet-Frame-Header.",
      "Die Port-zu-MAC-Tabelle eines Switches hat dieselben Einträge wie die ARP-Tabelle."
    ]
  },
  {
    "id": 61,
    "module": 10,
    "type": "single",
    "question": "What property of ARP allows MAC addresses of frequently used servers to be fixed in the ARP table?",
    "options": [
      "A static IP-to-MAC address entry can be entered manually into an ARP table.",
      "The destination MAC address FF-FF-FF-FF-FF-FF appears in the header of the Ethernet frame.",
      "The source MAC address appears in the header of the Ethernet frame.",
      "The port-to-MAC address table on a switch has the same entries as the ARP table on the switch."
    ],
    "correct": [
      0
    ],
    "explanation": "By default, ARP table entries are dynamic and include an aging timer, which purges them automatically to ensure that the mapping information remains current. However, for critical devices like frequently used servers, a network administrator can configure a **static entry**. Because these are manually defined, they are not subject to aging timers and remain “fixed” in the device’s memory until they are explicitly deleted or the device is rebooted, which ensures immediate and reliable address resolution without the overhead of ARP requests.",
    "topic": "Topic 9.2.4",
    "image": null,
    "exhibit": null,
    "questionDe": "Welche Eigenschaft von ARP ermöglicht es, MAC-Adressen häufig verwendeter Server in der ARP-Tabelle fest zu hinterlegen?",
    "mnemonic": "Statischer Eintrag = fixiert für Server",
    "moduleName": "Cisco IOS (Router-Konfiguration, Boot, Sicherheit)",
    "optionsDe": [
      "Ein statischer IP-zu-MAC-Eintrag kann manuell in die ARP-Tabelle eingegeben werden.",
      "Die Ziel-MAC-Adresse FF-FF-FF-FF-FF-FF erscheint im Ethernet-Frame-Header.",
      "Die Quell-MAC-Adresse erscheint im Ethernet-Frame-Header.",
      "Die Port-zu-MAC-Tabelle eines Switches hat dieselben Einträge wie die ARP-Tabelle."
    ]
  },
  {
    "id": 62,
    "module": 10,
    "type": "single",
    "question": "What property of ARP allows hosts on a LAN to send traffic to remote networks?",
    "options": [
      "Local hosts learn the MAC address of the default gateway.",
      "The destination MAC address FF-FF-FF-FF-FF-FF appears in the header of the Ethernet frame.",
      "The source MAC address appears in the header of the Ethernet frame.",
      "The port-to-MAC address table on a switch has the same entries as the ARP table on the switch."
    ],
    "correct": [
      0
    ],
    "explanation": "When a local host wants to send data to a device on a remote network, the Layer 3 IP packet contains the ultimate destination IP address. However, to deliver the frame over the local network medium at Layer 2, the host must encapsulate and address the frame to its **default gateway** (the local router). Since the host initially only knows the default gateway’s IPv4 address, it relies on **ARP** to dynamically discover its corresponding hardware MAC address. Once this MAC address is learned, the local host can successfully forward the traffic to the router for further internetwork routing.\n\n**63.** \n\nCopy\n\nFloor(config)# interface gi0/1\nFloor(config-if)# description Connects to the Registrar LAN\nFloor(config-if)# ip address 192.168.235.234 255.255.255.0\nFloor(config-if)# no shutdown\nFloor(config-if)# interface gi0/0\nFloor(config-if)# description Connects to the Manager LAN\nFloor(config-if)# ip address 192.168.234.114 255.255.255.0\nFloor(config-if)# no shutdown\nFloor(config-if)# interface s0/0/0\nFloor(config-if)# description Connects to the ISP\nFloor(config-if)# ip address 10.234.235.254 255.255.255.0\nFloor(config-if)# no shutdown\nFloor(config-if)# interface s0/0/1\nFloor(config-if)# description Connects to the Head Office WAN\nFloor(config-if)# ip address 203.0.113.3 255.255.255.0\nFloor(config-if)# no shutdown\nFloor(config-if)# end\n\n**Refer to the exhibit. A network administrator is connecting a new host to the Registrar LAN. The host needs to communicate with remote networks. What IP address would be configured as the default gateway on the new host?**\n\n* **192.168.235.234**\n* 192.168.235.1\n* 10.234.235.254\n* 203.0.113.3\n* 192.168.234.114\n\n**Explanation:** Topic 10.3.1\n\nA host’s default gateway must correspond to the IP address of the local router interface that is directly attached to its specific network segment. Based on the configuration snippet provided, the **gi0/1** interface is configured with the description descripction Se conecta al Registrador LAN and has ",
    "topic": "Topic 9.2.4",
    "image": null,
    "exhibit": "Floor(config)# interface gi0/1\nFloor(config-if)# description Connects to the Registrar LAN\nFloor(config-if)# ip address 192.168.235.234 255.255.255.0\nFloor(config-if)# no shutdown\nFloor(config-if)# interface gi0/0\nFloor(config-if)# description Connects to the Manager LAN\nFloor(config-if)# ip address 192.168.234.114 255.255.255.0\nFloor(config-if)# no shutdown\nFloor(config-if)# interface s0/0/0\nFloor(config-if)# description Connects to the ISP\nFloor(config-if)# ip address 10.234.235.254 255.255.255.0\nFloor(config-if)# no shutdown\nFloor(config-if)# interface s0/0/1\nFloor(config-if)# description Connects to the Head Office WAN\nFloor(config-if)# ip address 203.0.113.3 255.255.255.0\nFloor(config-if)# no shutdown\nFloor(config-if)# end",
    "questionDe": "Welche Eigenschaft von ARP ermöglicht es Hosts in einem LAN, Verkehr zu entfernten Netzwerken zu senden?",
    "mnemonic": "Remote senden = Gateway-MAC per ARP lernen",
    "moduleName": "Cisco IOS (Router-Konfiguration, Boot, Sicherheit)",
    "optionsDe": [
      "Lokale Hosts lernen die MAC-Adresse des Standard-Gateways.",
      "Die Ziel-MAC-Adresse FF-FF-FF-FF-FF-FF erscheint im Ethernet-Frame-Header.",
      "Die Quell-MAC-Adresse erscheint im Ethernet-Frame-Header.",
      "Die Port-zu-MAC-Tabelle eines Switches hat dieselben Einträge wie die ARP-Tabelle."
    ]
  },
  {
    "id": 63,
    "module": 10,
    "type": "single",
    "question": "Refer to the exhibit. A network administrator is connecting a new host to the Registrar LAN. The host needs to communicate with remote networks. What IP address would be configured as the default gateway on the new host?",
    "options": [
      "192.168.235.234",
      "192.168.235.1",
      "10.234.235.254",
      "203.0.113.3",
      "192.168.234.114"
    ],
    "correct": [
      0
    ],
    "explanation": "A host’s default gateway must correspond to the IP address of the local router interface that is directly attached to its specific network segment. Based on the configuration snippet provided, the **gi0/1** interface is configured with the description descripction Se conecta al Registrador LAN and has been assigned the IP address **192.168.235.234**. Consequently, any host connected to the “Registrar LAN” must use this specific IP address as its default gateway to successfully route traffic to remote networks.",
    "topic": "Topic 10.3.1",
    "image": null,
    "exhibit": "Floor(config)# interface gi0/1\nFloor(config-if)# description Connects to the Registrar LAN\nFloor(config-if)# ip address 192.168.235.234 255.255.255.0\nFloor(config-if)# no shutdown\nFloor(config-if)# interface gi0/0\nFloor(config-if)# description Connects to the Manager LAN\nFloor(config-if)# ip address 192.168.234.114 255.255.255.0\nFloor(config-if)# no shutdown\nFloor(config-if)# interface s0/0/0\nFloor(config-if)# description Connects to the ISP\nFloor(config-if)# ip address 10.234.235.254 255.255.255.0\nFloor(config-if)# no shutdown\nFloor(config-if)# interface s0/0/1\nFloor(config-if)# description Connects to the Head Office WAN\nFloor(config-if)# ip address 203.0.113.3 255.255.255.0\nFloor(config-if)# no shutdown\nFloor(config-if)# end",
    "questionDe": "Beziehen Sie sich auf die Abbildung. Ein Netzwerkadministrator verbindet einen neuen Host mit dem Registrar LAN. Der Host muss mit entfernten Netzwerken kommunizieren. Welche IP-Adresse würde auf dem neuen Host als Standard-Gateway konfiguriert?",
    "mnemonic": "Registrar LAN → gi0/1 IP (description lesen!)",
    "moduleName": "Cisco IOS (Router-Konfiguration, Boot, Sicherheit)",
    "optionsDe": [
      "192.168.235.234",
      "192.168.235.1",
      "10.234.235.254",
      "203.0.113.3",
      "192.168.234.114"
    ]
  },
  {
    "id": 64,
    "module": 10,
    "type": "single",
    "question": "What property of ARP forces all Ethernet NICs to process an ARP request?",
    "options": [
      "The destination MAC address FF-FF-FF-FF-FF-FF appears in the header of the Ethernet frame.",
      "The source MAC address appears in the header of the Ethernet frame.",
      "The type field 0x806 appears in the header of the Ethernet frame.",
      "ARP replies are broadcast on the network when a host receives an ARP request."
    ],
    "correct": [
      0
    ],
    "explanation": "The **ARP** protocol relies on Layer 2 broadcast frames to discover the MAC address of a target device when only its IP address is known. To ensure that an ARP request reaches every device within a local network segment, the frame must use the broadcast address **FF:FF:FF:FF:FF:FF** as the destination MAC address. By standard hardware design, every Ethernet network interface card (NIC) is mandated to accept and pass the data portion of any frame addressed to this specific broadcast address up to the ARP process for examination.",
    "topic": "Topic 9.2.3",
    "image": null,
    "exhibit": null,
    "questionDe": "Welche Eigenschaft von ARP zwingt alle Ethernet-NICs, eine ARP-Anfrage zu verarbeiten?",
    "mnemonic": "FF:FF:FF:FF:FF:FF = Broadcast, alle NICs verarbeiten",
    "moduleName": "Cisco IOS (Router-Konfiguration, Boot, Sicherheit)",
    "optionsDe": [
      "Die Ziel-MAC-Adresse FF-FF-FF-FF-FF-FF erscheint im Ethernet-Frame-Header.",
      "Die Quell-MAC-Adresse erscheint im Ethernet-Frame-Header.",
      "Das Typ-Feld 0x806 erscheint im Ethernet-Frame-Header.",
      "ARP-Antworten werden als Broadcast gesendet, wenn ein Host eine ARP-Anfrage erhält."
    ]
  },
  {
    "id": 65,
    "module": 10,
    "type": "single",
    "question": "What property of ARP causes a reply only to the source sending an ARP request?",
    "options": [
      "The source MAC address appears in the header of the Ethernet frame.",
      "The destination MAC address FF-FF-FF-FF-FF-FF appears in the header of the Ethernet frame.",
      "The type field 0x806 appears in the header of the Ethernet frame.",
      "ARP replies are broadcast on the network when a host receives an ARP request."
    ],
    "correct": [
      0
    ],
    "explanation": "When a host sends an ARP request, it is broadcast to all devices on the local network. To ensure the destination host knows where to send the reply, the Ethernet frame header containing the ARP request includes the **source MAC address** of the requesting host. Upon receiving and processing the request, the target host uses this specific source MAC address to send an **ARP reply** directly (unicast) to the original requester, rather than broadcasting the reply to the entire network.",
    "topic": "Topic 9.2.3",
    "image": null,
    "exhibit": null,
    "questionDe": "Welche Eigenschaft von ARP bewirkt, dass eine Antwort nur an die Quelle gesendet wird, die eine ARP-Anfrage gesendet hat?",
    "mnemonic": "Source MAC in Request → Unicast-Reply zurück",
    "moduleName": "Cisco IOS (Router-Konfiguration, Boot, Sicherheit)",
    "optionsDe": [
      "Die Quell-MAC-Adresse erscheint im Ethernet-Frame-Header.",
      "Die Ziel-MAC-Adresse FF-FF-FF-FF-FF-FF erscheint im Ethernet-Frame-Header.",
      "Das Typ-Feld 0x806 erscheint im Ethernet-Frame-Header.",
      "ARP-Antworten werden als Broadcast gesendet, wenn ein Host eine ARP-Anfrage erhält."
    ]
  },
  {
    "id": 66,
    "module": 10,
    "type": "single",
    "question": "What property of ARP causes the request to be flooded out all ports of a switch except for the port receiving the ARP request?",
    "options": [
      "The destination MAC address FF-FF-FF-FF-FF-FF appears in the header of the Ethernet frame.",
      "The type field 0x806 appears in the header of the Ethernet frame.",
      "Entries in an ARP table are time-stamped and are purged after the timeout expires.",
      "ARP replies are broadcast on the network when a host receives an ARP request."
    ],
    "correct": [
      0
    ],
    "explanation": "When a host needs to discover the MAC address of another device, it sends an ARP request. Since it does not know the physical address of the destination, it sends it as a Layer 2 **broadcast** frame. The destination MAC address used for this purpose is **FF-FF-FF-FF-FF-FF**. By design, switches flood any frame addressed to this broadcast address out of all active ports, except the port where the frame was received, ensuring that every device on the local network segment receives the ARP request.",
    "topic": "Topic 9.2.3",
    "image": null,
    "exhibit": null,
    "questionDe": "Welche Eigenschaft von ARP bewirkt, dass die Anfrage über alle Ports eines Switches geflutet wird, außer über den Port, der die ARP-Anfrage empfängt?",
    "mnemonic": "Broadcast MAC → Switch floodet alle Ports",
    "moduleName": "Cisco IOS (Router-Konfiguration, Boot, Sicherheit)",
    "optionsDe": [
      "Die Ziel-MAC-Adresse FF-FF-FF-FF-FF-FF erscheint im Ethernet-Frame-Header.",
      "Das Typ-Feld 0x806 erscheint im Ethernet-Frame-Header.",
      "Einträge in der ARP-Tabelle sind zeitgestempelt und werden nach Timeout gelöscht.",
      "ARP-Antworten werden als Broadcast gesendet, wenn ein Host eine ARP-Anfrage erhält."
    ]
  },
  {
    "id": 67,
    "module": 10,
    "type": "single",
    "question": "What property of ARP causes the NICs receiving an ARP request to pass the data portion of the Ethernet frame to the ARP process?",
    "options": [
      "The type field 0x806 appears in the header of the Ethernet frame.",
      "The destination MAC address FF-FF-FF-FF-FF-FF appears in the header of the Ethernet frame.",
      "Entries in an ARP table are time-stamped and are purged after the timeout expires.",
      "ARP replies are broadcast on the network when a host receives an ARP request."
    ],
    "correct": [
      0
    ],
    "explanation": "The Ethernet II frame header contains a 2-byte field known as the **Type** field _(or EtherType)_. This field is responsible for specifying which upper-layer protocol or local subsystem should receive the payload enclosed within the frame. Every network protocol has a distinct hexadecimal identifier; for the Address Resolution Protocol (**ARP**), this specific code is **0x0806**. When a receiving network interface card (NIC) decapsulates an incoming frame and reads 0x0806 in the Type field, it instantly recognizes that the contents belong to an ARP message. As a result, the NIC bypasses the standard network stacks like IPv4 (0x0800) or IPv6 (0x86DD) and hands the data portion directly to the operating system’s internal ARP process.",
    "topic": "Topic 9.2.3",
    "image": null,
    "exhibit": null,
    "questionDe": "Welche Eigenschaft von ARP bewirkt, dass NICs, die eine ARP-Anfrage empfangen, den Datenteil des Ethernet-Frames an den ARP-Prozess weitergeben?",
    "mnemonic": "EtherType 0x0806 = ARP an OS weitergeben",
    "moduleName": "Cisco IOS (Router-Konfiguration, Boot, Sicherheit)",
    "optionsDe": [
      "Das Typ-Feld 0x806 erscheint im Ethernet-Frame-Header.",
      "Die Ziel-MAC-Adresse FF-FF-FF-FF-FF-FF erscheint im Ethernet-Frame-Header.",
      "Einträge in der ARP-Tabelle sind zeitgestempelt und werden nach Timeout gelöscht.",
      "ARP-Antworten werden als Broadcast gesendet, wenn ein Host eine ARP-Anfrage erhält."
    ]
  },
  {
    "id": 68,
    "module": 10,
    "type": "single",
    "question": "What property of ARP causes the NICs receiving an ARP request to pass the data portion of the Ethernet frame to the ARP process?",
    "options": [
      "The type field 0x806 appears in the header of the Ethernet frame.",
      "The destination MAC address FF-FF-FF-FF-FF-FF appears in the header of the Ethernet frame.",
      "Entries in an ARP table are time-stamped and are purged after the timeout expires.",
      "The port-to-MAC address table on a switch has the same entries as the ARP table on the switch."
    ],
    "correct": [
      0
    ],
    "explanation": "The Ethernet II frame header contains a 2-byte field known as the **Type** field _(or EtherType)_. This field is responsible for specifying which upper-layer protocol or local subsystem should receive the payload enclosed within the frame. Every network protocol has a distinct hexadecimal identifier; for the Address Resolution Protocol (**ARP**), this specific code is **0x0806**. When a receiving network interface card (NIC) decapsulates an incoming frame and reads 0x0806 in the Type field, it instantly recognizes that the contents belong to an ARP message. As a result, the NIC bypasses the standard network stacks like IPv4 (0x0800) or IPv6 (0x86DD) and hands the data portion directly to the operating system’s internal ARP process.\n\n**69.** \n\nCopy\n\nMain(config)# interface gi0/1\nMain(config-if)# description Connects to the Service LAN\nMain(config-if)# ip address 172.29.157.156 255.255.255.0\nMain(config-if)# no shutdown\nMain(config-if)# interface gi0/0\nMain(config-if)# description Connects to the Engineering LAN\nMain(config-if)# ip address 172.29.156.36 255.255.255.0\nMain(config-if)# no shutdown\nMain(config-if)# interface s0/0/0\nMain(config-if)# description Connects to the ISP\nMain(config-if)# ip address 10.156.157.254 255.255.255.0\nMain(config-if)# no shutdown\nMain(config-if)# interface s0/0/1\nMain(config-if)# description Connects to the Head Office WAN\nMain(config-if)# ip address 198.51.100.177 255.255.255.0\nMain(config-if)# no shutdown\nMain(config-if)# end\n\n**Refer to the exhibit. A network administrator is connecting a new host to the Service LAN. The host needs to communicate with remote networks. What IP address would be configured as the default gateway on the new host?**\n\n* **172.29.157.156**\n* 172.29.157.1\n* 10.156.157.254\n* 198.51.100.177\n* 172.29.156.36\n\n**Explanation:** Topic 10.3.1  \n\n**70.** \n\nCopy\n\nBldgA(config)# interface gi0/1\nBldgA(config-if)# description Connects to the Medical LAN\nBldgA(config-if)# ip address 192.168.191.189 255.255.255.0\nBldgA(con",
    "topic": "Topic 9.2.3",
    "image": null,
    "exhibit": "Main(config)# interface gi0/1\nMain(config-if)# description Connects to the Service LAN\nMain(config-if)# ip address 172.29.157.156 255.255.255.0\nMain(config-if)# no shutdown\nMain(config-if)# interface gi0/0\nMain(config-if)# description Connects to the Engineering LAN\nMain(config-if)# ip address 172.29.156.36 255.255.255.0\nMain(config-if)# no shutdown\nMain(config-if)# interface s0/0/0\nMain(config-if)# description Connects to the ISP\nMain(config-if)# ip address 10.156.157.254 255.255.255.0\nMain(config-if)# no shutdown\nMain(config-if)# interface s0/0/1\nMain(config-if)# description Connects to the Head Office WAN\nMain(config-if)# ip address 198.51.100.177 255.255.255.0\nMain(config-if)# no shutdown\nMain(config-if)# end",
    "questionDe": "Welche Eigenschaft von ARP bewirkt, dass NICs, die eine ARP-Anfrage empfangen, den Datenteil des Ethernet-Frames an den ARP-Prozess weitergeben?",
    "mnemonic": "EtherType 0x0806 = ARP-Prozess",
    "moduleName": "Cisco IOS (Router-Konfiguration, Boot, Sicherheit)",
    "optionsDe": [
      "Das Typ-Feld 0x806 erscheint im Ethernet-Frame-Header.",
      "Die Ziel-MAC-Adresse FF-FF-FF-FF-FF-FF erscheint im Ethernet-Frame-Header.",
      "Einträge in der ARP-Tabelle sind zeitgestempelt und werden nach Timeout gelöscht.",
      "Die Port-zu-MAC-Tabelle eines Switches hat dieselben Einträge wie die ARP-Tabelle."
    ]
  },
  {
    "id": 69,
    "module": 10,
    "type": "single",
    "question": "Refer to the exhibit. A network administrator is connecting a new host to the Service LAN. The host needs to communicate with remote networks. What IP address would be configured as the default gateway on the new host?",
    "options": [
      "172.29.157.156",
      "172.29.157.1",
      "10.156.157.254",
      "198.51.100.177",
      "172.29.156.36"
    ],
    "correct": [
      0
    ],
    "explanation": "",
    "topic": "Topic 10.3.1",
    "image": null,
    "exhibit": "Main(config)# interface gi0/1\nMain(config-if)# description Connects to the Service LAN\nMain(config-if)# ip address 172.29.157.156 255.255.255.0\nMain(config-if)# no shutdown\nMain(config-if)# interface gi0/0\nMain(config-if)# description Connects to the Engineering LAN\nMain(config-if)# ip address 172.29.156.36 255.255.255.0\nMain(config-if)# no shutdown\nMain(config-if)# interface s0/0/0\nMain(config-if)# description Connects to the ISP\nMain(config-if)# ip address 10.156.157.254 255.255.255.0\nMain(config-if)# no shutdown\nMain(config-if)# interface s0/0/1\nMain(config-if)# description Connects to the Head Office WAN\nMain(config-if)# ip address 198.51.100.177 255.255.255.0\nMain(config-if)# no shutdown\nMain(config-if)# end",
    "questionDe": "Beziehen Sie sich auf die Abbildung. Ein Netzwerkadministrator verbindet einen neuen Host mit dem Service LAN. Der Host muss mit entfernten Netzwerken kommunizieren. Welche IP-Adresse würde auf dem neuen Host als Standard-Gateway konfiguriert?",
    "mnemonic": "Service LAN → gi0/1 IP-Adresse",
    "moduleName": "Cisco IOS (Router-Konfiguration, Boot, Sicherheit)",
    "optionsDe": [
      "172.29.157.156",
      "172.29.157.1",
      "10.156.157.254",
      "198.51.100.177",
      "172.29.156.36"
    ]
  },
  {
    "id": 70,
    "module": 10,
    "type": "single",
    "question": "Refer to the exhibit. A network administrator is connecting a new host to the Medical LAN. The host needs to communicate with remote networks. What IP address would be configured as the default gateway on the new host?",
    "options": [
      "192.168.191.189",
      "192.168.191.1",
      "10.190.191.254",
      "198.51.100.213",
      "192.168.190.70"
    ],
    "correct": [
      0
    ],
    "explanation": "By examining the configuration of the **BldgA** router, we can see that interface **gi0/1** is configured with the description description Connects to the Medical LAN. The IP address assigned to this interface is **192.168.191.189**. Consequently, any device connected to the Medical LAN must be configured with this IP address as its default gateway, allowing the router to properly route its traffic toward remote networks.",
    "topic": "Topic 10.3.1",
    "image": null,
    "exhibit": "BldgA(config)# interface gi0/1\nBldgA(config-if)# description Connects to the Medical LAN\nBldgA(config-if)# ip address 192.168.191.189 255.255.255.0\nBldgA(config-if)# no shutdown\nBldgA(config-if)# interface gi0/0\nBldgA(config-if)# description Connects to the Client LAN\nBldgA(config-if)# ip address 192.168.190.70 255.255.255.0\nBldgA(config-if)# no shutdown\nBldgA(config-if)# interface s0/0/0\nBldgA(config-if)# description Connects to the ISP\nBldgA(config-if)# ip address 10.190.191.254 255.255.255.0\nBldgA(config-if)# no shutdown\nBldgA(config-if)# interface s0/0/1\nBldgA(config-if)# description Connects to the Head Office WAN\nBldgA(config-if)# ip address 198.51.100.213 255.255.255.0\nBldgA(config-if)# no shutdown\nBldgA(config-if)# end",
    "questionDe": "Beziehen Sie sich auf die Abbildung. Ein Netzwerkadministrator verbindet einen neuen Host mit dem Medical LAN. Der Host muss mit entfernten Netzwerken kommunizieren. Welche IP-Adresse würde auf dem neuen Host als Standard-Gateway konfiguriert?",
    "mnemonic": "Medical LAN → gi0/1 IP-Adresse",
    "moduleName": "Cisco IOS (Router-Konfiguration, Boot, Sicherheit)",
    "optionsDe": [
      "192.168.191.189",
      "192.168.191.1",
      "10.190.191.254",
      "198.51.100.213",
      "192.168.190.70"
    ]
  },
  {
    "id": 71,
    "module": 10,
    "type": "single",
    "question": "Refer to the exhibit. A network administrator is connecting a new host to the Registrar LAN. The host needs to communicate with remote networks. What IP address would be configured as the default gateway on the new host?",
    "options": [
      "192.168.225.223",
      "192.168.225.1",
      "10.224.225.254",
      "203.0.113.246",
      "192.168.224.103"
    ],
    "correct": [
      0
    ],
    "explanation": "A host’s default gateway must always be the IP address of the local router interface that is directly attached to its specific network segment. By examining the configuration output provided, it is evident that interface **gi0/1** is configured with the description description Connects to the Registrar LAN. The IP address assigned to this specific interface is **192.168.225.223**. Consequently, any new host deployed on the “Registrar LAN” must be configured with this exact IP address as its default gateway to successfully route traffic to remote networks.",
    "topic": "Topic 10.3.1",
    "image": null,
    "exhibit": "Floor(config)# interface gi0/1\nFloor(config-if)# description Connects to the Registrar LAN\nFloor(config-if)# ip address 192.168.225.223 255.255.255.0\nFloor(config-if)# no shutdown\nFloor(config-if)# interface gi0/0\nFloor(config-if)# description Connects to the Manager LAN\nFloor(config-if)# ip address 192.168.224.103 255.255.255.0\nFloor(config-if)# no shutdown\nFloor(config-if)# interface s0/0/0\nFloor(config-if)# description Connects to the ISP\nFloor(config-if)# ip address 10.224.225.254 255.255.255.0\nFloor(config-if)# no shutdown\nFloor(config-if)# interface s0/0/1\nFloor(config-if)# description Connects to the Head Office WAN\nFloor(config-if)# ip address 203.0.113.246 255.255.255.0\nFloor(config-if)# no shutdown\nFloor(config-if)# end",
    "questionDe": "Beziehen Sie sich auf die Abbildung. Ein Netzwerkadministrator verbindet einen neuen Host mit dem Registrar LAN. Der Host muss mit entfernten Netzwerken kommunizieren. Welche IP-Adresse würde auf dem neuen Host als Standard-Gateway konfiguriert?",
    "mnemonic": "Registrar LAN → gi0/1 IP-Adresse",
    "moduleName": "Cisco IOS (Router-Konfiguration, Boot, Sicherheit)",
    "optionsDe": [
      "192.168.225.223",
      "192.168.225.1",
      "10.224.225.254",
      "203.0.113.246",
      "192.168.224.103"
    ]
  },
  {
    "id": 72,
    "module": 10,
    "type": "single",
    "question": "Refer to the exhibit. A network administrator is connecting a new host to the Manager LAN. The host needs to communicate with remote networks. What IP address would be configured as the default gateway on the new host?",
    "options": [
      "10.118.62.196",
      "10.118.62.1",
      "10.62.63.254",
      "209.165.200.87",
      "10.118.63.65"
    ],
    "correct": [
      0
    ],
    "explanation": "A host’s default gateway must be the IP address of the local router interface that is directly attached to its specific network segment. Based on the provided configuration for the “Manager LAN” (_interface gi0/0_), the administrator has assigned the IP address **10.118.62.196**. Consequently, any new device connected to this network segment must be configured with this exact IP address as its default gateway to successfully route traffic to remote networks.",
    "topic": "Topic 10.3.1",
    "image": null,
    "exhibit": "Floor(config)# interface gi0/1\nFloor(config-if)# description Connects to the Registrar LAN\nFloor(config-if)# ip address 10.118.63.65 255.255.255.0\nFloor(config-if)# no shutdown\nFloor(config-if)# interface gi0/0\nFloor(config-if)# description Connects to the Manager LAN\nFloor(config-if)# ip address 10.118.62.196 255.255.255.0\nFloor(config-if)# no shutdown\nFloor(config-if)# interface s0/0/0\nFloor(config-if)# description Connects to the ISP\nFloor(config-if)# ip address 10.62.63.254 255.255.255.0\nFloor(config-if)# no shutdown\nFloor(config-if)# interface s0/0/1\nFloor(config-if)# description Connects to the Head Office WAN\nFloor(config-if)# ip address 209.165.200.87 255.255.255.0\nFloor(config-if)# no shutdown\nFloor(config-if)# end",
    "questionDe": "Beziehen Sie sich auf die Abbildung. Ein Netzwerkadministrator verbindet einen neuen Host mit dem Manager LAN. Der Host muss mit entfernten Netzwerken kommunizieren. Welche IP-Adresse würde auf dem neuen Host als Standard-Gateway konfiguriert?",
    "mnemonic": "Manager LAN → gi0/0 IP-Adresse",
    "moduleName": "Cisco IOS (Router-Konfiguration, Boot, Sicherheit)",
    "optionsDe": [
      "10.118.62.196",
      "10.118.62.1",
      "10.62.63.254",
      "209.165.200.87",
      "10.118.63.65"
    ]
  },
  {
    "id": 73,
    "module": 10,
    "type": "single",
    "question": "Refer to the exhibit. A network administrator is connecting a new host to the Store LAN. The host needs to communicate with remote networks. What IP address would be configured as the default gateway on the new host?",
    "options": [
      "172.19.98.230",
      "172.19.98.1",
      "10.98.99.254",
      "209.165.200.120",
      "172.19.99.99"
    ],
    "correct": [
      0
    ],
    "explanation": "A host’s default gateway must be the IP address of the local router interface that is attached to its specific network segment. By examining the configuration output provided in the exhibit, we can see that the administrator configured interface **gi0/0** with a description explicitly stating it connects to the Store LAN (description Connects to the Store LAN). The IP address assigned to this particular interface is **172.19.98.230**. Therefore, any new host connecting to the “Store LAN” must use this exact IP address as its default gateway in order to successfully route traffic to remote or external networks.",
    "topic": "Topic 10.3.1",
    "image": null,
    "exhibit": "HQ(config)# interface gi0/1\nHQ(config-if)# description Connects to the Branch LAN\nHQ(config-if)# ip address 172.19.99.99 255.255.255.0\nHQ(config-if)# no shutdown\nHQ(config-if)# interface gi0/0\nHQ(config-if)# description Connects to the Store LAN\nHQ(config-if)# ip address 172.19.98.230 255.255.255.0\nHQ(config-if)# no shutdown\nHQ(config-if)# interface s0/0/0\nHQ(config-if)# description Connects to the ISP\nHQ(config-if)# ip address 10.98.99.254 255.255.255.0\nHQ(config-if)# no shutdown\nHQ(config-if)# interface s0/0/1\nHQ(config-if)# description Connects to the Head Office WAN\nHQ(config-if)# ip address 209.165.200.120 255.255.255.0\nHQ(config-if)# no shutdown\nHQ(config-if)# end",
    "questionDe": "Beziehen Sie sich auf die Abbildung. Ein Netzwerkadministrator verbindet einen neuen Host mit dem Store LAN. Der Host muss mit entfernten Netzwerken kommunizieren. Welche IP-Adresse würde auf dem neuen Host als Standard-Gateway konfiguriert?",
    "mnemonic": "Store LAN → gi0/0 IP-Adresse",
    "moduleName": "Cisco IOS (Router-Konfiguration, Boot, Sicherheit)",
    "optionsDe": [
      "172.19.98.230",
      "172.19.98.1",
      "10.98.99.254",
      "209.165.200.120",
      "172.19.99.99"
    ]
  },
  {
    "id": 74,
    "module": 10,
    "type": "single",
    "question": "Refer to the exhibit. A network administrator is connecting a new host to the Store LAN. The host needs to communicate with remote networks. What IP address would be configured as the default gateway on the new host?",
    "options": [
      "172.20.132.13",
      "172.20.132.1",
      "10.132.133.254",
      "198.51.100.156",
      "172.20.133.132"
    ],
    "correct": [
      0
    ],
    "explanation": "",
    "topic": "Topic 10.3.1",
    "image": null,
    "exhibit": "HQ(config)# interface gi0/1\nHQ(config-if)# description Connects to the Branch LAN\nHQ(config-if)# ip address 172.20.133.132 255.255.255.0\nHQ(config-if)# no shutdown\nHQ(config-if)# interface gi0/0\nHQ(config-if)# description Connects to the Store LAN\nHQ(config-if)# ip address 172.20.132.13 255.255.255.0\nHQ(config-if)# no shutdown\nHQ(config-if)# interface s0/0/0\nHQ(config-if)# description Connects to the ISP\nHQ(config-if)# ip address 10.132.133.254 255.255.255.0\nHQ(config-if)# no shutdown\nHQ(config-if)# interface s0/0/1\nHQ(config-if)# description Connects to the Head Office WAN\nHQ(config-if)# ip address 198.51.100.156 255.255.255.0\nHQ(config-if)# no shutdown\nHQ(config-if)# end",
    "questionDe": "Beziehen Sie sich auf die Abbildung. Ein Netzwerkadministrator verbindet einen neuen Host mit dem Store LAN. Der Host muss mit entfernten Netzwerken kommunizieren. Welche IP-Adresse würde auf dem neuen Host als Standard-Gateway konfiguriert?",
    "mnemonic": "Store LAN → gi0/0 IP-Adresse",
    "moduleName": "Cisco IOS (Router-Konfiguration, Boot, Sicherheit)",
    "optionsDe": [
      "172.20.132.13",
      "172.20.132.1",
      "10.132.133.254",
      "198.51.100.156",
      "172.20.133.132"
    ]
  },
  {
    "id": 75,
    "module": 10,
    "type": "single",
    "question": "Refer to the exhibit. A network administrator is connecting a new host to the Service LAN. The host needs to communicate with remote networks. What IP address would be configured as the default gateway on the new host?",
    "options": [
      "192.168.167.166",
      "192.168.167.1",
      "10.166.167.254",
      "198.51.100.189",
      "192.168.166.46"
    ],
    "correct": [
      0
    ],
    "explanation": "A default gateway is the local router interface IP address responsible for handling traffic from a specific subnet to forward it toward remote networks. By examining the configuration of the **Main** router in the exhibit, we can see that interface **gi0/1** is assigned the description description Connects to the S (referring to the _Service LAN_). The IP address configured on this specific interface is **192.168.167.166**. Consequently, any new host connecting to this Service LAN must be configured with this IP address as its default gateway to successfully communicate beyond its local segment.",
    "topic": "Topic 10.3.1",
    "image": null,
    "exhibit": "Main(config)# interface gi0/1\nMain(config-if)# description Connects to the Service LAN\nMain(config-if)# ip address 192.168.167.166 255.255.255.0\nMain(config-if)# no shutdown\nMain(config-if)# interface gi0/0\nMain(config-if)# description Connects to the Engineering LAN\nMain(config-if)# ip address 192.168.166.46 255.255.255.0\nMain(config-if)# no shutdown\nMain(config-if)# interface s0/0/0\nMain(config-if)# description Connects to the ISP\nMain(config-if)# ip address 10.166.167.254 255.255.255.0\nMain(config-if)# no shutdown\nMain(config-if)# interface s0/0/1\nMain(config-if)# description Connects to the Head Office WAN\nMain(config-if)# ip address 198.51.100.189 255.255.255.0\nMain(config-if)# no shutdown\nMain(config-if)# end",
    "questionDe": "Beziehen Sie sich auf die Abbildung. Ein Netzwerkadministrator verbindet einen neuen Host mit dem Service LAN. Der Host muss mit entfernten Netzwerken kommunizieren. Welche IP-Adresse würde auf dem neuen Host als Standard-Gateway konfiguriert?",
    "mnemonic": "Service LAN → gi0/1 IP-Adresse",
    "moduleName": "Cisco IOS (Router-Konfiguration, Boot, Sicherheit)",
    "optionsDe": [
      "192.168.167.166",
      "192.168.167.1",
      "10.166.167.254",
      "198.51.100.189",
      "192.168.166.46"
    ]
  },
  {
    "id": 76,
    "module": 10,
    "type": "single",
    "question": "Refer to the exhibit. A network administrator is connecting a new host to the Medical LAN. The host needs to communicate with remote networks. What IP address would be configured as the default gateway on the new host?",
    "options": [
      "192.168.201.200",
      "192.168.201.1",
      "10.200.201.254",
      "203.0.113.222",
      "192.168.200.80"
    ],
    "correct": [
      0
    ],
    "explanation": "A host’s default gateway must always be the specific IP address assigned to the local router interface that is directly connected to the host’s network segment. In this configuration scenario, the interface on the local router (labeled as BldgA) that services the Medical LAN is configured with the IP address **192.168.201.200**. Consequently, any new device deployed within the Medical LAN domain must be explicitly configured with this exact IP address as its default gateway to successfully route traffic outside of the local area network.",
    "topic": "Topic 10.3.1",
    "image": null,
    "exhibit": "BldgA(config)# interface gi0/1\nBldgA(config-if)# description Connects to the Medical LAN\nBldgA(config-if)# ip address 192.168.201.200 255.255.255.0\nBldgA(config-if)# no shutdown\nBldgA(config-if)# interface gi0/0\nBldgA(config-if)# description Connects to the Client LAN\nBldgA(config-if)# ip address 192.168.200.80 255.255.255.0\nBldgA(config-if)# no shutdown\nBldgA(config-if)# interface s0/0/0\nBldgA(config-if)# description Connects to the ISP\nBldgA(config-if)# ip address 10.200.201.254 255.255.255.0\nBldgA(config-if)# no shutdown\nBldgA(config-if)# interface s0/0/1\nBldgA(config-if)# description Connects to the Head Office WAN\nBldgA(config-if)# ip address 203.0.113.222 255.255.255.0\nBldgA(config-if)# no shutdown\nBldgA(config-if)# end",
    "questionDe": "Beziehen Sie sich auf die Abbildung. Ein Netzwerkadministrator verbindet einen neuen Host mit dem Medical LAN. Der Host muss mit entfernten Netzwerken kommunizieren. Welche IP-Adresse würde auf dem neuen Host als Standard-Gateway konfiguriert?",
    "mnemonic": "Medical LAN → gi0/1 IP-Adresse",
    "moduleName": "Cisco IOS (Router-Konfiguration, Boot, Sicherheit)",
    "optionsDe": [
      "192.168.201.200",
      "192.168.201.1",
      "10.200.201.254",
      "203.0.113.222",
      "192.168.200.80"
    ]
  }
];
