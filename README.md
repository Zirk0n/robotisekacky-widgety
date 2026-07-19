# robotisekacky-widgety

## Instalační widget pro články

- `widget-instalace-clanky.html` – HTML načítané do zástupného prvku v článku
- `widget-instalace-clanky.js` – karusel, modální okna a načtení aktuálního počtu hodnocení
- `widget-instalace-clanky.css` – styly omezené pouze na `.rsw-article`, aby neovlivňovaly zbytek článku

Do článku stačí vložit:

```html
<div data-rsw-article-host></div>
<script src="https://cdn.jsdelivr.net/gh/Zirk0n/robotisekacky-widgety@main/widget-instalace-clanky.js" defer></script>
```
