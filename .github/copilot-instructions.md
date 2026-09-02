# Copilot Instructions

## Technologie-Stack

- **TypeScript** – Spiellogik, DOM-Manipulation, strikte Typisierung (`tsconfig.json`: `strict: true`)
- **Vite** – Dev-Server & Build-Tool
- **SCSS** – Styling, Mobile-First, BEM-Methode
- **HTML5** – Semantische Struktur

---

## Coding-Standards (STRIKT einhalten)

### TypeScript

- **camelCase** für Variablen und Funktionen
- **Funktionslänge max. 14 Zeilen**
- **Max. 400 LOC pro Datei**
- **Eine Funktion = eine Aufgabe**
- Kein `console.log` im Produktionscode
- Kein `any` ohne triftigen Grund – echte Typen/Interfaces verwenden
- Relative Imports (siehe VS-Code-Setting `js/ts.preferences.importModuleSpecifier`)

### SCSS

- **Mobile-First** – Basis-Styles für mobile Geräte, `min-width` Media Queries für Desktop
- Alle Buttons: `cursor: pointer`
- **BEM-Methode** für CSS-Klassen (`Block__Element--Modifier`, z. B. `card__face--back`)
- Bilder/Icons: `object-fit: cover` oder `object-fit: contain` – niemals verzerren
- Kartenflip-Animation über `transform`, keine Layoutverschiebung

### HTML

- Semantische Elemente verwenden (`<header>`, `<main>`, `<section>`, `<footer>`)
- Favicon individuell anpassen
- `<title>` aussagekräftig setzen

---

## Häufige Fehler vermeiden

- Kein `location.reload()` beim Rundenneustart – Spielzustand stattdessen sauber zurücksetzen
- Bilder/Theme-Assets nicht verzerren – immer `object-fit` verwenden
- Event Listener bei Rundenneustart nicht doppelt registrieren
- Keine `@ts-ignore` ohne Begründungskommentar

---

## Git-Workflow & Deployment

Siehe [`../CLAUDE.md`](../CLAUDE.md) für das verbindliche Branching- und
Deployment-Modell (`feature/*`/`fix/*` → `dev` → `staging` → `main`, SFTP-
Deployment via GitHub Actions).

- Committen nach jeder Coding-Session
- Klare, aussagekräftige Commit-Messages auf Englisch
- Keine `console.log`-Ausgaben committen

---

## Referenzen

- [Coding Konvention HTML](https://docs.google.com/document/d/1qI49pHzrxVKayE1xHW8tp8sgM85GEjhFMZ3nfp674zQ/edit)
- [Coding Konvention TypeScript](https://docs.google.com/document/d/1NpzBN6BmUQvWc1KRzN_Y3cC8gGe4Q1fdWMQ5U0Lt5nY/edit)
- [MDN TypeScript/JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [BEM Methodik](https://getbem.com/)
- [Vite Docs](https://vite.dev/)
