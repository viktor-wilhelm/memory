---
agent: code-reviewer
---

# Code Review Checkliste

Schnell-Referenz für Code-Reviews im Memory-Projekt.

## TypeScript

- [ ] Funktionen ≤ 14 Zeilen
- [ ] Eine Aufgabe pro Funktion
- [ ] camelCase für Variablen und Funktionen
- [ ] Kein `console.log`
- [ ] Keine ungenutzten Variablen/Imports
- [ ] Kein `any` ohne triftigen Grund

## Dateien

- [ ] ≤ 400 LOC pro Datei
- [ ] Logisch sinnvolle Dateiaufteilung (z. B. `game.ts`, `settings.ts`, `card.ts`)

## Spiellogik

- [ ] Kartenumdrehung als flüssige CSS-Animation, keine Layout-Sprünge
- [ ] Kein `location.reload()` beim Neustart einer Runde
- [ ] Punktestand/Spielerwechsel konsistent nach jedem Zug

## SCSS / HTML

- [ ] `cursor: pointer` auf Buttons
- [ ] Kein horizontaler Scrollbalken
- [ ] Mobile-First (`min-width` Media Queries)
- [ ] BEM-Klassen korrekt
- [ ] Keine verzerrten Bilder (`object-fit` gesetzt)

## Git

- [ ] Keine `console.log`-Ausgaben committed
- [ ] Klare englische Commit-Messages
- [ ] `.gitignore` beachtet
- [ ] Branch-Workflow eingehalten (`feature/*`/`fix/*` → `dev` → `staging` → `main`)

---

**Schnell-Fehler:**

- `console.log` → Ablehnen
- Funktion > 20 Zeilen → Überarbeitung anfordern
- `tsc --noEmit` schlägt fehl → Blockieren
