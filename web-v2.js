/* robotisekacky.cz – celoplošná vrstva vzhledu v2 (15. 10. 2026)
   Zdroj pravdy: Firma/nastroje/web/web-v2.js → repo Zirk0n/robotisekacky-widgety/web-v2.js (načítá se ze zápatí, pinovaný hash).
   Obsah: 1) horní kontaktní lišta  2) menu v našem vzhledu  3) produktové karty (všude)  4) kategorie: filtry
   (desktop rozbalené, mobil sbalené), posuvníky u číselných parametrů, vzhled  5) patička.
   Barvy: tmavě zelená #1b3f20, zelená #86BB41, rámeček #e6f0db, světlé pozadí #f2f7ec. */
(function () {
  if (window.__rsWeb2) return; window.__rsWeb2 = 1;
  var TEL = '+420792325839', TELT = '792 325 839', MAIL = 'info@robotisekacky.cz';
  var G = '#1b3f20', L = '#86BB41', LINE = '#e6f0db';
  var CSS = '' +
    /* --- 1) horní lišta --- */
    '.rs-topbar{background:' + G + ';color:#fff;font-size:13.5px;line-height:1.2}' +
    '.rs-topbar__in{max-width:1400px;margin:0 auto;padding:7px 20px;display:flex;align-items:center;justify-content:space-between;gap:16px}' +
    '.rs-topbar__claim{opacity:.9;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}' +
    '.rs-topbar__links{display:flex;align-items:center;gap:18px;flex-shrink:0}' +
    '.rs-topbar a{color:#fff!important;text-decoration:none!important;font-weight:600;display:inline-flex;align-items:center;gap:6px;white-space:nowrap}' +
    '.rs-topbar a:hover{color:' + L + '!important}' +
    '.rs-topbar svg{width:15px;height:15px;flex:0 0 15px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}' +
    '.rs-topbar .rs-topbar__kontakt{border:1px solid rgba(255,255,255,.45);border-radius:999px;padding:4px 12px}' +
    '@media(max-width:991px){.rs-topbar__claim{display:none}.rs-topbar__in{justify-content:center;padding:6px 12px}.rs-topbar__links{gap:14px}}' +
    '@media(max-width:420px){.rs-topbar{font-size:12.5px}.rs-topbar__links{gap:10px}.rs-topbar .rs-topbar__mail span{display:none}.rs-topbar .rs-topbar__kontakt{padding:3px 10px}}' +
    /* --- 2) menu --- */
    '#navigation .menu-level-1>li>a{border-radius:999px;transition:background .2s,color .2s}' +
    '#navigation .menu-level-1>li:hover>a,#navigation .menu-level-1>li>a:focus{color:' + G + '!important}' +
    '@media(min-width:992px){#navigation .menu-level-1>li>a{padding-left:12px!important;padding-right:12px!important}' +
    '#navigation .menu-level-1>li:hover>a{background:#eef6e6}' +
    '#navigation .menu-level-2,.menu-helper .menu-level-1{border:1px solid ' + LINE + '!important;border-radius:16px!important;box-shadow:0 18px 36px rgba(27,63,32,.14)!important;padding:8px!important;overflow:hidden;background:#fff!important;margin-top:4px}' +
    '#navigation .menu-level-2>li>a,.menu-helper .menu-level-1>li>a{border-radius:10px;padding:9px 12px!important;color:' + G + '!important;font-weight:600}' +
    '#navigation .menu-level-2>li>a:hover,.menu-helper .menu-level-1>li>a:hover{background:#eef6e6}}' +
    /* --- 3) produktové karty – stejné na homepage, v kategoriích i v doporučených --- */
    '.products-block .product{border:0!important;background:transparent!important;padding:8px!important}' +
    '.products-block .product .p{background:#fff!important;border:1px solid ' + LINE + '!important;border-radius:20px!important;overflow:hidden;box-shadow:0 8px 22px rgba(27,63,32,.06);transition:transform .2s,box-shadow .2s;height:100%}' +
    '.products-block .product .p:hover{transform:translateY(-4px);box-shadow:0 16px 34px rgba(27,63,32,.13)}' +
    '.products-block .product .image img{transition:transform .35s}.products-block .product .p:hover .image img{transform:scale(1.04)}' +
    '.products-block .product .name{color:' + G + '!important;font-weight:700!important}' +
    '.products-block .price-final strong{color:' + G + '!important;font-size:20px!important;font-weight:800!important}' +
    '.products-block .btn-cart,.products-block .p-tools .btn{background:' + G + '!important;border-color:' + G + '!important;color:#fff!important;border-radius:999px!important;text-transform:none!important;font-weight:700!important;letter-spacing:0!important}' +
    '.products-block .btn-cart:hover,.products-block .p-tools .btn:hover{background:' + L + '!important;border-color:' + L + '!important}' +
    '.products-block .p-tools .btn[href]{background:#fff!important;color:' + G + '!important;border:2px solid ' + G + '!important}' +
    '.products-block .flags .flag{border-radius:999px!important;padding:3px 10px!important;font-weight:700!important;font-size:11px!important;margin:0 0 4px!important;box-shadow:0 4px 10px rgba(0,0,0,.08)}' +
    '.products-block .flags .flag::before,.products-block .flags .flag::after{display:none!important}' +
    '.products-block .flags-default{left:12px!important;top:12px!important}' +
    '@media(max-width:767px){.products-block{margin-left:-4px!important;margin-right:-4px!important;width:auto!important}.products-block .product{padding:4px!important}.products-block .product .p{border-radius:16px!important}}' +
    /* --- 4) kategorie --- */
    '.type-category .category-title,.type-category h1{color:' + G + '!important;font-weight:800!important}' +
    '.type-category .rs-cat-intro h2,.type-category .category-perex h2,.type-category .category-perex h3{color:' + G + '!important}' +
    '.subcategories.with-image li a{background:#fff!important;border:1px solid ' + LINE + '!important;border-radius:16px!important;box-shadow:0 6px 16px rgba(27,63,32,.06);transition:transform .2s,box-shadow .2s;color:' + G + '!important;font-weight:700}' +
    '.subcategories.with-image li a:hover{transform:translateY(-3px);box-shadow:0 12px 26px rgba(27,63,32,.12);border-color:' + L + '!important}' +
    '#filters{background:#fff;border:1px solid ' + LINE + ';border-radius:20px;padding:6px 18px 12px;box-shadow:0 8px 22px rgba(27,63,32,.06)}' +
    '#filters h4,#filters h4 span{color:' + G + '!important;font-weight:800!important;font-size:15px!important;text-transform:none!important}' +
    '#filters .filter-section{border-color:' + LINE + '!important}' +
    '#filters input[type=checkbox]{accent-color:' + G + '}' +
    '#filters .filter-label{color:#2b3328}#filters .filter-count{color:#7a8a76;font-weight:600}' +
    '#filters .toggle-filters{color:' + G + '!important;font-weight:700}' +
    '.listSorting__controls{gap:6px;flex-wrap:wrap}.listSorting__control,.listSorting__controls button{border-radius:999px!important}' +
    '.listSorting__control--current,.listSorting__controls .active{background:' + G + '!important;color:#fff!important}' +
    '.pagination a,.pagination strong,.pagination span{border-radius:999px!important}.pagination .current,.pagination strong{background:' + G + '!important;color:#fff!important;border-color:' + G + '!important}' +
    /* posuvník číselných parametrů */
    '.rs-range{padding:4px 2px 8px}.rs-range__vals{display:flex;justify-content:space-between;font-weight:700;color:' + G + ';font-size:14px;margin:2px 0 10px}' +
    '.rs-range__box{position:relative;height:28px}' +
    '.rs-range__track{position:absolute;left:0;right:0;top:12px;height:5px;border-radius:5px;background:' + LINE + '}' +
    '.rs-range__fill{position:absolute;top:12px;height:5px;border-radius:5px;background:' + L + '}' +
    '.rs-range input[type=range]{position:absolute;left:0;top:0;width:100%;height:28px;margin:0;background:none;pointer-events:none;-webkit-appearance:none;appearance:none}' +
    '.rs-range input[type=range]::-webkit-slider-thumb{pointer-events:auto;-webkit-appearance:none;width:22px;height:22px;border-radius:50%;background:#fff;border:3px solid ' + G + ';box-shadow:0 3px 8px rgba(0,0,0,.18);cursor:pointer}' +
    '.rs-range input[type=range]::-moz-range-thumb{pointer-events:auto;width:18px;height:18px;border-radius:50%;background:#fff;border:3px solid ' + G + ';box-shadow:0 3px 8px rgba(0,0,0,.18);cursor:pointer}' +
    '.rs-range input[type=range]::-webkit-slider-runnable-track{background:none}.rs-range input[type=range]::-moz-range-track{background:none}' +
    '.rs-range__hint{font-size:12.5px;color:#6b7a67;margin-top:2px}.rs-range__reset{background:none;border:0;padding:0;color:' + G + ';text-decoration:underline;font-size:12.5px;cursor:pointer;margin-left:6px}' +
    '.rs-range-src{display:none!important}' +
    /* --- 5) patička --- */
    '#footer{background:' + G + '!important;color:#e9f1e3;border-radius:28px 28px 0 0;margin-top:40px;overflow:hidden}#footer .socials-block{display:none!important}' +
    '#footer .footer-rows{background:' + G + '!important;color:#e9f1e3!important}#footer .footer-rows::before{background:' + G + '!important}' +
    '#footer .footer-symbol{display:none!important}#footer .footer-rows,#footer .custom-footer,#footer .footer-bottom{background:transparent!important}' +
    '#footer .footer-rows{padding-top:44px!important;padding-bottom:20px!important}' +
    '#footer .custom-footer{row-gap:28px}' +
    '#footer .pageElement__heading,#footer .pageElement__heading span,#footer h3{color:#fff!important;font-size:16px!important;font-weight:800!important;text-transform:none!important;display:block!important;margin:0 0 12px!important}' +
    '#footer a{color:#e9f1e3!important;text-decoration:none!important}#footer a:hover{color:' + L + '!important}' +
    '#footer ul li{padding:3px 0!important}#footer ul li::before{color:' + L + '!important}' +
    '#footer .contact-box strong{color:#fff}' +
    '#footer .custom-footer__onlinePayments img{background:#fff;border-radius:10px;padding:6px 10px}' +
    '#footer .footer-bottom{border-top:1px solid rgba(255,255,255,.15);padding:14px 20px!important;color:#c9d8c2;font-size:13px}' +
    '#footer .footer-bottom a,#footer .footer-bottom strong{color:#c9d8c2!important}#footer #signature img{filter:grayscale(1) brightness(1.8);opacity:.7}' +
    '.rs-fsvc ul{list-style:none;margin:0;padding:0}.rs-fsvc li{padding:3px 0}' +
    '.rs-fcta{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}.rs-fcta a{display:inline-flex;align-items:center;gap:6px;border-radius:999px;padding:8px 14px;font-weight:700;font-size:14px}' +
    '#footer .rs-fcta .p{background:#fff;color:' + G + '!important}#footer .rs-fcta .p:hover{background:' + L + ';color:#fff!important}#footer .rs-fcta .s{border:1px solid rgba(255,255,255,.5)}' +
    '#filters .ui-slider-handle,#filters .noUi-handle{border-radius:50%!important;background:#fff!important;border:3px solid ' + G + '!important;box-shadow:0 3px 8px rgba(0,0,0,.18)!important}#filters .ui-slider-range,#filters .noUi-connect{background:' + L + '!important}' +
    '.rs-range-more{display:none!important}';

  var ICON = {
    tel: '<svg viewBox="0 0 24 24"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/></svg>',
    mail: '<svg viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/></svg>'
  };

  function css() { if (document.getElementById('rs-web2-css')) return; var s = document.createElement('style'); s.id = 'rs-web2-css'; s.textContent = CSS; document.head.appendChild(s); }

  function topbar() {
    var h = document.getElementById('header'); if (!h || document.querySelector('.rs-topbar')) return;
    var d = document.createElement('div'); d.className = 'rs-topbar'; d.setAttribute('role', 'region'); d.setAttribute('aria-label', 'Kontakt');
    d.innerHTML = '<div class="rs-topbar__in"><span class="rs-topbar__claim">Robotické sekačky, vysavače a bazénové vysavače – poradíme, nainstalujeme, zprovozníme</span>' +
      '<span class="rs-topbar__links"><a href="tel:' + TEL + '">' + ICON.tel + '<span>' + TELT + '</span></a>' +
      '<a class="rs-topbar__mail" href="mailto:' + MAIL + '" aria-label="E-mail ' + MAIL + '">' + ICON.mail + '<span>' + MAIL + '</span></a>' +
      '<a class="rs-topbar__kontakt" href="/kontakty/">Kontakty</a></span></div>';
    if (getComputedStyle(h).position === 'fixed') {
      /* mobil: hlavička je fixní → lišta pod ní */
      var pad = parseFloat(getComputedStyle(h.parentNode).paddingTop) || 0;
      d.style.marginTop = Math.max(0, h.offsetHeight - pad) + 'px';
      h.parentNode.insertBefore(d, h.nextSibling);
    } else h.parentNode.insertBefore(d, h);
  }

  /* filtry: na desktopu rozbalit, na mobilu nechat sbalené */
  function filtersOpen() {
    if (!window.matchMedia('(min-width: 992px)').matches) return;
    var b = document.querySelector('#filters .filter-section-button .toggle-filters');
    if (b && b.offsetParent !== null && !b.dataset.rsOpened) { b.dataset.rsOpened = 1; b.click(); }
  }

  /* posuvník pro parametr s číselnými hodnotami (≥ 4 hodnoty) */
  var NUM = /^\d+(?:[.,]\d+)?$/;
  function unitOf(title) { var m = title.match(/\sv\s(.+)$/); return m ? m[1].replace('m2', 'm²') : ''; }
  function fmt(n) { return String(n).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, ' '); }
  function sliders() {
    [].forEach.call(document.querySelectorAll('#filters .filter-section-parametric'), function (sec) {
      if (sec.querySelector('.rs-range')) return;
      var inputs = [].slice.call(sec.querySelectorAll('input[type=checkbox][data-filter-id]'));
      if (inputs.length < 4 || !inputs.every(function (i) { return NUM.test(i.value.trim()); })) return;
      var fid = inputs[0].getAttribute('data-filter-id'), code = inputs[0].getAttribute('data-filter-code') || 'pv';
      var items = inputs.map(function (i) {
        var m = (i.id || '').match(/(\d+)$/); return { v: parseFloat(i.value.replace(',', '.')), id: m ? m[1] : null, on: i.checked };
      }).filter(function (x) { return x.id; }).sort(function (a, b) { return a.v - b.v; });
      if (items.length < 4) return;
      var title = (sec.querySelector('h4 span') || sec.querySelector('h4') || {}).textContent || '';
      var unit = unitOf(title.trim());
      var on = items.map(function (x, k) { return x.on ? k : -1; }).filter(function (k) { return k >= 0; });
      var lo = on.length ? on[0] : 0, hi = on.length ? on[on.length - 1] : items.length - 1, max = items.length - 1;
      var fs = sec.querySelector('fieldset') || sec; fs.classList.add('rs-range-src');
      var box = document.createElement('div'); box.className = 'rs-range';
      box.innerHTML = '<div class="rs-range__vals"><span class="a"></span><span class="b"></span></div><div class="rs-range__box"><div class="rs-range__track"></div><div class="rs-range__fill"></div>' +
        '<input type="range" min="0" max="' + max + '" step="1" value="' + lo + '" aria-label="' + title + ' od"><input type="range" min="0" max="' + max + '" step="1" value="' + hi + '" aria-label="' + title + ' do"></div>' +
        '<div class="rs-range__hint">Posuňte jezdce' + (on.length ? '<button type="button" class="rs-range__reset">zrušit</button>' : '') + '</div>';
      fs.parentNode.insertBefore(box, fs);
      [].forEach.call(sec.querySelectorAll('a,button,span'), function (el) { if (!el.closest('.rs-range') && /Zobrazit všechny|Skrýt/.test(el.textContent) && el.children.length < 2) (el.closest('div:not(.filter-section)') || el).classList.add('rs-range-more'); });
      var r = box.querySelectorAll('input'), a = box.querySelector('.a'), bb = box.querySelector('.b'), fill = box.querySelector('.rs-range__fill');
      function draw() {
        var x = +r[0].value, y = +r[1].value; if (x > y) { var t = x; x = y; y = t; }
        a.textContent = fmt(items[x].v) + (unit ? ' ' + unit : ''); bb.textContent = fmt(items[y].v) + (unit ? ' ' + unit : '');
        fill.style.left = (x / max * 100) + '%'; fill.style.width = ((y - x) / max * 100) + '%'; return [x, y];
      }
      function go(ids) {
        var u = new URL(location.href); u.searchParams.delete(code + fid); u.searchParams.delete('page');
        if (ids) u.searchParams.set(code + fid, ids);
        location.href = u.toString().replace(/%2C/g, ',');
      }
      function apply() {
        var s = draw(); if (s[0] === 0 && s[1] === max) { if (on.length) go(null); return; }
        go(items.slice(s[0], s[1] + 1).map(function (x) { return x.id; }).join(','));
      }
      [].forEach.call(r, function (el) { el.addEventListener('input', draw); el.addEventListener('change', apply); });
      var rs = box.querySelector('.rs-range__reset'); if (rs) rs.addEventListener('click', function () { go(null); });
      draw();
    });
  }

  /* patička: sloupec Služby + rychlý kontakt */
  function footer() {
    var row = document.querySelector('#footer .custom-footer'); if (!row || row.querySelector('.rs-fsvc')) return;
    var col = document.createElement('div'); col.className = 'rs-fsvc col-sm-6 col-lg-4';
    col.innerHTML = '<h3 class="pageElement__heading"><span>Naše služby</span></h3><ul>' +
      '<li><a href="/instalace-sekacek/">Instalace robotických sekaček</a></li>' +
      '<li><a href="/zprovozneni-robotickeho-vysavace/">Zprovoznění robotického vysavače</a></li>' +
      '<li><a href="/predvedeni-bazenovych-vysavacu/">Předvedení bazénových vysavačů</a></li>' +
      '<li><a href="/zimni-servis-a-cisteni-robota/">Zimní servis a čištění robota</a></li></ul>' +
      '<div class="rs-fcta"><a class="p" href="tel:' + TEL + '">' + TELT + '</a><a class="s" href="/kontakty/">Kontakty</a></div>';
    var contact = row.querySelector('.custom-footer__contact');
    row.insertBefore(col, contact || null);
  }

  function run() { css(); topbar(); footer(); filtersOpen(); sliders(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run); else run();
  /* Shoptet po AJAXu filtrů přepisuje obsah → znovu */
  var mo = new MutationObserver(function () { clearTimeout(mo.t); mo.t = setTimeout(function () { filtersOpen(); sliders(); }, 120); });
  function watch() { var c = document.getElementById('content') || document.body; mo.observe(c, { childList: true, subtree: true }); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', watch); else watch();
})();
