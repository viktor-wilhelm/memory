# Git-Workflow & IONOS-Deployment

Dokumentation der Branching-Struktur und der automatisierten
Deployment-Pipeline dieses Projekts (Vite + TypeScript + SCSS,
gehostet auf IONOS-Webspace via SFTP).

## 1. Branch-Struktur

```
feature/* oder fix/*  →  dev  →  staging  →  main
```

| Branch       | Zweck                          | Deployment-Ziel                                   |
|--------------|---------------------------------|----------------------------------------------------|
| `feature/*`, `fix/*` | Einzelne Aufgabe/Bugfix | kein Deployment |
| `dev`        | Integrationsbranch             | kein Deployment |
| `staging`    | Test-/Abnahmestufe             | `memory-staging.viktor-wilhelm.de` (`/memory-staging/`) |
| `main`       | Produktion                     | `memory.viktor-wilhelm.de` (`/memory/`) |

## 2. Ablauf einer Aufgabe

1. Neuer `feature/*`- oder `fix/*`-Branch, abgezweigt von `dev`.
2. Entwicklung, Commits, Push, Tests im eigenen Branch.
3. Nach vollständigem Abschluss: Merge in `dev` (kein Deployment,
   dient nur der Integration).
4. Merge `dev` → `staging` **nur nach expliziter Freigabe** — löst
   automatisch das Staging-Deployment aus.
5. Nach Prüfung auf Staging: Merge `staging` → `main` **nur nach
   expliziter Freigabe** — löst automatisch das Produktions-Deployment
   aus.

Direkte Merges von `feature/*`/`fix/*` nach `staging` oder `main` sind
nicht vorgesehen. Kein Force-Push, keine Branches löschen ohne
Rücksprache.

## 3. GitHub Actions (CI/CD)

Zwei Workflows unter `.github/workflows/`, jeweils getriggert durch
einen Push auf den entsprechenden Branch:

### `deploy-staging.yml`

```yaml
on:
  push:
    branches: [staging]
```

### `deploy-main.yml`

```yaml
on:
  push:
    branches: [main]
```

Beide Workflows laufen identisch ab:

1. **Checkout** (`actions/checkout@v4`)
2. **Node.js Setup** (`actions/setup-node@v4`, Node 20, npm-Cache)
3. **Install** — `npm ci`
4. **Build** — `npm run build` (führt `tsc --noEmit && vite build` aus)
5. **Deploy** — `wlixcc/SFTP-Deploy-Action@v1.2.4` lädt den Inhalt von
   `dist/` per SFTP auf den IONOS-Webspace hoch.

Schlägt einer der Schritte 1–4 fehl (z. B. TypeScript-Fehler,
Build-Fehler), wird **nicht** deployt, da Build und Deploy im selben
Job hintereinander laufen.

## 4. Verbindung zu IONOS

Die Verbindung läuft über **SFTP** (Port 22) mit der GitHub Action
[`wlixcc/SFTP-Deploy-Action`](https://github.com/wlixcc/SFTP-Deploy-Action).

### 4.1 Benötigte Zugangsdaten

IONOS-Webspace besitzt einen SFTP-Zugang (Hostname, Benutzername,
Passwort) — zu finden im IONOS-Kundencenter unter
**Hosting → Webspace → FTP & SFTP-Zugang** (oder vergleichbar, je nach
Tarif).

### 4.2 GitHub Secrets

Diese Zugangsdaten werden **nicht** im Code hinterlegt, sondern als
verschlüsselte Repository-Secrets in GitHub gespeichert:

`GitHub-Repo → Settings → Secrets and variables → Actions → New repository secret`

| Secret-Name        | Inhalt                          |
|---------------------|----------------------------------|
| `SFTP_HOST`         | Hostname/IP des IONOS-SFTP-Servers |
| `SFTP_USERNAME`     | SFTP-Benutzername                |
| `SFTP_PASSWORD`     | SFTP-Passwort                    |

Diese Secrets werden in den Workflows referenziert:

```yaml
username: ${{ secrets.SFTP_USERNAME }}
server: ${{ secrets.SFTP_HOST }}
password: ${{ secrets.SFTP_PASSWORD }}
```

Sie erscheinen nie im Klartext in Logs, YAML oder Code.

### 4.3 Zielpfade auf dem Webspace

| Workflow            | `remote_path` | Domain |
|----------------------|----------------|--------|
| `deploy-staging.yml` | `/memory-staging` | `memory-staging.viktor-wilhelm.de` |
| `deploy-main.yml`    | `/memory`          | `memory.viktor-wilhelm.de` |

Diese Ordner müssen im IONOS-Webspace existieren und als Subdomains
auf die jeweiligen Verzeichnisse zeigen (IONOS-Kundencenter →
**Domains & SSL → Subdomain einrichten**, Zielverzeichnis auf
`/memory` bzw. `/memory-staging` setzen).

Es wird ausschließlich der von `vite build` erzeugte Inhalt aus
`dist/` hochgeladen (`local_path: "./dist/*"`).

## 5. Kurzanleitung: neue Umgebung anbinden

Um dieses Setup für ein neues Projekt/Repo zu reproduzieren:

1. IONOS-Subdomain(s) anlegen und auf ein Zielverzeichnis zeigen
   lassen (z. B. `/meinprojekt`).
2. SFTP-Zugangsdaten im IONOS-Kundencenter ermitteln.
3. In GitHub die drei Secrets `SFTP_HOST`, `SFTP_USERNAME`,
   `SFTP_PASSWORD` anlegen.
4. Workflow-YAML wie oben anlegen, `remote_path` auf das jeweilige
   Zielverzeichnis anpassen.
5. Branch-Schutzregeln/Merge-Freigaben nach Bedarf einrichten.
