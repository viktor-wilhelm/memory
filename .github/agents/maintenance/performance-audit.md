---
agent: maintenance-assistant
---

# Performance Audit Agent

## Zweck

Identifiziere und behebe Performance-Probleme im TypeScript/Vite/SCSS-Projekt Memory.

## Typische Performance-Probleme

### 1. Unnötige Reflows durch DOM-Manipulation

```typescript
// ❌ Problem: DOM im Loop verändern
cards.forEach((card) => {
  field.innerHTML += `<button class="card">...</button>`;
});

// ✅ Lösung: DocumentFragment nutzen
const fragment = document.createDocumentFragment();
cards.forEach((card) => {
  const el = createCardElement(card);
  fragment.appendChild(el);
});
field.appendChild(fragment);
```

### 2. Event Listener ohne Cleanup

```typescript
// ❌ Problem: Listener wird bei jedem Rundenstart erneut registriert
card.addEventListener("click", handleCardFlip);

// ✅ Lösung: Listener explizit entfernen, bevor neu registriert wird
card.removeEventListener("click", handleCardFlip);
card.addEventListener("click", handleCardFlip);
```

### 3. Bilder/Theme-Assets ohne Lazy Loading

```html
<!-- ❌ Problem: alle Theme-Bilder sofort laden -->
<img src="theme-space.png" alt="..." />

<!-- ✅ Lösung: Lazy Loading nutzen -->
<img src="theme-space.png" loading="lazy" alt="..." />
```

## Audit-Checkliste

- [ ] Keine DOM-Manipulation im Loop
- [ ] Event Listener werden bei Rundenneustart sauber entfernt/neu gesetzt
- [ ] Theme-/Karten-Bilder mit `loading="lazy"` außerhalb des Viewports
- [ ] CSS-Animationen (Kartenflip) mit `transform` / `opacity` statt `top` / `left`
- [ ] Fonts mit `font-display: swap` geladen
- [ ] Kein Memory Leak durch vergessene Timer/Intervals (z. B. Punktezähler)
- [ ] Vite-Build (`npm run build`) erzeugt kein unnötig großes Bundle (Assets prüfen)
