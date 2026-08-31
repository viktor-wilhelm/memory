# Git-Workflow & Deployment-Regeln

Dieses Projekt folgt einem festen Branching-Modell mit automatisiertem
Deployment auf zwei IONOS-Subdomains. Diese Regeln sind verbindlich für
jede zukünftige Aufgabe in diesem Repo.

## Branch-Struktur

```
feature/* oder fix/*  →  dev  →  staging  →  main
```

- `main` — Produktion, deployt auf `memory.viktor-wilhelm.de` (`/memory/`)
- `staging` — Test-/Abnahme-Stufe, deployt auf `memory-staging.viktor-wilhelm.de` (`/memory-staging/`)
- `dev` — Integrationsbranch, kein Deployment
- `feature/*`, `fix/*` — pro Aufgabe ein eigener Branch, kein Deployment

## Arbeitsregeln

1. Für jede neue Aufgabe wird ein eigener `feature/*`- oder `fix/*`-Branch erstellt
   (z. B. `feature/add-game-logic`, `feature/create-card-layout`, `fix/mobile-layout`).
2. Jeder `feature/*`- oder `fix/*`-Branch wird immer von `dev` abgezweigt.
3. Änderungen werden im jeweiligen Branch entwickelt, committed, zu GitHub
   gepusht und getestet.
4. Sobald eine Aufgabe **vollständig abgeschlossen** ist und alle Prüfungen
   erfolgreich waren, wird der Branch automatisch und ohne Rückfrage in
   `dev` gemergt, und `dev` wird zu GitHub gepusht.
5. Ein normaler Zwischenstand oder ein einzelner Push im Feature-/Fix-Branch
   löst **keinen** Merge aus. Der Merge nach `dev` erfolgt erst nach
   vollständigem Abschluss und erfolgreichem Test der gesamten Aufgabe.
6. `feature/*`- und `fix/*`-Branches werden **niemals** direkt in `staging`
   oder `main` gemergt.
7. `dev` wird ausschließlich nach ausdrücklicher Freigabe des Nutzers in
   `staging` gemergt.
8. `staging` wird ausschließlich nach ausdrücklicher Freigabe des Nutzers
   in `main` gemergt.
9. Ohne eindeutige Zustimmung des Nutzers wird niemals selbstständig ein
   Merge nach `staging` oder `main` durchgeführt.
10. Keine Force-Pushes. Keine Branches löschen ohne ausdrückliche
    Zustimmung des Nutzers.

## Deployment (GitHub Actions, `.github/workflows/`)

- Push/Merge nach `staging` → Build (`npm ci && npm run build`) → Deploy von
  `dist/` via SFTP nach `/memory-staging/` auf IONOS.
- Push/Merge nach `main` → Build (`npm ci && npm run build`) → Deploy von
  `dist/` via SFTP nach `/memory/` auf IONOS.
- Schlägt `npm ci`, die TypeScript-Prüfung oder der Vite-Build fehl, findet
  **kein** Deployment statt (Build-Schritt vor Deploy-Schritt im selben Job).
- Es wird ausschließlich der von Vite erzeugte Inhalt aus `dist/`
  hochgeladen.
- Verwendete Secrets: `SFTP_HOST`, `SFTP_USERNAME`, `SFTP_PASSWORD`.
  Diese Werte werden niemals ausgegeben, niemals in Code/YAML/Logs
  geschrieben und nicht verändert oder gelöscht.

## Build

```bash
npm ci
npm run build
```

Nur der Inhalt von `dist/` (Vite-Output) ist deploybar.
