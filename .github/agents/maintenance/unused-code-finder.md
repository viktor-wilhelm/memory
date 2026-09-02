---
agent: maintenance-assistant
---

# Unused Code Finder

## Zweck

Finde und entferne ungenutzten Code, der das Memory-Projekt aufbläht.

## Such-Muster

### Vergessene console.log

```bash
grep -rn "console.log" --include="*.ts" src/
```

### Auskommentierter Code

```bash
grep -rn "^[[:space:]]*//" --include="*.ts" src/
```

### Ungenutzte Variablen / Funktionen / Typen

Typische ungenutzte Elemente:

- Debug-Flags (`const debugMode = true`)
- Hilfsfunktionen, die nie aufgerufen werden
- Ungenutzte Interfaces/Types (`tsc --noEmit` mit `noUnusedLocals` prüft das teilweise)
- Verwaiste SCSS-Klassen, die nicht in `index.html`/TS-generiertem DOM vorkommen
- Nicht mehr verwendete Theme-Assets in `public/`

## Cleanup-Regeln

- Auskommentierter Code entfernen (nicht committen)
- `console.log` entfernen
- Ungenutzte Variablen/Imports entfernen
- Verwaiste SCSS-Klassen entfernen
- Leere Funktionen entfernen oder mit `// TODO` markieren

## Nach dem Cleanup

- [ ] Alle `console.log` entfernt
- [ ] Kein auskommentierter Code vorhanden
- [ ] Keine ungenutzten Variablen/Imports (`tsc --noEmit` sauber)
- [ ] Keine verwaisten SCSS-Klassen
- [ ] Spiel funktioniert noch nach Cleanup (im Browser testen: `npm run dev`)
