---
agent: code-reviewer
---

# Checkliste vor Abgabe – Memory

Die fachliche Abgabe-Checkliste (User Stories 1–5) liegt in
[`Memory Checkliste.md`](../../../Memory%20Checkliste.md) im Projekt-Root
und ist dort verbindlich zu erfüllen. Diese Datei ergänzt sie um die
technische Abnahme.

## Git & Allgemeines

- [ ] Feature-/Fix-Branch vollständig nach `dev` gemergt
- [ ] Klare, aussagekräftige Commit-Messages (Englisch)
- [ ] `.gitignore` beachtet, keine `node_modules`/`dist` committed
- [ ] Kein `console.log` im finalen Code
- [ ] Keine Konsolenfehler im Browser

## Build & Deployment

- [ ] `npm ci && npm run build` läuft lokal ohne Fehler durch (`tsc --noEmit` + Vite-Build)
- [ ] Staging-Deployment (`staging`-Branch) manuell geprüft
- [ ] Erst nach Freigabe: Merge nach `main` (Produktions-Deployment)

## Design & UI

- [ ] Favicon vorhanden
- [ ] Alle Buttons haben `cursor: pointer`
- [ ] Layout entspricht der Vorgabe für alle 3 Spielfeldgrößen (4x4 / 4x6 / 6x6)
- [ ] Mindestens 2 Themes vollständig umgesetzt (Farbe + Motive)

## Spiellogik

- [ ] Homescreen → Settings → Spielfeld-Flow funktioniert durchgängig
- [ ] Kartenumdrehung als flüssige Animation
- [ ] Punktestand und aktueller Spieler werden korrekt angezeigt
- [ ] „Exit Game"-Button funktioniert
- [ ] Game-Over-Anzeige zeigt den Spieler mit den meisten Punkten korrekt an
- [ ] Neue Runde lässt sich ohne `location.reload()` starten

## Responsiveness

- [ ] Mobile-Ansicht korrekt
- [ ] Desktop-Ansicht korrekt
- [ ] Kein horizontaler Scrollbalken

## Code Conventions

- [ ] [Coding Konvention für HTML](https://docs.google.com/document/d/1qI49pHzrxVKayE1xHW8tp8sgM85GEjhFMZ3nfp674zQ/edit)
- [ ] [Coding Konvention für TypeScript](https://docs.google.com/document/d/1NpzBN6BmUQvWc1KRzN_Y3cC8gGe4Q1fdWMQ5U0Lt5nY/edit)
