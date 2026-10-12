// Sběr hodnocení obchodu z robotisekacky.cz a výběr nejzajímavějších pro widget na webu.
// Běží týdně v GitHub Actions repa Zirk0n/robotisekacky-widgety (.github/workflows/recenze.yml), lze spustit i ručně:
//   node recenze-sber.mjs data/recenze.json
// Pravidla výběru (zápis v Firma/playbooky/webove-stranky/bannery-a-homepage.md):
//  - jen 5 hvězdiček, vyplněné jméno (ne „Zákazník“), text aspoň 70 znaků, ne výčet „+ …“ z Heureky
//  - skóre = délka textu (max 350) + 120 za zmínku o poradenství/instalaci/servisu/produktu + 220 za posledních 12 měsíců (90 za 12–24 měsíců)
//  - text se NEUPRAVUJE (jen ořez mezer); jméno se zkracuje na „Jméno P.“ (ochrana soukromí)
import fs from 'fs';
const OUT = process.argv[2] || 'data/recenze.json';
const BASE = 'https://www.robotisekacky.cz/hodnoceni-obchodu/';
const MAX_PAGES = 60, PICK = 10;
const dec = s => s.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#039;|&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/\s+/g, ' ').trim();
const all = []; let total = null, avg = null;
for (let n = 1; n <= MAX_PAGES; n++) {
  const url = n === 1 ? BASE : `${BASE}strana-${n}/`;
  const r = await fetch(url, { headers: { 'user-agent': 'robotisekacky-recenze-widget/1.0 (+info@robotisekacky.cz)' } });
  if (!r.ok) break;
  const h = await r.text();
  if (n === 1) {
    const m = h.match(/(\d+)\s*hodnocení/); if (m) total = +m[1];
    const a = h.match(/(\d[,.]\d)\s*<\/?[^>]*>?\s*Průměrné hodnocení|Průměrné hodnocení obchodu je (\d[,.]\d)/); if (a) avg = (a[1] || a[2]).replace(',', '.');
  }
  const blocks = h.split(/data-testid="gridRating"/).slice(1);
  if (!blocks.length) break;
  for (const b of blocks) {
    const name = dec((b.match(/data-testid="textRatingAuthor"[^>]*>([\s\S]*?)<\/span>\s*<\/span>|data-testid="textRatingAuthor"[^>]*>([\s\S]*?)<\/span>/) || [])[1] || (b.match(/data-testid="textRatingAuthor"[^>]*>([\s\S]*?)<\/span>/) || [])[1] || '');
    const stars = (b.match(/star star-on/g) || []).length;
    const date = dec((b.match(/data-testid="latestContributionDate"[^>]*>([\s\S]*?)<\/span>/) || [])[1] || '');
    const text = dec((b.match(/data-testid="textRating"[^>]*>([\s\S]*?)<\/div>/) || [])[1] || '');
    all.push({ name, stars, date, text });
  }
  await new Promise(r => setTimeout(r, 400)); // šetrně k serveru
}
const KW = /(porad|instal|servis|nastav|zaškol|ochot|odborn|vysavač|sekač|bazén|zahrad|robot|doporuč|přístup|komunikac)/i;
const now = Date.now();
const parseDate = d => { const m = d.match(/(\d+)\.(\d+)\.(\d{4})/); return m ? new Date(+m[3], +m[2] - 1, +m[1]).getTime() : 0; };
const shortName = n => { const p = n.trim().split(/\s+/); return p.length > 1 ? `${p[0]} ${p[p.length - 1][0]}.` : p[0]; };
const seen = new Set();
const picked = all
  .filter(r => r.stars === 5 && r.name && !/^z[aá]kazn[ií]k$/i.test(r.name) && r.text.length >= 70 && !/^[+\-]\s/.test(r.text))
  .map(r => ({ ...r, score: Math.min(r.text.length, 350) + (KW.test(r.text) ? 120 : 0) + (now - parseDate(r.date) < 365 * 864e5 ? 220 : now - parseDate(r.date) < 730 * 864e5 ? 90 : 0) }))
  .sort((a, b) => b.score - a.score)
  .filter(r => { const k = r.name.toLowerCase(); if (seen.has(k)) return false; seen.add(k); return true; })
  .slice(0, PICK)
  .map(r => ({ jmeno: shortName(r.name), datum: r.date, text: r.text }));
const out = { aktualizovano: new Date().toISOString().slice(0, 10), celkem: total || all.length, prumer: avg || '5.0', zdroj: BASE, recenze: picked };
fs.mkdirSync(OUT.replace(/[^/]+$/, '') || '.', { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(out, null, 1));
console.log(`staženo ${all.length}, vybráno ${picked.length}, celkem ${out.celkem}, průměr ${out.prumer}`);
