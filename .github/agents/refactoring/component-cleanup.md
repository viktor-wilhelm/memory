---
agent: refactoring-assistant
---

# Component Cleanup & Optimization

## Zweck

TypeScript-Module bereinigen, optimieren und auf Coding-Standards prüfen.

## Typische Cleanup-Aufgaben

### Große TS-Dateien aufteilen

Wenn eine Datei > 400 LOC wächst, Logik auslagern:

```typescript
// ❌ Alles in main.ts
function flipCard() { ... }
function checkMatch() { ... }
function updateScore() { ... }
function toggleTheme() { ... }

// ✅ Logisch trennen:
// card.ts      → Karten-Rendering & Flip-Logik
// game.ts      → Rundenablauf, Match-Prüfung, Punktestand
// settings.ts  → Spielerfarbe, Feldgröße, Theme-Auswahl
```

### Duplizierte Logik zusammenführen

```typescript
// ❌ Gleiche Logik mehrfach
function isFourByFour(size: string) {
  return size === "4x4";
}
function isFourBySix(size: string) {
  return size === "4x6";
}

// ✅ Generische Hilfsfunktion
type BoardSize = "4x4" | "4x6" | "6x6";
function getCardCount(size: BoardSize): number {
  const counts: Record<BoardSize, number> = { "4x4": 16, "4x6": 24, "6x6": 36 };
  return counts[size];
}
```

### Themes/Player-Optionen konsistent halten

```typescript
// Sicherstellen: jedes Theme hat alle benötigten Assets
interface Theme {
  id: string;
  cardBack: string;
  motifs: string[]; // muss mindestens die Anzahl der Kartenpaare abdecken
}
```

## Cleanup-Checkliste

- [ ] Alle Funktionen ≤ 14 Zeilen
- [ ] Keine duplizierte Logik
- [ ] Dateien ≤ 400 LOC
- [ ] Theme-/Settings-Objekte vollständig und typsicher
- [ ] Keine ungenutzten Hilfsfunktionen
- [ ] Event Listener sauber registriert (kein Doppel-Binding bei Rundenneustart)
