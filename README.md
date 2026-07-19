# robotisekacky-widgety

## Instalační widget pro články

- `widget-instalace-clanky.html` – HTML načítané do zástupného prvku v článku
- `widget-instalace-clanky.js` – karusel, modální okna a načtení aktuálního počtu hodnocení
- `widget-instalace-clanky.css` – styly omezené pouze na `.rsw-article`, aby neovlivňovaly zbytek článku
- `widget-instalace-clanky-inline.html` – samostatná verze pro přímé vložení do zdrojového kódu článku bez závislosti na externím CSS nebo JavaScriptu

Do článku stačí vložit:

```html
<div data-rsw-article-host></div>
<script src="https://cdn.jsdelivr.net/gh/Zirk0n/robotisekacky-widgety@main/widget-instalace-clanky.js" defer></script>
```

Pokud editor nebo prohlížeč externí soubory blokuje, vložte celý obsah souboru
`widget-instalace-clanky-inline.html`. Soubor se po změně dílčích šablon obnoví příkazem:

```bash
node build-inline-widget.mjs
```
