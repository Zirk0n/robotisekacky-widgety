// Mapa „URL produktu → hlavní fotka“ z veřejného feedu pro Heureku (bez API klíče).
// Web-v2.js ji používá tam, kde Shoptet fotku nevykreslí (blok „Nejprodávanější“ v kategoriích).
// Fotka se bere ve velikosti „detail“ (≈ 423 px, cca 30 kB) místo „orig“ z feedu.
// Kopie v repu robotisekacky-widgety: scripts/obrazky-sber.mjs (GitHub Action .github/workflows/obrazky.yml denně).
// Použití: node obrazky-sber.mjs data/obrazky.json
import fs from 'node:fs';
const out = process.argv[2] || 'data/obrazky.json';
const FEED = 'https://www.robotisekacky.cz/heureka/export/products.xml';
// Feed se občas vrátí prázdný (Shoptet ho zrovna generuje) → až 4 pokusy s pauzou.
async function stahni() {
  for (let pokus = 1; pokus <= 4; pokus++) {
    try {
      const res = await fetch(FEED, { headers: { 'cache-control': 'no-cache' } });
      const text = await res.text();
      const pocet = text.split('<SHOPITEM>').length - 1;
      console.log(`pokus ${pokus}: HTTP ${res.status}, ${text.length} B, položek ${pocet}`);
      if (res.ok && pocet >= 50) return text;
    } catch (e) {
      console.log(`pokus ${pokus}: chyba ${e.message}`);
    }
    if (pokus < 4) await new Promise(r => setTimeout(r, 120000));
  }
  return '';
}
const xml = await stahni();
const map = {};
for (const it of xml.split('<SHOPITEM>').slice(1)) {
  const url = (it.match(/<URL>\s*([^<\s]+)\s*<\/URL>/) || [])[1];
  const img = (it.match(/<IMGURL>\s*([^<\s]+)\s*<\/IMGURL>/) || [])[1];
  if (!url || !img) continue;
  const path = new URL(url).pathname;
  if (!map[path]) map[path] = img.replace('/user/shop/orig/', '/user/shop/detail/').replace(/\?.*$/, '');
}
const n = Object.keys(map).length;
if (n < 50) { console.error('Podezřele málo položek (' + n + ') – nezapisuji'); process.exit(1); }
fs.writeFileSync(out, JSON.stringify({ aktualizovano: new Date().toISOString().slice(0, 10), pocet: n, obrazky: map }));
console.log('obrázků:', n, '→', out);
