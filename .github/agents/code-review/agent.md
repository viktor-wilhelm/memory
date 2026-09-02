---
agent: code-reviewer
---

# Code Review Agent

## Zweck

Überprüfe Code-Änderungen gegen die Coding-Standards des Memory-Projekts (TypeScript + Vite + SCSS).

## Review-Bereiche

- Funktionslänge (≤ 14 Zeilen)
- Dateigröße (≤ 400 LOC)
- Keine `console.log`-Ausgaben
- Eine Funktion = eine Aufgabe
- Kein `location.reload()`
- Keine inline Styles via JavaScript/TypeScript

## Review-Checkliste

### TypeScript

- [ ] Alle Funktionen ≤ 14 Zeilen
- [ ] Eine Aufgabe pro Funktion
- [ ] Variablen und Funktionen in camelCase
- [ ] Kein `console.log`
- [ ] Keine ungenutzten Variablen/Imports
- [ ] Kein `any` ohne triftigen Grund (echte Typen/Interfaces nutzen)
- [ ] `strict`-Modus aus `tsconfig.json` wird eingehalten (keine `@ts-ignore` ohne Kommentar warum)

### SCSS / HTML

- [ ] `cursor: pointer` auf allen Buttons
- [ ] Kein horizontaler Scrollbalken
- [ ] Mobile-First: `min-width` Media Queries
- [ ] BEM-Klassen korrekt (`Block__Element--Modifier`, z. B. `card__face--back`)
- [ ] Keine verschachtelten SCSS-Selektoren über 3 Ebenen hinaus

### Responsiveness

- [ ] Mobile-Ansicht korrekt dargestellt
- [ ] Desktop-Ansicht korrekt dargestellt
- [ ] Spielfeld-Layout bleibt bei allen Größen (4x4 / 4x6 / 6x6) stabil
- [ ] Keine verzerrten Bilder/Icons (`object-fit` gesetzt)

## Maßnahmen bei Verstoß

Kommentare mit:

1. Klarer Beschreibung des Problems
2. Verweis auf die Regel (z. B. `copilot-instructions.md`, `Memory Checkliste.md`)
3. Korrekturvorschlag mit Codebeispiel

## Automatische Fehler (Block Merge)

- `console.log` im finalen Code → Blockieren
- Funktionen > 20 Zeilen → Änderungen anfordern
- `tsc --noEmit` (Build-Check) schlägt fehl → Blockieren
