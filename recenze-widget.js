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
    '@media (max-width:640px){.rsr__wrap{padding:0}.rsr__track{padding:8px 16px 22px;margin:0;scroll-padding:0 16px}.rsr__h{font-size:24px!important}.rsr__card{flex-basis:84%}.rsr__arrow{display:none}}';
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function render(box, d) {
    if (!d || !d.recenze || d.recenze.length < 3) return;
    box.setAttribute('data-rsr', '1');
    if (!document.getElementById('rsr-css')) { var st = document.createElement('style'); st.id = 'rsr-css'; st.textContent = CSS; document.head.appendChild(st); }
    var prumer = String(d.prumer || '5.0').replace('.', ',');
    var cards = d.recenze.map(function (r) {
      var ini = r.jmeno.split(' ').map(function (p) { return p[0]; }).join('').slice(0, 2).toUpperCase();
      return '<article class="rsr__card"><span class="rsr__stars" aria-label="5 z 5 hvězdiček">★★★★★</span>' +
        '<p class="rsr__q">' + esc(r.text) + '</p>' +
        '<div class="rsr__meta"><span class="rsr__ini" aria-hidden="true">' + esc(ini) + '</span><span><b>' + esc(r.jmeno) + '</b> · ' + esc(r.datum) + '</span></div></article>';
    }).join('');
    box.innerHTML = '<section class="rsr" aria-label="Hodnocení zákazníků">' +
      '<div class="rsr__head"><h2 class="rsr__h">Co o nás píšou zákazníci</h2>' +
      '<a class="rsr__score" href="/hodnoceni-obchodu/"><img src="https://cdn.myshoptet.com/usr/www.robotisekacky.cz/user/banners/logo-overeno--gold.svg?69c559fe" alt="Ověřeno zákazníky – Heureka" width="72" height="72"><span class="rsr__num">' + prumer + '</span><span class="rsr__meta2"><span class="rsr__big">★★★★★</span><span><b>' + esc(d.celkem) + ' ověřených hodnocení</b> · Ověřeno zákazníky Heureka</span></span></a></div>' +
      '<div class="rsr__wrap"><button class="rsr__arrow rsr__arrow--l" type="button" aria-label="Předchozí">❮</button>' +
      '<div class="rsr__track">' + cards + '</div>' +
      '<button class="rsr__arrow rsr__arrow--r" type="button" aria-label="Další">❯</button></div>' +
      '<div class="rsr__foot"><a class="rsr__btn" href="/hodnoceni-obchodu/">Přečíst všechna hodnocení (' + esc(d.celkem) + ')</a></div></section>';
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
  fetch(DATA, { cache: 'no-cache' }).then(function (r) { return r.ok ? r.json() : null; }).then(function (d) { if (d && d.recenze && d.recenze.length >= 3) { data = d; wait(); } }).catch(function () {});
})();
