# CCNA v7 Quiz – Getrennte Prüfungsblöcke (AAA)

Interaktives Lernquiz für **CCNA v7** mit **strikt getrennten Prüfungsblöcken** – ideal zum Auswendiglernen ohne Vermischung von Fragen aus anderen Modulen.

## AAA-Qualität (wie Modul 8–10)

Alle **420 Fragen** in den 6 CCNA-1-Checkpoint-Blöcken:

| Block | Fragen | Deutsch | Mnemonics | Bilder lokal |
|-------|--------|---------|-----------|--------------|
| Modules 1 – 3 | 75 | ✅ | ✅ | ✅ |
| Modules 4 – 7 | 70 | ✅ | ✅ | ✅ |
| Modules 8 – 10 | 76 | ✅ (handverifiziert) | ✅ | ✅ |
| Modules 11 – 13 | 71 | ✅ | ✅ | ✅ |
| Modules 14 – 15 | 61 | ✅ | ✅ | ✅ |
| Modules 16 – 17 | 67 | ✅ | ✅ | ✅ |

- **Vollständige deutsche Fragen + Antwortoptionen** (nicht gekürzt, ≥55–75 % Längenprüfung)
- **Eselsbrücken** zu jeder Frage
- **Englische Prüfungsreferenz** unter der deutschen Frage
- **Verifizierung:** `python scripts/verify_all_banks.py` → 0 Fehler

## Strikte Trennung

Jeder Prüfungsblock wird **komplett isoliert** gelernt:

- Du wählst zuerst **einen** Prüfungsblock aus
- Fragen aus anderen Blöcken werden **nie** gemischt
- Fortschritt pro Block: `ccna_v7_{blockId}_progress`

## Features

- **6 Lernmodi**: Lernen, Üben, Prüfung (60 Min), Fehler wiederholen, Schwächen trainieren, Nach Modul
- **DE/EN** Umschaltung
- **Dark Mode** + mobiloptimiert
- Lokaler Fortschritt im Browser

## Starten

```bash
npx serve .
```

## Online (ohne Anmeldung)

**https://nicofafaf.github.io/CCNAModule/**

## Daten pflegen

```bash
python scripts/parse_itexam_universal.py     # Banks aus ITExamAnswers parsen
python scripts/aaa_upgrade_all.py          # DE + Mnemonics + Bilder + Fixes
python scripts/verify_all_banks.py         # AAA-Prüfung aller Banks
python scripts/rebuild_questions.py        # Modul 8–10 EN aus Quelle (mit DE)
```

## Quelle

[ITExamAnswers.net – CCNA v7](https://itexamanswers.net/ccna-v7/ccna-v7-course-1/)
