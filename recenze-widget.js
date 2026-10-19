/* robotisekacky.cz – widget vybraných recenzí. Nahrazuje obsah nativního bloku Shoptetu „Hodnocení obchodu“ (#hodnoceniobchodu).
   Data: data/recenze.json v repu Zirk0n/robotisekacky-widgety (týdně generuje GitHub Action, výběr viz scripts/recenze-sber.mjs).
   Když se data nenačtou, nechá původní blok beze změny. Zdroj pravdy: Firma/nastroje/recenze/. */
(function () {
  var DATA = 'https://raw.githubusercontent.com/Zirk0n/robotisekacky-widgety/main/data/recenze.json';
  var CSS = '' +
    '#hodnoceniobchodu[data-rsr]{display:block!important;float:none!important;width:100%!important;max-width:1180px!important;margin-left:auto!important;margin-right:auto!important;padding-left:0!important;padding-right:0!important;background:none!important;box-shadow:none!important;border:0!important}' +
    '.rsr{padding:34px 0 26px;font-family:inherit;overflow:hidden}' +
    '.rsr__head{text-align:center;margin:0 auto 18px;max-width:760px;padding:0 16px}' +
    '.rsr__h{margin:0 0 6px!important;font-size:30px!important;line-height:1.2;font-weight:800;color:var(--rs-g,#1b3f20)}' +
    '.rsr__score{display:inline-flex;align-items:center;gap:16px;margin-top:8px;padding:12px 22px 12px 12px;border-radius:999px;background:#fff;border:1px solid var(--rs-line,#e6f0db);box-shadow:0 12px 28px rgba(27,63,32,.10);text-decoration:none!important;color:var(--rs-g,#1b3f20)}' +
    '.rsr__score img{width:72px;height:72px;flex:0 0 72px}.rsr__num{font-size:44px;font-weight:800;line-height:1;color:var(--rs-g,#1b3f20)}' +
    '.rsr__meta2{display:flex;flex-direction:column;align-items:flex-start;gap:2px;text-align:left;font-size:14.5px;color:#4d4d4f}.rsr__meta2 b{color:var(--rs-g,#1b3f20)}.rsr__big{color:#f5b301;font-size:24px;letter-spacing:2px;line-height:1}' +
    '@media (max-width:640px){.rsr__score{gap:10px;padding:10px 16px 10px 10px;border-radius:22px}.rsr__score img{width:54px;height:54px;flex-basis:54px}.rsr__num{font-size:34px}.rsr__big{font-size:19px}.rsr__meta2{font-size:13px}}' +
    '.rsr__sum{display:inline-flex;align-items:center;gap:8px;flex-wrap:wrap;justify-content:center;color:#4d4d4f;font-size:15px}' +
    '.rsr__stars{color:#f5b301;letter-spacing:1px;font-size:17px}' +
    '.rsr__wrap{position:relative;max-width:1180px;margin:0 auto;padding:0 60px;box-sizing:border-box}' +
    '.rsr__track{display:flex;gap:16px;overflow-x:auto;scroll-snap-type:x mandatory;scroll-behavior:smooth;padding:8px 14px 26px;margin:0 -14px;scroll-padding:0 14px;scrollbar-width:none}' +
    '.rsr__track::-webkit-scrollbar{display:none}' +
    '.rsr__card{flex:0 0 calc((100% - 32px)/3);min-width:260px;scroll-snap-align:start;background:#fff;border:1px solid var(--rs-line,#e6f0db);border-radius:18px;padding:18px 20px;box-shadow:0 10px 24px rgba(27,63,32,.08);display:flex;flex-direction:column;gap:10px}' +
    '.rsr__q{margin:0!important;color:#2b3328;font-size:15.5px;line-height:1.55;display:-webkit-box;-webkit-line-clamp:7;-webkit-box-orient:vertical;overflow:hidden}' +
    '.rsr__q::before{content:"„";color:var(--rs-l,#86BB41);font-weight:800;font-size:22px;line-height:0;margin-right:2px}' +
    '.rsr__meta{margin-top:auto;display:flex;align-items:center;gap:10px;color:#5a6b56;font-size:13.5px}' +
    '.rsr__ini{width:34px;height:34px;border-radius:50%;background:var(--rs-soft2,#eef6e6);color:var(--rs-g,#1b3f20);display:grid;place-items:center;font-weight:800;font-size:13px;flex:0 0 34px}' +
    '.rsr__meta b{color:var(--rs-g,#1b3f20)}' +
    '.rsr__arrow{position:absolute;top:44%;transform:translateY(-50%);width:46px;height:46px;border-radius:50%;border:0;background:rgba(27,63,32,.85);color:#fff;font-size:18px;cursor:pointer;box-shadow:0 12px 24px rgba(0,0,0,.18);z-index:2}' +
    '.rsr__arrow:hover{background:var(--rs-g,#1b3f20)}.rsr__arrow--l{left:6px}.rsr__arrow--r{right:6px}' +
    '.rsr__foot{text-align:center;margin-top:6px}' +
    '.rsr__btn{display:inline-block;padding:11px 22px;border-radius:999px;border:2px solid var(--rs-g,#1b3f20);color:var(--rs-g,#1b3f20)!important;font-weight:700;text-decoration:none!important}' +
    '.rsr__btn:hover{background:var(--rs-soft2,#eef6e6)}' +
    '@media (max-width:991px){.rsr__wrap{padding:0 54px}.rsr__card{flex-basis:calc((100% - 16px)/2)}}' +
    '@media (max-width:640px){.rsr__wrap{padding:0}.rsr__track{padding:8px 16px 22px;margin:0;scroll-padding:0 16px}.rsr__h{font-size:24px!important}.rsr__card{flex-basis:84%}.rsr__arrow{display:none}}' +
    /* stránka Hodnocení obchodu: statistiky, dlaždice, karta majitele, CTA + nativní seznam hodnocení v našem vzhledu */
    '.rsr-page{max-width:1180px;margin:0 auto 26px}.rsr-page .rsr{padding-top:10px}.rsr-page>*+*{margin-top:22px}' +
    '.rsr__stats,.rsr__owner,.rsr__ctap,.rsr__tile,.rs-hodn .rate-wrap,.rs-hodn #rate-form{background:#fff;border:1px solid var(--rs-line,#e6f0db);border-radius:20px;box-shadow:0 10px 24px rgba(27,63,32,.07)}' +
    '.rsr__stats{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:22px 34px;padding:22px 28px}.rsr__hk img{width:110px;height:110px;display:block}' +
    '.rsr__badges{display:flex;flex-direction:column;gap:7px;align-items:flex-start}.rsr__badges small,.rsr__tile small,.rsr__kick{font-size:12px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;color:#6f8a5f}' +
    '.rsr__badges span{padding:5px 12px;border-radius:999px;font-size:13px;font-weight:700}.rsr__b1{background:#dbeafe;color:#1d4ed8}.rsr__b2{background:#fef3c7;color:#92400e}' +
    '.rsr__st{text-align:center;padding-left:28px;border-left:1px solid var(--rs-line,#e6f0db)}.rsr__st b{display:block;font-size:36px;line-height:1;font-weight:800;color:var(--rs-g,#1b3f20)}.rsr__st span{font-size:13px;color:#5a6b56}' +
    '.rsr__badge{align-self:flex-start;padding:3px 10px;border-radius:999px;background:var(--rs-soft2,#eef6e6);color:var(--rs-g,#1b3f20);font-size:11.5px;font-weight:800;letter-spacing:.04em;text-transform:uppercase}' +
    '.rsr__tiles{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px}.rsr__tile{padding:20px;display:flex;flex-direction:column;gap:6px}' +
    '.rsr__ic{width:44px;height:44px;border-radius:14px;background:var(--rs-soft2,#eef6e6);display:grid;place-items:center;margin-bottom:4px}.rsr__ic svg{width:24px;height:24px;fill:none;stroke:var(--rs-g,#1b3f20);stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}' +
    '.rsr__tile h3{margin:0!important;font-size:18px!important;font-weight:800;color:var(--rs-g,#1b3f20)}.rsr__tile p{margin:0!important;font-size:14.5px;line-height:1.55;color:#2b3328;flex:1}.rsr__tile a{font-weight:800;color:var(--rs-g,#1b3f20)!important;text-decoration:none!important;font-size:14px}' +
    '.rsr__owner{display:grid;grid-template-columns:220px 1fr;gap:28px;align-items:center;padding:22px}.rsr__owner img{width:220px;aspect-ratio:3/4;object-fit:cover;object-position:center top;border-radius:16px;display:block}' +
    '.rsr__owner h3{margin:2px 0 10px!important;font-size:24px!important;font-weight:800;color:var(--rs-g,#1b3f20)}.rsr__owner p{margin:0 0 12px!important;color:#2b3328;font-size:15.5px;line-height:1.6}' +
    '.rsr__ostats{display:flex;flex-wrap:wrap;gap:12px;margin:4px 0 14px}.rsr__ostats span{padding:10px 16px;border-radius:14px;background:var(--rs-soft,#f2f7ec);font-size:12.5px;color:#5a6b56}.rsr__ostats b{display:block;font-size:22px;color:var(--rs-g,#1b3f20)}' +
    '.rsr__contact a{color:var(--rs-g,#1b3f20)!important;font-weight:800}' +
    '.rsr__ctap{display:flex;align-items:center;justify-content:space-between;gap:18px;flex-wrap:wrap;padding:20px 24px}.rsr__ctap h3{margin:0!important;font-size:19px!important;font-weight:800;color:var(--rs-g,#1b3f20)}.rsr__ctap p{margin:4px 0 0!important;color:#5a6b56;font-size:14.5px}' +
    '.rsr__cta{display:flex;flex-wrap:wrap;gap:10px}.rsr__cta a{display:inline-flex;align-items:center;padding:10px 18px;border-radius:999px;font-weight:800;text-decoration:none!important;border:1px solid var(--rs-line,#e6f0db);color:var(--rs-g,#1b3f20)!important;background:#fff;transition:transform .15s}' +
    '.rsr__cta a.pri{background:var(--rs-g,#1b3f20);border-color:var(--rs-g,#1b3f20);color:#fff!important}.rsr__cta a:hover{transform:translateY(-2px)}' +
    '.rsr__all{text-align:center;margin:34px 0 8px!important}.rsr__all h2{margin:0!important;font-size:26px!important;font-weight:800;color:var(--rs-g,#1b3f20)}.rsr__all p{margin:4px 0 0!important;color:#5a6b56;font-size:14px}' +
    /* nativní souhrn, formulář a výpis hodnocení */
    '.rs-hodn .rate-wrap{display:grid!important;grid-template-columns:minmax(0,1fr) minmax(0,1.6fr);gap:24px;align-items:center;padding:22px 26px!important;margin:0 0 16px!important}' +
    '.rs-hodn .rate-average{color:var(--rs-g,#1b3f20)!important;font-weight:800!important;font-size:56px!important;line-height:1}.rs-hodn .stars-label{color:#5a6b56!important;font-size:14px}.rs-hodn .star-on::before,.rs-hodn .rate-star-wrap .star::before,.rs-hodn .vote-wrap .star-on::before{color:#f5b301!important}' +
    '.rs-hodn .rate-list{align-items:center}.rs-hodn .rate-value{color:var(--rs-g,#1b3f20);font-weight:700}.rs-hodn .rate-count{color:#5a6b56!important;font-weight:700}.rs-hodn .rate-bar::before{background:#eef3ea!important;border-radius:999px}.rs-hodn .rate-bar::after{background:var(--rs-l,#86BB41)!important;border-radius:999px}' +
    '.rs-hodn .add-comment{text-align:center;margin:0 0 18px}.rs-hodn .add-comment .btn{background:#fff!important;border:2px solid var(--rs-g,#1b3f20)!important;color:var(--rs-g,#1b3f20)!important;border-radius:999px!important;text-transform:none!important;letter-spacing:0!important;font-weight:800!important;font-size:15px!important;padding:10px 22px!important;height:auto!important}' +
    '.rs-hodn .add-comment .btn:hover{background:var(--rs-soft2,#eef6e6)!important}.rs-hodn #rate-form{padding:22px!important;margin-bottom:18px}.rs-hodn #rate-form h3{color:var(--rs-g,#1b3f20)!important;font-weight:800}' +
    '.rs-hodn .votes-wrap{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}.rs-hodn .vote-wrap{background:#fff!important;border:1px solid var(--rs-line,#e6f0db)!important;border-radius:18px!important;box-shadow:0 8px 20px rgba(27,63,32,.06)!important;padding:16px 18px!important;margin:0!important;width:auto!important}' +
    '.rs-hodn .vote-wrap.rs-hl{border-left:4px solid var(--rs-l,#86BB41)!important}.rs-hodn .vote-wrap.rs-dim{opacity:.75}.rs-hodn .vote-name{color:var(--rs-g,#1b3f20)!important;font-weight:800!important;font-size:16px!important}' +
    '.rs-hodn .vote-initials{background:var(--rs-soft2,#eef6e6)!important;color:var(--rs-g,#1b3f20)!important;font-weight:800}.rs-hodn .vote-content{color:#2b3328!important;font-size:14.5px!important;line-height:1.55}.rs-hodn .vote-time,.rs-hodn .vote-delimeter{color:#7a8a72!important}' +
    '.rs-hodn .listingControls .pagination__currentPage{background:var(--rs-g,#1b3f20)!important;color:#fff!important;border-radius:999px!important}.rs-hodn .listingControls .btn,.rs-hodn .listingControls .pagination__link{border-radius:999px!important;border:1px solid var(--rs-line,#e6f0db)!important;background:#fff!important;color:var(--rs-g,#1b3f20)!important;text-transform:none!important}' +
    '@media (max-width:991px){.rsr__tiles{grid-template-columns:1fr 1fr}.rs-hodn .votes-wrap{grid-template-columns:1fr 1fr}.rs-hodn .rate-wrap{grid-template-columns:1fr}}' +
    '@media (max-width:640px){.rsr__tiles,.rs-hodn .votes-wrap{grid-template-columns:1fr}.rsr__st{border-left:0;padding-left:0}.rsr__stats{gap:16px 22px;padding:18px}.rsr__owner{grid-template-columns:1fr;padding:16px}.rsr__owner img{width:100%;max-width:240px;margin:0 auto}}';
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function render(box, d, o) {
    o = o || {};
    if (!d || !d.recenze || d.recenze.length < 3) return;
    box.setAttribute('data-rsr', '1');
    if (!document.getElementById('rsr-css')) { var st = document.createElement('style'); st.id = 'rsr-css'; st.textContent = CSS; document.head.appendChild(st); }
    var prumer = String(d.prumer || '5.0').replace('.', ',');
    var cards = d.recenze.map(function (r) {
      var ini = r.jmeno.split(' ').map(function (p) { return p[0]; }).join('').slice(0, 2).toUpperCase();
      return '<article class="rsr__card">' + (o.badge ? '<span class="rsr__badge">Doporučená recenze</span>' : '') + '<span class="rsr__stars" aria-label="5 z 5 hvězdiček">★★★★★</span>' +
        '<p class="rsr__q">' + esc(r.text) + '</p>' +
        '<div class="rsr__meta"><span class="rsr__ini" aria-hidden="true">' + esc(ini) + '</span><span><b>' + esc(r.jmeno) + '</b> · ' + esc(r.datum) + '</span></div></article>';
    }).join('');
    box.innerHTML = '<section class="rsr" aria-label="Hodnocení zákazníků">' +
      '<div class="rsr__head"><h2 class="rsr__h">' + (o.title || 'Co o nás píšou zákazníci') + '</h2>' +
      (o.noScore ? '' : '<a class="rsr__score" href="' + (o.scoreHref || '/hodnoceni-obchodu/') + '"' + (o.scoreHref ? ' target="_blank" rel="noopener"' : '') + '><img src="https://cdn.myshoptet.com/usr/www.robotisekacky.cz/user/banners/logo-overeno--gold.svg?69c559fe" alt="Ověřeno zákazníky – Heureka" width="72" height="72"><span class="rsr__num">' + prumer + '</span><span class="rsr__meta2"><span class="rsr__big">★★★★★</span><span><b>' + esc(d.celkem) + ' ověřených hodnocení</b> · Ověřeno zákazníky Heureka</span></span></a>') + '</div>' +
      '<div class="rsr__wrap"><button class="rsr__arrow rsr__arrow--l" type="button" aria-label="Předchozí">❮</button>' +
      '<div class="rsr__track">' + cards + '</div>' +
      '<button class="rsr__arrow rsr__arrow--r" type="button" aria-label="Další">❯</button></div>' +
      '<div class="rsr__foot"><a class="rsr__btn" href="' + (o.btnHref || '/hodnoceni-obchodu/') + '">' + (o.btnText || 'Přečíst všechna hodnocení') + ' (' + esc(d.celkem) + ')</a></div></section>' + (o.after || '');
    if (o.before) box.insertAdjacentHTML('afterbegin', o.before);
    var tr = box.querySelector('.rsr__track');
    box.querySelector('.rsr__arrow--l').onclick = function () { tr.scrollBy({ left: -tr.clientWidth * 0.9 }); };
    box.querySelector('.rsr__arrow--r').onclick = function () { tr.scrollBy({ left: tr.clientWidth * 0.9 }); };
  }
  // Blok #hodnoceniobchodu vykresluje doplněk „Hodnocení obchodu+“ (dominikmartini/shop_rating) až po načtení stránky
  // a umí ho později přepsat → čekáme, až existuje, na homepage ho přesuneme pod výhody a při přepsání vykreslíme znovu.
  var data = null, tries = 0, rerenders = 0;
  function place(box) {
    var ben = document.querySelector('.in-index .container--bannersBenefit');
    if (ben && box.previousElementSibling !== ben) ben.parentNode.insertBefore(box, ben.nextSibling);
  }
  function apply() {
    var box = document.getElementById('hodnoceniobchodu');
    if (!box || !data) return false;
    place(box);
    if (!box.querySelector('.rsr')) render(box, data);
    return true;
  }
  function wait() {
    if (apply()) {
      var box = document.getElementById('hodnoceniobchodu');
      new MutationObserver(function () { if (rerenders < 5 && !box.querySelector('.rsr')) { rerenders++; render(box, data); } place(box); })
        .observe(box.parentNode, { childList: true, subtree: false });
      new MutationObserver(function () { if (rerenders < 5 && !box.querySelector('.rsr')) { rerenders++; render(box, data); } })
        .observe(box, { childList: true });
      return;
    }
    if (++tries < 75) setTimeout(wait, 200); // max ~15 s
  }

  /* ---- stránka /hodnoceni-obchodu/: widget nad seznamem hodnocení, karta majitele, zvýraznění podrobných recenzí, schema ---- */
  var OWNER_IMG = 'https://cdn.myshoptet.com/usr/www.robotisekacky.cz/user/documents/upload/michael%20boha%CC%81c%CC%8Cek%20-%20Heureka%20Ove%CC%8Cr%CC%8Ceno%20za%CC%81kazni%CC%81ky%20certifika%CC%81t.jpg';
  var IC = {
    shield: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l7 3v5c0 4.5-3 8.4-7 10-4-1.6-7-5.5-7-10V6l7-3z"/><path d="M8.5 12l2.5 2.5 4.5-5"/></svg>',
    tool: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L4 17l3 3 5.3-5.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4 2.5-2.5z"/></svg>',
    phone: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 3.5l2.6 3-1.6 2.2a12 12 0 0 0 7.7 7.7l2.2-1.6 3 2.6-1.4 2.9C11 21 3 13 3.6 4.9z"/></svg>',
    star: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8L3.5 9.7l5.9-.8z"/></svg>'
  };
  function num(d) { return String(d.prumer || '5.0').replace('.', ','); }
  function statsBar(d) {
    return '<div class="rsr__stats"><a class="rsr__hk" href="https://obchody.heureka.cz/robotisekacky-cz/recenze/" target="_blank" rel="noopener"><img src="https://cdn.myshoptet.com/usr/www.robotisekacky.cz/user/banners/logo-overeno--gold.svg?69c559fe" alt="Heureka – Ověřeno zákazníky" width="110" height="110"></a>' +
      '<div class="rsr__badges"><small>Ocenění Heureka</small><span class="rsr__b1">2024 – modrý odznak Ověřeno zákazníky</span><span class="rsr__b2">2026 – zlatý odznak</span></div>' +
      '<div class="rsr__st"><b>' + num(d) + '</b><span>průměr</span></div><div class="rsr__st"><b>' + esc(d.celkem) + '</b><span>hodnocení</span></div><div class="rsr__st"><b>2020</b><span>roboty prodáváme od</span></div></div>';
  }
  function tiles(d) {
    var t = [
      ['star', 'Důvěra zákazníků', 'Ověřeno zákazníky', 'Certifikát Heureka máme od roku 2024, v roce 2026 jsme získali zlatý odznak. Průměr ' + num(d) + ' z ' + esc(d.celkem) + ' hodnocení.', 'https://obchody.heureka.cz/robotisekacky-cz/recenze/', 'Recenze na Heurece'],
      ['tool', 'Servis na klíč', 'Instalace po celé ČR', 'Pomůžeme vybrat robota, projedeme zahradu, nastavíme hranice, zóny i aplikaci a ukážeme vám obsluhu.', '/instalace-sekacek/', 'Jak probíhá instalace'],
      ['phone', 'Přímý kontakt', 'Voláte přímo majiteli', 'Žádné call centrum. Telefon zvedá Michael, který roboty sám instaluje a servisuje.', 'tel:+420792325839', '+420 792 325 839'],
      ['shield', 'Nákup bez rizika', 'Servis a záruky', 'Reklamaci i servis řešíme osobně a rychle. Ozvěte se klidně i po skončení záruky.', '/reklamace-a-vraceni-zbozi/', 'Reklamace a vrácení']
    ];
    return '<div class="rsr__tiles">' + t.map(function (x) { return '<div class="rsr__tile"><span class="rsr__ic">' + IC[x[0]] + '</span><small>' + x[1] + '</small><h3>' + x[2] + '</h3><p>' + x[3] + '</p><a href="' + x[4] + '"' + (/^https/.test(x[4]) ? ' target="_blank" rel="noopener"' : '') + '>' + x[5] + ' →</a></div>'; }).join('') + '</div>';
  }
  function ownerCard(d) {
    return tiles(d) +
      '<div class="rsr__owner"><img src="' + OWNER_IMG + '" alt="Michael Boháček s certifikátem Heureka Ověřeno zákazníky" loading="lazy">' +
      '<div><small class="rsr__kick">Zakladatel a majitel</small><h3>Michael Boháček</h3>' +
      '<p>V roce 2024 jsme získali certifikát Heureka <b>Ověřeno zákazníky</b>, který dostávají obchody s dlouhodobě dobrou péčí o zákazníky. Od té doby držíme průměr <b>' + num(d) + '</b> ze všech hodnocení a v roce 2026 nám Heureka udělila <b>zlatý odznak</b>.</p>' +
      '<div class="rsr__ostats"><span><b>2020</b>roboty prodáváme od</span><span><b>' + num(d) + '</b>průměrné hodnocení</span><span><b>' + esc(d.celkem) + '</b>hodnocení</span></div>' +
      '<p class="rsr__contact">Volejte přímo mně: <a href="tel:+420792325839">+420 792 325 839</a> · <a href="mailto:info@robotisekacky.cz">info@robotisekacky.cz</a></p></div></div>' +
      '<div class="rsr__ctap"><div><h3>Máte otázku nebo potřebujete poradit?</h3><p>Jsme tu pro vás před nákupem i po něm.</p></div>' +
      '<div class="rsr__cta"><a class="pri" href="/kontakty/">Kontaktujte nás</a><a href="/reklamace-a-vraceni-zbozi/">Reklamace a servis</a><a href="/instalace-sekacek/">Instalace sekaček</a><a href="/zprovozneni-robotickeho-vysavace/">Zprovoznění vysavače</a></div></div>' +
      '<div class="rsr__all"><h2>Všechna hodnocení zákazníků</h2><p>Hodnocení z našeho obchodu i z Heureky (Ověřeno zákazníky). Celkem ' + esc(d.celkem) + ' hodnocení.</p></div>';
  }
  function page() {
    var target = document.getElementById('ratingWrapper');
    if (!target) return false;
    if (document.querySelector('.rsr-page')) return true;
    var box = document.createElement('div'); box.className = 'rsr-page';
    target.parentNode.insertBefore(box, target);
    document.body.classList.add('rs-hodn');
    render(box, data, { title: 'Co říkají zákazníci vlastními slovy', btnText: 'Zobrazit všechna hodnocení', btnHref: '#ratingWrapper', noScore: true, badge: true, before: statsBar(data), after: ownerCard(data) });
    var b = box.querySelector('.rsr__btn'); if (b) b.addEventListener('click', function (e) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
    return true;
  }
  function markVotes() {
    [].forEach.call(document.querySelectorAll('.vote-wrap:not(.rs-hl):not(.rs-dim)'), function (it) {
      var c = ((it.querySelector('.vote-content') || {}).textContent || '').trim();
      if (c.length > 60) it.classList.add('rs-hl'); else if (c.length < 30) it.classList.add('rs-dim');
    });
  }
  function schema() {
    if (!data || document.getElementById('rsr-schema')) return;
    var org = [].find.call(document.querySelectorAll('script[type="application/ld+json"]'), function (x) { try { return JSON.parse(x.textContent)['@type'] === 'Organization'; } catch (e) { return false; } });
    var agg = { '@type': 'AggregateRating', ratingValue: String(data.prumer || '5.0'), reviewCount: String(data.celkem), bestRating: '5', worstRating: '1' };
    if (org) { try { var o = JSON.parse(org.textContent); if (!o.aggregateRating) { o.aggregateRating = agg; org.textContent = JSON.stringify(o); } } catch (e) {} org.id = 'rsr-schema'; return; }
    var ld = document.createElement('script'); ld.type = 'application/ld+json'; ld.id = 'rsr-schema';
    ld.textContent = JSON.stringify({ '@context': 'https://schema.org', '@type': 'LocalBusiness', name: 'Robotí Sekačky', url: 'https://www.robotisekacky.cz', aggregateRating: agg });
    document.head.appendChild(ld);
  }
  var ptries = 0;
  function waitPage() {
    if (page()) { schema(); markVotes(); new MutationObserver(markVotes).observe(document.getElementById('ratingWrapper').parentNode, { childList: true, subtree: true }); return; }
    if (++ptries < 75) setTimeout(waitPage, 200);
  }
  var isPage = location.pathname.indexOf('/hodnoceni-obchodu') === 0;
  fetch(DATA, { cache: 'no-cache' }).then(function (r) { return r.ok ? r.json() : null; }).then(function (d) { if (d && d.recenze && d.recenze.length >= 3) { data = d; if (isPage) waitPage(); wait(); } }).catch(function () {});
})();
