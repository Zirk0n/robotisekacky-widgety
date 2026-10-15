/* robotisekacky.cz – homepage v2 (14. 10. 2026): prvky podle e-shopů klientů ESHOP BOOSTER.
   1) „S čím vám poradíme?“ – výběr robotického vysavače podle situace (před produkty, za recenzemi)
   2) „Služby, které jinde nedostanete“ – instalace sekaček, zprovoznění vysavačů, předvedení bazénových vysavačů, zimní servis
   3) „Naše realizace“ – skutečné fotky z instalací
   4) „Potřebujete poradit s výběrem?“ – Michael s fotkou, telefon a e-mail (nad patičkou)
   5) výhody jako karty
   Jen titulní strana (body.in-index). CSS je uvnitř (žádná závislost na cache dalšího souboru). Zdroj pravdy: Firma/nastroje/homepage/.
   Sezónně: blok 1 v jaru/létě přepnout na sekačky (pole SIT). Ceny služeb ověřit při změně ceníku (viz playbook bannery-a-homepage.md). */
(function () {
  if (!document.body || !document.body.classList.contains('in-index') || window.__rsHome2) return;
  window.__rsHome2 = 1;
  var U = 'https://cdn.myshoptet.com/usr/www.robotisekacky.cz/user/documents/upload/';
  var TEL = '+420792325839', TELT = '792 325 839', MAIL = 'info@robotisekacky.cz';
  var SIT = [
    ['🐕', 'Máme psa nebo kočku', 'Chlupy se nejvíc namotávají na štětinové kartáče – hledejte <b>gumové válce</b> nebo kartáč proti namotávání. Kamera a <b>rozpoznávání překážek</b> pomůže objet misky, kabely i nehodu na podlaze. A protože chlupy plní nádobku rychle, vyplatí se <b>stanice s automatickým vysypáváním</b>.'],
    ['🧽', 'Chci, aby i vytíral', 'Na skutečné vytírání jsou nejlepší <b>rotační mopy nebo mycí válec</b> s přítlakem. Rozhoduje i stanice: když mopy <b>sama pere a suší</b>, nebudou zapáchat. Máte koberce? Hledejte <b>zvedání mopů</b>, aby zůstaly suché.'],
    ['🗑️', 'Nechci nic vysypávat', 'Zvolte robota se <b>stanicí s automatickým vysypáváním</b> – prach jde do sáčku, který obvykle vydrží několik týdnů. Plně automatická stanice navíc <b>doplňuje vodu a pere mopy</b>, takže na robota sáhnete jen výjimečně.'],
    ['🛋️', 'Hodně nábytku a nízké postele', 'Rozhoduje <b>výška robota</b> – pod gauč nebo postel s mezerou kolem 10 cm se vejde jen nižší model. Věžička LiDARu robota zvyšuje, některé modely ji mají <b>zapuštěnou nebo výsuvnou</b>. Změřte si mezeru a poradíme.'],
    ['🏠', 'Velký byt nebo dům s patrem', 'U větších ploch se vyplatí <b>přesná navigace LiDAR</b>, ukládání <b>více map</b> (každé patro zvlášť) a větší baterie. Robot schody nevyjede – na patro ho přenesete, nebo zvolíte druhého robota.'],
    ['🎁', 'Kupuji rodičům', 'Nejvíc pomůže <b>plně automatická stanice</b> – rodiče pak robota skoro neřeší. A aby se nemuseli trápit s aplikací, <a href="/zprovozneni-robotickeho-vysavace/">zprovozníme ho přímo u nich doma</a>: Wi-Fi, mapa, plán úklidu i vysvětlení v klidu.']
  ];
  var SVC = [
    [U + 'Instalace%20-%20widget/IMG_5724.jpg', 'Instalace robotické sekačky', 'Projedeme s robotem zahradu, nastavíme hranice, zakázané zóny i plán sekání a všechno vysvětlíme. Po celé ČR.', 'od 7 999 Kč', '/instalace-sekacek/'],
    [U + 'Instalace%20-%20widget/Robotick%C3%A9%20vysava%C4%8De/574383985_10161740614830318_6422739092694342679_n%20ve%20st%C5%99edn%C3%AD%20velikosti.jpg', 'Zprovoznění vysavače doma', 'Připojíme robota k Wi-Fi, vytvoříme mapu a plán úklidu a v klidu vás zaučíme. Praha a Středočeský kraj bez příplatku.', 'od 3 490 Kč', '/zprovozneni-robotickeho-vysavace/'],
    [U + 'Instalace%20-%20widget/baz%C3%A9nov%C3%A9%20vysava%C4%8De/predvedeni-aiper-scuba-v3-u-vas-doma.jpg', 'Předvedení na vašem bazénu', 'Vybrané bazénové vysavače vyzkoušíte přímo ve svém bazénu ještě před nákupem. Bez závazku ke koupi.', 'od 3 490 Kč', '/predvedeni-bazenovych-vysavacu/'],
    [U + 'Instalace%20-%20widget/IMG_7219.jpg', 'Zimní a předsezónní servis', 'Vyčistíme a zkontrolujeme robota před zimou nebo před sezónou, aby na jaře rovnou vyjel.', '2 500 Kč', '/zimni-servis-a-cisteni-robota/']
  ];
  var REAL = [
    [U + 'Instalace%20-%20widget/IMG_5724.jpg', 'Mammotion LUBA 2', 'Kladno'],
    [U + 'Instalace%20-%20widget/IMG_4644.jpg', 'Gardena', 'Kolovraty'],
    [U + 'Instalace%20-%20widget/Robotick%C3%A9%20vysava%C4%8De/Dreame%20roller%20ve%20st%C5%99edn%C3%AD%20velikosti.jpg', 'Dreame – zprovoznění', 'u zákazníka doma'],
    [U + 'Instalace%20-%20widget/baz%C3%A9nov%C3%A9%20vysava%C4%8De/Aiper-Scuba-S1%20Teplice.jpg', 'Aiper Scuba S1', 'Teplice'],
    [U + 'Instalace%20-%20widget/IMG_1285.jpg', 'Husqvarna', 'Liberec'],
    [U + 'Instalace%20-%20widget/Robotick%C3%A9%20vysava%C4%8De/ecovacs%20ve%20st%C5%99edn%C3%AD%20velikosti.jpg', 'Ecovacs – zprovoznění', 'u zákazníka doma'],
    [U + 'Instalace%20-%20widget/baz%C3%A9nov%C3%A9%20vysava%C4%8De/Spino%20E1%20Praha%20ve%20st%C5%99edn%C3%AD%20velikosti.jpg', 'Mammotion Spino E1', 'Praha'],
    [U + 'Instalace%20-%20widget/IMG_8330.jpg', 'AMA', 'Tábor']
  ];
  var FOTO = U + 'Instalace%20-%20widget/baz%C3%A9nov%C3%A9%20vysava%C4%8De/michael-bohacek-profil-2026.jpg';
  var CSS = '' +
    '.rsh{max-width:1180px;margin:0 auto;padding:30px 16px;font-family:inherit}' +
    '.rsh h2{margin:0 0 6px!important;text-align:center;font-size:30px!important;line-height:1.2;font-weight:800;color:#1b3f20}' +
    '.rsh .rsh-sub{text-align:center;color:#4d4d4f;margin:0 auto 20px!important;max-width:720px}' +
    /* výběr podle situace */
    '.rsv-g{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:12px}' +
    '.rsv-t{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;min-height:118px;padding:14px 10px;border-radius:18px;border:1px solid #e6f0db;background:#fff;box-shadow:0 8px 20px rgba(27,63,32,.07);cursor:pointer;font:inherit;color:#1b3f20;font-weight:700;font-size:15px;line-height:1.25;text-align:center;transition:transform .2s,box-shadow .2s,border-color .2s}' +
    '.rsv-t:hover{transform:translateY(-3px);box-shadow:0 14px 28px rgba(27,63,32,.12)}' +
    '.rsv-t[aria-expanded="true"]{border-color:#86BB41;background:#f4f9ef;box-shadow:0 0 0 2px rgba(134,187,65,.35)}.rsv-t .e{font-size:30px;line-height:1}' +
    '.rsv-p{margin-top:14px;padding:18px 22px;border-radius:18px;background:linear-gradient(160deg,#fff 0,#f4f9ef 100%);border:1px solid #e3eed8;display:none}' +
    '.rsv-p.on{display:block}.rsv-p h3{margin:0 0 6px!important;font-size:20px!important;color:#1b3f20}' +
    '.rsv-p p{margin:0 0 12px!important;color:#2b3328;font-size:16px;line-height:1.6}.rsv-p a{color:#1b3f20;font-weight:700}' +
    '.rsh-cta{display:flex;flex-wrap:wrap;gap:10px}.rsh-cta a{display:inline-flex;align-items:center;padding:10px 18px;border-radius:999px;text-decoration:none!important;font-weight:700}' +
    '.rsh-cta .pri{background:#1b3f20;color:#fff!important}.rsh-cta .pri:hover{background:#86BB41}.rsh-cta .sec{border:2px solid #1b3f20;color:#1b3f20!important;background:#fff}' +
    /* služby */
    '.rss-g{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px}' +
    '.rss-c{display:flex;flex-direction:column;border-radius:20px;overflow:hidden;background:#fff;border:1px solid #e6f0db;box-shadow:0 10px 24px rgba(27,63,32,.08);text-decoration:none!important;color:inherit!important;transition:transform .2s,box-shadow .2s}' +
    '.rss-c:hover{transform:translateY(-4px);box-shadow:0 16px 32px rgba(27,63,32,.14)}' +
    '.rss-c img{width:100%;aspect-ratio:4/3;object-fit:cover;display:block}' +
    '.rss-b{padding:16px 18px 18px;display:flex;flex-direction:column;gap:8px;flex:1}' +
    '.rss-b b{font-size:18px;color:#1b3f20;line-height:1.25}.rss-b span{color:#3d4a3d;font-size:15px;line-height:1.5;flex:1}' +
    '.rss-pr{display:flex;justify-content:space-between;align-items:center;margin-top:4px;font-weight:800;color:#1b3f20}.rss-pr i{font-style:normal;color:#4f8a2a}' +
    /* realizace */
    '.rsr2-g{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}' +
    '.rsr2-f{position:relative;margin:0;border-radius:16px;overflow:hidden;aspect-ratio:4/3;background:#eef6e6}' +
    '.rsr2-f img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .4s}.rsr2-f:hover img{transform:scale(1.05)}' +
    '.rsr2-f figcaption{position:absolute;left:10px;bottom:10px;padding:6px 12px;border-radius:999px;background:rgba(255,255,255,.88);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);font-size:13px;color:#1b3f20;font-weight:700;line-height:1.2}' +
    '.rsr2-f figcaption small{display:block;font-weight:500;color:#5a6b56}' +
    '.rsr2-more{text-align:center;margin-top:16px}.rsr2-more a{color:#1b3f20;font-weight:700}' +
    /* majitel */
    '.rso{padding:28px 16px;background:linear-gradient(180deg,#f7faf5,#eef6e6);border-top:1px solid #e6f0db}' +
    '.rso-in{max-width:1080px;margin:0 auto;display:flex;align-items:center;gap:24px;flex-wrap:wrap;background:#fff;border:1px solid #e6f0db;border-radius:20px;padding:20px 24px;box-shadow:0 14px 30px rgba(27,63,32,.08)}' +
    '.rso-in img{width:104px;height:104px;border-radius:50%;object-fit:cover;flex:0 0 104px;border:3px solid #86BB41}' +
    '.rso-t{flex:1 1 320px;min-width:0}.rso-t p{margin:0!important}.rso-h{font-size:22px;font-weight:800;color:#1b3f20;line-height:1.25;margin-bottom:4px!important}' +
    '.rso-p{color:#33402f;font-size:16px;line-height:1.5;margin-bottom:6px!important}.rso-n{color:#5a6b56;font-size:14px}' +
    '.rso-c{display:flex;flex-direction:column;gap:8px}.rso-c a{display:inline-flex;justify-content:center;padding:12px 20px;border-radius:999px;font-weight:700;text-decoration:none!important;white-space:nowrap}' +
    '.rso-c .pri{background:#1b3f20;color:#fff!important}.rso-c .pri:hover{background:#86BB41}.rso-c .sec{border:2px solid #1b3f20;color:#1b3f20!important;background:#fff}' +
    /* výhody jako karty */
    '.in-index .benefitBanner{display:grid!important;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:14px!important}.in-index .benefitBanner__item{width:auto!important;max-width:none!important;margin:0!important}' +
    '@media(max-width:560px){.in-index .benefitBanner{display:grid!important;grid-template-columns:1fr!important;gap:8px!important;overflow:visible!important;padding:0!important}.in-index .benefitBanner__item{display:flex!important;align-items:center;gap:12px;padding:12px 14px!important;border-radius:14px!important}.in-index .benefitBanner__item:hover{transform:none}.in-index .benefitBanner__link{display:flex!important;align-items:center!important;gap:14px!important;width:100%}.in-index .benefitBanner__picture,.in-index .benefitBanner__item img{flex:0 0 42px!important;width:42px!important;max-width:42px!important;height:auto!important;margin:0!important}.in-index .benefitBanner__content{padding:0!important;margin:0!important;text-align:left!important}.in-index .benefitBanner__title{font-size:15px!important;line-height:1.25!important;margin:0 0 2px!important}.in-index .benefitBanner__data,.in-index .benefitBanner__data p{font-size:13.5px!important;line-height:1.4!important;margin:0!important}}' +
    '.in-index .benefitBanner__item{background:#fff;border:1px solid #e6f0db;border-radius:18px;box-shadow:0 8px 20px rgba(27,63,32,.06);padding:16px!important;transition:transform .2s,box-shadow .2s}' +
    '.in-index .benefitBanner__item:hover{transform:translateY(-3px);box-shadow:0 14px 28px rgba(27,63,32,.11)}' +
    '.in-index .benefitBanner__title{color:#1b3f20!important}' +
    '@media(max-width:991px){.rsv-g{grid-template-columns:repeat(3,minmax(0,1fr))}.rss-g{grid-template-columns:repeat(2,minmax(0,1fr))}.rsr2-g{grid-template-columns:repeat(2,minmax(0,1fr))}}' +
    '@media(max-width:560px){.rsh h2{font-size:24px!important}.rsv-g{grid-template-columns:repeat(2,minmax(0,1fr))}.rsv-t{min-height:96px;font-size:14px}' +
    '.rss-g{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;gap:12px;padding-bottom:6px;scrollbar-width:none}.rss-g::-webkit-scrollbar{display:none}.rss-c{flex:0 0 82%;scroll-snap-align:start}' +
    '.rsr2-g{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none}.rsr2-g::-webkit-scrollbar{display:none}.rsr2-f{flex:0 0 78%;scroll-snap-align:start}' +
    '.rso-in{flex-direction:column;text-align:center;padding:18px}.rso-c{width:100%}}';
  /* ===== jednotný design homepage (15. 10. 2026) – stejný jazyk jako šablony v2 ===== */
  CSS += '' +
    '.in-index .homepage-group-title{color:#1b3f20!important;font-size:30px!important;font-weight:800!important;text-align:center!important;margin:38px 0 20px!important;line-height:1.2}' +
    '.in-index .next-to-carousel-banners .banner-wrapper a{display:block;position:relative;border-radius:20px;overflow:hidden;border:1px solid rgba(255,255,255,.6);box-shadow:0 18px 36px rgba(0,0,0,.14),0 3px 8px rgba(0,0,0,.06);transition:transform .25s,box-shadow .25s}' +
    '.in-index .next-to-carousel-banners .banner-wrapper a::after{content:"";position:absolute;inset:0;border-radius:inherit;pointer-events:none;box-shadow:inset 0 1px 0 rgba(255,255,255,.6),inset 0 0 0 1px rgba(255,255,255,.18);background:linear-gradient(155deg,rgba(255,255,255,.24) 0,rgba(255,255,255,.06) 30%,rgba(255,255,255,0) 48%)}' +
    '.in-index .next-to-carousel-banners .banner-wrapper a:hover{transform:translateY(-4px);box-shadow:0 24px 44px rgba(0,0,0,.18),0 4px 10px rgba(0,0,0,.07)}' +
    '.in-index .next-to-carousel-banners .banner-wrapper img{display:block;width:100%;height:auto}' +
    '.in-index .products-block .product{border:0!important;background:transparent!important;padding:8px!important}' +
    '.in-index .products-block .product .p{background:#fff!important;border:1px solid #e6f0db!important;border-radius:20px!important;overflow:hidden;box-shadow:0 8px 22px rgba(27,63,32,.06);transition:transform .2s,box-shadow .2s;height:100%}' +
    '.in-index .products-block .product .p:hover{transform:translateY(-4px);box-shadow:0 16px 34px rgba(27,63,32,.13)}' +
    '.in-index .products-block .product .image img{transition:transform .35s}.in-index .products-block .product .p:hover .image img{transform:scale(1.04)}' +
    '.in-index .products-block .product .name{color:#1b3f20!important;font-weight:700!important}.in-index .products-block .product .name span{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}' +
    '.in-index .products-block .price-final strong{color:#1b3f20!important;font-size:20px!important;font-weight:800!important}' +
    '.in-index .products-block .btn-cart,.in-index .products-block .p-tools .btn{background:#1b3f20!important;border-color:#1b3f20!important;color:#fff!important;border-radius:999px!important;text-transform:none!important;font-weight:700!important;letter-spacing:0!important}' +
    '.in-index .products-block .btn-cart:hover,.in-index .products-block .p-tools .btn:hover{background:#86BB41!important;border-color:#86BB41!important}' +
    '.in-index .products-block .p-tools .btn[href]{background:#fff!important;color:#1b3f20!important;border:2px solid #1b3f20!important}' +
    '.in-index .products-block .flags .flag{border-radius:999px!important;padding:3px 10px!important;font-weight:700!important;font-size:11px!important;margin:0 0 4px!important;box-shadow:0 4px 10px rgba(0,0,0,.08)}' +
    '.in-index .products-block .flags .flag::before,.in-index .products-block .flags .flag::after{display:none!important}' +
    '.in-index .products-block .flags-default{left:12px!important;top:12px!important}' +
    '.in-index .welcome-wrapper{background:#f2f7ec!important;box-shadow:0 0 0 100vmax #f2f7ec!important;clip-path:inset(0 -100vmax)!important;color:#2b3328!important;padding:40px 0!important;margin:34px 0!important}' +
    '.in-index .welcome-wrapper .welcome{max-width:1080px;margin:0 auto!important;background:#fff;border:1px solid #e6f0db;border-radius:22px;padding:28px 32px!important;box-shadow:0 14px 30px rgba(27,63,32,.08)}' +
    '.in-index .welcome-wrapper .welcome,.in-index .welcome-wrapper .welcome p{color:#2b3328!important;font-size:16px;line-height:1.65}' +
    '.in-index .welcome-wrapper h1,.in-index .welcome-wrapper .h1,.in-index .welcome-wrapper h2,.in-index .welcome-wrapper h3{color:#1b3f20!important;font-size:26px!important;font-weight:800!important;line-height:1.25;margin:0 0 14px!important;text-align:left}' +
    '.in-index .welcome-wrapper a{color:#1b3f20!important;font-weight:700!important;text-decoration:underline!important;text-decoration-color:#86BB41!important;text-decoration-thickness:2px!important;text-underline-offset:3px}' +
    '.in-index .welcome-wrapper a:hover{color:#4f8a2a!important}' +
    '.in-index .homepage-blog-wrapper .news-item{padding:8px!important}' +
    '.in-index .homepage-blog-wrapper .news-item>a{display:flex;flex-direction:column;height:100%;background:#fff;border:1px solid #e6f0db;border-radius:20px;overflow:hidden;box-shadow:0 8px 22px rgba(27,63,32,.06);text-decoration:none!important;transition:transform .2s,box-shadow .2s}' +
    '.in-index .homepage-blog-wrapper .news-item>a:hover{transform:translateY(-4px);box-shadow:0 16px 34px rgba(27,63,32,.13)}' +
    '.in-index .homepage-blog-wrapper .news-item .image{margin:0!important}.in-index .homepage-blog-wrapper .news-item .image img{width:100%;aspect-ratio:16/10;object-fit:cover;display:block}' +
    '.in-index .homepage-blog-wrapper .news-item .text{padding:14px 18px 18px!important}' +
    '.in-index .homepage-blog-wrapper .news-item .title{color:#1b3f20!important;font-weight:800!important;font-size:18px!important;line-height:1.3}' +
    '.in-index .homepage-blog-wrapper .news-item .description{color:#3d4a3d!important;font-size:14.5px!important;line-height:1.55!important}' +
    '.in-index .homepage-blog-wrapper .news-item .read-article{color:#4f8a2a!important;font-weight:700!important}' +
    '.in-index #hodnoceniobchodu h2,.in-index #hodnoceniobchodu h3,.in-index #hodnoceniobchodu .h2,.in-index #hodnoceniobchodu .h3{color:#1b3f20!important}' +
    '@media(max-width:767px){.in-index .products-block{margin-left:-4px!important;margin-right:-4px!important;width:auto!important}.in-index .products-block .product{padding:4px!important}.in-index .products-block .product .p{border-radius:16px!important}}' +
    '@media(max-width:560px){.in-index .homepage-group-title{font-size:24px!important;margin:28px 0 14px!important}.in-index .welcome-wrapper .welcome{padding:20px!important}.in-index .welcome-wrapper .h1,.in-index .welcome-wrapper h1,.in-index .welcome-wrapper h2{font-size:21px!important}}';
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html) e.innerHTML = html; return e; }
  function situace() {
    var sec = el('section', 'rsh rsv', '<h2>S čím vám poradíme?</h2><p class="rsh-sub">Vyberte, co u vás doma řešíte – řekneme, na co se při výběru robotického vysavače dívat.</p>' +
      '<div class="rsv-g">' + SIT.map(function (s, i) { return '<button type="button" class="rsv-t" aria-expanded="false" aria-controls="rsv-p" data-i="' + i + '"><span class="e" aria-hidden="true">' + s[0] + '</span>' + s[1] + '</button>'; }).join('') +
      '</div><div class="rsv-p" id="rsv-p" role="region" aria-live="polite"></div>');
    sec.setAttribute('aria-label', 'Výběr robotického vysavače podle situace');
    var panel = sec.querySelector('.rsv-p');
    sec.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('.rsv-t'); if (!b) return;
      var open = b.getAttribute('aria-expanded') === 'true';
      [].forEach.call(sec.querySelectorAll('.rsv-t'), function (x) { x.setAttribute('aria-expanded', 'false'); });
      if (open) { panel.classList.remove('on'); return; }
      var s = SIT[+b.getAttribute('data-i')]; b.setAttribute('aria-expanded', 'true');
      panel.innerHTML = '<h3>' + s[0] + ' ' + s[1] + '</h3><p>' + s[2] + '</p><div class="rsh-cta"><a class="pri" href="tel:' + TEL + '">📞 Poradit konkrétní model – ' + TELT + '</a>' +
        '<a class="sec" href="mailto:' + MAIL + '?subject=' + encodeURIComponent('Výběr robotického vysavače – ' + s[1]) + '">✉️ Napsat e-mail</a><a class="sec" href="/roboticke-vysavace/">Prohlédnout robotické vysavače →</a></div>';
      panel.classList.add('on');
      if (window.innerWidth < 760) panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
    return sec;
  }
  function sluzby() {
    return el('section', 'rsh rss', '<h2>Služby, které u velkých obchodů nedostanete</h2><p class="rsh-sub">Robota vám nejen prodáme – přijedeme, nastavíme ho a postaráme se o něj i po nákupu.</p><div class="rss-g">' +
      SVC.map(function (s) { return '<a class="rss-c" href="' + s[4] + '"><img src="' + s[0] + '" alt="' + s[1] + '" loading="lazy"><span class="rss-b"><b>' + s[1] + '</b><span>' + s[2] + '</span><span class="rss-pr">' + s[3] + '<i>Více →</i></span></span></a>'; }).join('') + '</div>');
  }
  function realizace() {
    return el('section', 'rsh rsr2', '<h2>Naše realizace</h2><p class="rsh-sub">Skutečné zahrady, byty a bazény našich zákazníků po celé České republice.</p><div class="rsr2-g">' +
      REAL.map(function (r) { return '<figure class="rsr2-f"><img src="' + r[0] + '" alt="' + r[1] + ' – ' + r[2] + '" loading="lazy"><figcaption>' + r[1] + '<small>' + r[2] + '</small></figcaption></figure>'; }).join('') +
      '</div><p class="rsr2-more"><a href="/instalace-sekacek/">Více o instalacích a servisu →</a></p>');
  }
  function majitel() {
    return el('section', 'rso', '<div class="rso-in"><img src="' + FOTO + '" alt="Michael Boháček, majitel Robotí Sekačky" loading="lazy" width="104" height="104">' +
      '<div class="rso-t"><p class="rso-h">Potřebujete poradit s výběrem?</p><p class="rso-p">Zavolejte mi nebo napište. Poradím vám podle vaší domácnosti, zahrady nebo bazénu.</p><p class="rso-n"><strong>Michael Boháček</strong> · majitel Robotisekacky.cz</p></div>' +
      '<div class="rso-c"><a class="pri" href="tel:' + TEL + '">📞 ' + TELT + '</a><a class="sec" href="mailto:' + MAIL + '">✉️ ' + MAIL + '</a></div></div>');
  }
  function build() {
    var host = document.querySelector('.index-content-wrapper');
    if (!host || document.querySelector('.rsv')) return;
    var st = document.createElement('style'); st.id = 'rsh-css'; st.textContent = CSS; document.head.appendChild(st);
    host.insertBefore(situace(), host.firstChild);
    var blog = host.querySelector('.homepage-blog-wrapper');
    var s = sluzby(), r = realizace();
    if (blog) { host.insertBefore(s, blog); host.insertBefore(r, blog); } else { host.appendChild(s); host.appendChild(r); }
    var foot = document.getElementById('footer');
    if (foot && !document.querySelector('.rso')) foot.parentNode.insertBefore(majitel(), foot);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build); else build();
})();
