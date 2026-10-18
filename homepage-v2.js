/* robotisekacky.cz – homepage v2 (14. 10. 2026): prvky podle e-shopů klientů ESHOP BOOSTER.
   1) „S čím vám poradíme?“ – výběr robotického vysavače podle situace (před produkty, za recenzemi)
   2) „Služby, které jinde nedostanete“ – instalace sekaček, zprovoznění vysavačů, předvedení bazénových vysavačů, zimní servis
   3) „Naše realizace“ – skutečné fotky z instalací
   4) „Potřebujete poradit s výběrem?“ – Michael s fotkou, telefon a e-mail (nad patičkou)
   5) výhody jako karty
   Jen titulní strana (body.in-index). CSS je uvnitř (žádná závislost na cache dalšího souboru). Zdroj pravdy: Firma/nastroje/homepage/.
   Výběr podle situace má 3 záložky (vysavač/sekačka/bazén) s odkazy do filtrů; výchozí záložka se řídí měsícem (3–8 sekačka, jinak vysavač). Ceny služeb ověřit při změně ceníku (viz playbook bannery-a-homepage.md). */
(function () {
  if (!document.body || !document.body.classList.contains('in-index') || window.__rsHome2) return;
  window.__rsHome2 = 1;
  var U = 'https://cdn.myshoptet.com/usr/www.robotisekacky.cz/user/documents/upload/';
  var TEL = '+420792325839', TELT = '792 325 839', MAIL = 'info@robotisekacky.cz';
  /* Výběr podle situace – 3 záložky. Odkazy vedou rovnou do vyfiltrované kategorie (pv<id parametru>=<id hodnot>).
     ID parametrů a hodnot: playbook bannery-a-homepage.md, sekce „Výběr podle situace“. Při změně hodnot filtrů ověřit. */
  var SIT = {
    vysavac: { label: 'Robotický vysavač', base: '/roboticke-vysavace/', items: [
      ['🐕', 'Máme psa nebo kočku', 'Chlupy se nejvíc namotávají na štětinové kartáče – hledejte <b>gumové válce</b> nebo kartáč proti namotávání. <b>Kamera s rozpoznáváním překážek</b> objede misky, kabely i nehodu na podlaze.', '?pv186=636', 'Vysavače s kamerou'],
      ['🧽', 'Chci, aby i vytíral', 'Na skutečné vytírání jsou nejlepší <b>rotační mopy nebo mycí válec</b>. Když je stanice <b>sama pere</b>, nezapáchají, a <b>zvedání mopů</b> ochrání koberce.', '?pv201=516&pv228=459', 'Vysavače s praním a zvedáním mopů'],
      ['🗑️', 'Nechci nic vysypávat', 'Zvolte robota se <b>stanicí s automatickým vysypáváním</b> – prach jde do sáčku, který obvykle vydrží několik týdnů.', '?pv180=465', 'Vysavače s vysypávací stanicí'],
      ['🛋️', 'Hodně nábytku a nízké postele', 'Rozhoduje <b>výška robota</b>. Změřte mezeru pod gaučem a postelí – níže najdete roboty do 9,5 cm, některé mají <b>výsuvný LiDAR</b>.', '?pv195=2643,2769,612,2563,2658', 'Vysavače do výšky 9,5 cm'],
      ['🏠', 'Velký byt nebo dům s patrem', 'U větších ploch se vyplatí <b>navigace LiDAR</b>, ukládání více map a plně automatická stanice. Schody robot nevyjede – na patro ho přenesete.', '?pv183=468&pv228=459', 'Vysavače s LiDARem a samočisticí stanicí'],
      ['🎁', 'Kupuji rodičům', 'Nejvíc pomůže <b>plně automatická stanice</b> – rodiče pak robota skoro neřeší. A <a href="/zprovozneni-robotickeho-vysavace/">zprovozníme ho přímo u nich doma</a>.', '?pv228=459&pv180=465', 'Plně automatické vysavače']
    ] },
    sekacka: { label: 'Robotická sekačka', base: '/roboticke-bezdratove-sekacky/', items: [
      ['⛰️', 'Zahrada ve svahu', 'Do prudšího svahu patří <b>čtyřkolky (AWD)</b> – zvládají obvykle <b>65 % (33°) a víc</b>. Deklarovaný svah je maximum za sucha, na mokré trávě si nechte rezervu. Pro představu: 45 % = 24°, 65 % = 33°, 80 % = 38°.', '?pv40=663,672,730,2264,2258', 'Čtyřkolky do svahu od 65 % (33°)'],
      ['🌳', 'Hodně stromů a vysoké budovy', 'Stromy a domy ruší signál GPS/RTK. Spolehlivější jsou sekačky s <b>LiDARem</b>, které se orientují podle okolí a signál z oblohy nepotřebují.', '?pv34=2245,2136', 'Sekačky s LiDARem a kamerou'],
      ['📐', 'Velká zahrada', 'Maximální plocha výrobce je strop, ne doporučení. Vybírejte s <b>rezervou</b> a počítejte s členitostí, průjezdy a nabíjením.', '?pv28=124,2148,2163,2252,136,2166,2169', 'Sekačky na 1 500 m² a víc'],
      ['🌱', 'Menší zahrada', 'Na menší zahradu nepotřebujete nejvýkonnější model. Důležitější je přesná navigace u záhonů a <b>dosekávání k okrajům</b>.', '?pv28=2142,154,2181,2130,2178', 'Sekačky na zahrady do 1 000 m²'],
      ['🧩', 'Více ploch a úzké průjezdy', 'Oddělené části zahrady, chodníky a úzké průchody vyřešíme při <a href="/instalace-sekacek/">instalaci</a> – nastavíme zóny i trasy mezi nimi.', '', 'Bezdrátové sekačky'],
      ['🎄', 'Sekačka jako dárek', 'Sekačku můžete vybrat a koupit teď, <b>instalaci domluvíme na jaro</b>, až začne sezóna. Nebo darujte <a href="/darkove-poukazy/">dárkový poukaz</a>.', '', 'Bezdrátové sekačky']
    ] },
    bazen: { label: 'Bazénový vysavač', base: '/bazenove-vysavace/', items: [
      ['🏊', 'Zapuštěný bazén', 'U zapuštěného bazénu se vyplatí robot, který vyjede <b>stěny až k vodní lince</b> – tam se drží nejvíc nečistot.', '?pv913=2338', 'Vysavače do zapuštěného bazénu'],
      ['⭕', 'Nadzemní bazén', 'Do nadzemního bazénu stačí lehčí robot. Hlídejte <b>tvar a povrch</b> bazénu a způsob vyjmutí z vody.', '?pv913=2347', 'Vysavače do nadzemního bazénu'],
      ['🧱', 'Stěny i vodní linka', 'Pokud vás trápí okraj u hladiny, vybírejte robota, který <b>čistí vodní linku</b>, ne jen dno.', '?pv346=991', 'Vysavače s čištěním vodní linky'],
      ['🍂', 'Listí na hladině', 'Na listí a pyl na hladině je nejlepší <b>funkce skimmeru</b> – robot sbírá nečistoty dřív, než klesnou ke dnu.', '?pv907=2302', 'Vysavače se skimmerem'],
      ['🟦', 'Bazén s fólií', 'Fólie potřebuje šetrné kartáče a dobrou přilnavost. Vyberte robota, který je pro <b>fólii</b> výslovně určený.', '?pv64=2287', 'Vysavače vhodné na fólii'],
      ['🤝', 'Chci ho nejdřív vyzkoušet', 'Vybrané modely vám <a href="/predvedeni-bazenovych-vysavacu/">předvedeme přímo ve vašem bazénu</a> – uvidíte, jak si poradí s vaším tvarem a povrchem.', '', 'Bazénové vysavače']
    ] }
  };
  var SVC = [
    [U + 'Instalace%20-%20widget/IMG_5724.jpg', 'Instalace robotické sekačky', 'Projedeme s robotem zahradu, nastavíme hranice, zakázané zóny i plán sekání a všechno vysvětlíme. Po celé ČR.', 'od 7 999 Kč', '/instalace-sekacek/'],
    [U + 'Instalace%20-%20widget/Robotick%C3%A9%20vysava%C4%8De/574383985_10161740614830318_6422739092694342679_n%20ve%20st%C5%99edn%C3%AD%20velikosti.jpg', 'Zprovoznění vysavače doma', 'Připojíme robota k Wi-Fi, vytvoříme mapu a plán úklidu a v klidu vás zaučíme. Praha a Středočeský kraj bez příplatku.', 'od 3 490 Kč', '/zprovozneni-robotickeho-vysavace/'],
    [U + 'Instalace%20-%20widget/baz%C3%A9nov%C3%A9%20vysava%C4%8De/predvedeni-aiper-scuba-v3-u-vas-doma.jpg', 'Předvedení na vašem bazénu', 'Vybrané bazénové vysavače vyzkoušíte přímo ve svém bazénu ještě před nákupem. Bez závazku ke koupi.', 'od 3 490 Kč', '/predvedeni-bazenovych-vysavacu/'],
    [U + 'Instalace%20-%20widget/IMG_7219.jpg', 'Zimní a předsezónní servis', 'Vyčistíme a zkontrolujeme robota před zimou nebo před sezónou, aby na jaře rovnou vyjel.', '2 500 Kč', '/zimni-servis-a-cisteni-robota/']
  ];
  // realizace: 3 starší značky (Gardena drát, Husqvarna drát, AMA) nahrazeny letošními fotkami z Fotek (18. 10. 2026, bez EXIF)
  var J = 'https://cdn.jsdelivr.net/gh/Zirk0n/robotisekacky-widgety@main/img/realizace/';
  var REAL = [
    [U + 'Instalace%20-%20widget/IMG_5724.jpg', 'Mammotion LUBA 2', 'Kladno'],
    [J + 'realizace-2026-luba-01.jpg', 'Mammotion LUBA', 'instalace 2026'],
    [U + 'Instalace%20-%20widget/Robotick%C3%A9%20vysava%C4%8De/Dreame%20roller%20ve%20st%C5%99edn%C3%AD%20velikosti.jpg', 'Dreame – zprovoznění', 'u zákazníka doma'],
    [U + 'Instalace%20-%20widget/baz%C3%A9nov%C3%A9%20vysava%C4%8De/Aiper-Scuba-S1%20Teplice.jpg', 'Aiper Scuba S1', 'Teplice'],
    [J + 'realizace-2026-luba-mini-05.jpg', 'Mammotion LUBA mini', 'instalace 2026'],
    [U + 'Instalace%20-%20widget/Robotick%C3%A9%20vysava%C4%8De/ecovacs%20ve%20st%C5%99edn%C3%AD%20velikosti.jpg', 'Ecovacs – zprovoznění', 'u zákazníka doma'],
    [U + 'Instalace%20-%20widget/baz%C3%A9nov%C3%A9%20vysava%C4%8De/Spino%20E1%20Praha%20ve%20st%C5%99edn%C3%AD%20velikosti.jpg', 'Mammotion Spino E1', 'Praha'],
    [J + 'realizace-2026-luba-04.jpg', 'Mammotion LUBA', 'instalace 2026']
  ];
  var FOTO = U + 'Instalace%20-%20widget/baz%C3%A9nov%C3%A9%20vysava%C4%8De/michael-bohacek-profil-2026.jpg';
  var CSS = '' +
    '.rsh{max-width:1180px;margin:0 auto;padding:30px 16px;font-family:inherit}' +
    '.rsh h2{margin:0 0 6px!important;text-align:center;font-size:30px!important;line-height:1.2;font-weight:800;color:var(--rs-g,#1b3f20)}' +
    '.rsh .rsh-sub{text-align:center;color:#4d4d4f;margin:0 auto 20px!important;max-width:720px}' +
    /* výběr podle situace */
    '.rsv-tabs{display:flex;justify-content:center;flex-wrap:wrap;gap:8px;margin:0 0 16px}' +
    '.rsv-tab{border:1px solid var(--rs-line,#e6f0db);background:#fff;color:var(--rs-g,#1b3f20);border-radius:999px;padding:10px 18px;font:inherit;font-weight:700;cursor:pointer;transition:background .2s,color .2s}' +
    '.rsv-tab:hover{background:var(--rs-soft,#f2f7ec)}.rsv-tab[aria-selected="true"]{background:var(--rs-g,#1b3f20);border-color:var(--rs-g,#1b3f20);color:#fff}' +
    '.rsz-g{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px}' +
    '.rsz-c{display:grid;grid-template-columns:42% 1fr;background:#fff;border:1px solid var(--rs-line,#e6f0db);border-radius:22px;overflow:hidden;box-shadow:0 14px 30px rgba(27,63,32,.08)}' +
    '.rsz-c img{width:100%;height:100%;object-fit:cover;min-height:240px;display:block}' +
    '.rsz-b{padding:20px 22px;display:flex;flex-direction:column;gap:8px}.rsz-b b{font-size:20px;color:var(--rs-g,#1b3f20);line-height:1.25}.rsz-b p{margin:0;color:#3d4a3d;font-size:15px;line-height:1.55}' +
    '.rsz-tag{align-self:flex-start;background:var(--rs-soft2,#eef6e6);color:var(--rs-g,#1b3f20);border-radius:999px;padding:3px 12px;font-size:12.5px;font-weight:800}' +
    '.rsz-b .rsh-cta{margin-top:auto}' +
    '@media(max-width:991px){.rsz-g{grid-template-columns:1fr}}@media(max-width:560px){.rsz-c{grid-template-columns:1fr}.rsz-c img{min-height:0;aspect-ratio:16/10}}' +
    '.rsv-g{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:12px}' +
    '.rsv-t{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;min-height:118px;padding:14px 10px;border-radius:18px;border:1px solid var(--rs-line,#e6f0db);background:#fff;box-shadow:0 8px 20px rgba(27,63,32,.07);cursor:pointer;font:inherit;color:var(--rs-g,#1b3f20);font-weight:700;font-size:15px;line-height:1.25;text-align:center;transition:transform .2s,box-shadow .2s,border-color .2s}' +
    '.rsv-t[aria-expanded="true"]{border-color:var(--rs-l,#86BB41);background:#f4f9ef;box-shadow:0 0 0 2px rgba(134,187,65,.35)}.rsv-t .e{font-size:30px;line-height:1}' +
    '.rsv-p{margin-top:14px;padding:18px 22px;border-radius:18px;background:linear-gradient(160deg,#fff 0,#f4f9ef 100%);border:1px solid #e3eed8;display:none}' +
    '.rsv-p.on{display:block}.rsv-p h3{margin:0 0 6px!important;font-size:20px!important;color:var(--rs-g,#1b3f20)}' +
    '.rsv-p p{margin:0 0 12px!important;color:#2b3328;font-size:16px;line-height:1.6}.rsv-p a{color:var(--rs-g,#1b3f20);font-weight:700}' +
    '.rsh-cta{display:flex;flex-wrap:wrap;gap:10px}.rsh-cta a{display:inline-flex;align-items:center;padding:10px 18px;border-radius:999px;text-decoration:none!important;font-weight:700}' +
    '.rsh-cta .pri{background:var(--rs-g,#1b3f20);color:#fff!important}.rsh-cta .pri:hover{background:var(--rs-l,#86BB41)}.rsh-cta .sec{border:2px solid var(--rs-g,#1b3f20);color:var(--rs-g,#1b3f20)!important;background:#fff}' +
    /* služby */
    '.rss-g{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px}' +
    '.rss-c{display:flex;flex-direction:column;border-radius:20px;overflow:hidden;background:#fff;border:1px solid var(--rs-line,#e6f0db);box-shadow:0 10px 24px rgba(27,63,32,.08);text-decoration:none!important;color:inherit!important;transition:transform .2s,box-shadow .2s}' +
    '.rss-c img{width:100%;aspect-ratio:4/3;object-fit:cover;display:block}' +
    '.rss-b{padding:16px 18px 18px;display:flex;flex-direction:column;gap:8px;flex:1}' +
    '.rss-b b{font-size:18px;color:var(--rs-g,#1b3f20);line-height:1.25}.rss-b span{color:#3d4a3d;font-size:15px;line-height:1.5;flex:1}' +
    '.rss-pr{display:flex;justify-content:space-between;align-items:center;margin-top:4px;font-weight:800;color:var(--rs-g,#1b3f20)}.rss-pr i{font-style:normal;color:#4f8a2a}' +
    /* realizace */
    '.rsr2-g{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}' +
    '.rsr2-f{position:relative;margin:0;border-radius:16px;overflow:hidden;aspect-ratio:4/3;background:var(--rs-soft2,#eef6e6)}' +
    '.rsr2-f img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .4s}.rsr2-f:hover img{transform:scale(1.05)}' +
    '.rsr2-f figcaption{position:absolute;left:10px;bottom:10px;padding:6px 12px;border-radius:999px;background:rgba(255,255,255,.88);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);font-size:13px;color:var(--rs-g,#1b3f20);font-weight:700;line-height:1.2}' +
    '.rsr2-f figcaption small{display:block;font-weight:500;color:#5a6b56}' +
    /* pohyblivý pás realizací */
    '.rsr2-m{overflow:hidden;margin:0 -16px;padding:4px 0 10px;-webkit-mask-image:linear-gradient(90deg,transparent 0,#000 6%,#000 94%,transparent 100%);mask-image:linear-gradient(90deg,transparent 0,#000 6%,#000 94%,transparent 100%)}' +
    '.rsr2-track{display:flex;gap:12px;width:max-content;animation:rsr2run 110s linear infinite}.rsr2-m:hover .rsr2-track{animation-play-state:paused}' +
    '@keyframes rsr2run{from{transform:translateX(0)}to{transform:translateX(-50%)}}' +
    '.rsr2-m .rsr2-f{flex:0 0 auto;height:260px;aspect-ratio:auto;width:auto}.rsr2-m .rsr2-f img{height:100%;width:auto;max-width:420px;min-width:195px;object-fit:cover}' +
    '@media(prefers-reduced-motion:reduce){.rsr2-track{animation:none}.rsr2-m{overflow-x:auto}}' +
    '@media(max-width:560px){.rsr2-m .rsr2-f{height:200px}.rsr2-m .rsr2-f img{max-width:300px;min-width:150px}.rsr2-track{animation-duration:80s}}' +
    '.rsr2-more{text-align:center;margin-top:16px}.rsr2-more a{color:var(--rs-g,#1b3f20);font-weight:700}' +
    /* majitel */
    '.rso{padding:28px 16px 68px;margin-bottom:-28px!important;background:linear-gradient(180deg,#f7faf5,var(--rs-soft2,#eef6e6));border-top:1px solid var(--rs-line,#e6f0db)}.in-index #footer{margin-top:0!important;position:relative;z-index:1}' +
    '.rso-in{max-width:1080px;margin:0 auto;display:flex;align-items:center;gap:24px;flex-wrap:wrap;background:#fff;border:1px solid var(--rs-line,#e6f0db);border-radius:20px;padding:20px 24px;box-shadow:0 14px 30px rgba(27,63,32,.08)}' +
    '.rso-in img{width:104px;height:104px;border-radius:50%;object-fit:cover;flex:0 0 104px;border:3px solid var(--rs-l,#86BB41)}' +
    '.rso-t{flex:1 1 320px;min-width:0}.rso-t p{margin:0!important}.rso-h{font-size:22px;font-weight:800;color:var(--rs-g,#1b3f20);line-height:1.25;margin-bottom:4px!important}' +
    '.rso-p{color:#33402f;font-size:16px;line-height:1.5;margin-bottom:6px!important}.rso-n{color:#5a6b56;font-size:14px}' +
    '.rso-c{display:flex;flex-direction:column;gap:8px}.rso-c a{display:inline-flex;justify-content:center;padding:12px 20px;border-radius:999px;font-weight:700;text-decoration:none!important;white-space:nowrap}' +
    '.rso-c .pri{background:var(--rs-g,#1b3f20);color:#fff!important}.rso-c .pri:hover{background:var(--rs-l,#86BB41)}.rso-c .sec{border:2px solid var(--rs-g,#1b3f20);color:var(--rs-g,#1b3f20)!important;background:#fff}' +
    /* výhody jako karty */
    /* výhody (benefitBanner) jsou od 16. 10. 2026 v celoplošném web-v2.js – stejné na titulce, v kategoriích i na produktech */
    '@media(max-width:991px){.rsv-g{grid-template-columns:repeat(3,minmax(0,1fr))}.rss-g{grid-template-columns:repeat(2,minmax(0,1fr))}.rsr2-g{grid-template-columns:repeat(2,minmax(0,1fr))}}' +
    '@media(max-width:560px){.rsh h2{font-size:24px!important}.rsv-g{grid-template-columns:repeat(2,minmax(0,1fr))}.rsv-t{min-height:96px;font-size:14px}' +
    '.rss-g{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;gap:12px;padding-bottom:6px;scrollbar-width:none}.rss-g::-webkit-scrollbar{display:none}.rss-c{flex:0 0 82%;scroll-snap-align:start}' +
    '.rsr2-g{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none}.rsr2-g::-webkit-scrollbar{display:none}.rsr2-f{flex:0 0 78%;scroll-snap-align:start}' +
    '.rso-in{flex-direction:column;text-align:center;padding:18px}.rso-c{width:100%}}';
  /* ===== jednotný design homepage (15. 10. 2026) – stejný jazyk jako šablony v2 ===== */
  CSS += '' +
    '.in-index .homepage-group-title{color:var(--rs-g,#1b3f20)!important;font-size:30px!important;font-weight:800!important;text-align:center!important;margin:38px 0 20px!important;line-height:1.2}' +
    '.in-index .next-to-carousel-banners .banner-wrapper a{display:block;position:relative;border-radius:20px;overflow:hidden;border:1px solid rgba(255,255,255,.6);box-shadow:0 18px 36px rgba(0,0,0,.14),0 3px 8px rgba(0,0,0,.06);transition:transform .25s,box-shadow .25s}' +
    '.in-index .next-to-carousel-banners .banner-wrapper a::after{content:"";position:absolute;inset:0;border-radius:inherit;pointer-events:none;box-shadow:inset 0 1px 0 rgba(255,255,255,.6),inset 0 0 0 1px rgba(255,255,255,.18);background:linear-gradient(155deg,rgba(255,255,255,.24) 0,rgba(255,255,255,.06) 30%,rgba(255,255,255,0) 48%)}' +
    '.in-index .next-to-carousel-banners .banner-wrapper img{display:block;width:100%;height:auto}' +
    /* produktové karty jsou od 15. 10. 2026 v celoplošném web-v2.js (jeden zdroj pro homepage i kategorie) */
    '.in-index .products-block .product .name{color:var(--rs-g,#1b3f20)!important;font-weight:700!important}.in-index .products-block .product .name span{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}' +
    '.in-index .welcome-wrapper{background:var(--rs-soft,#f2f7ec)!important;box-shadow:0 0 0 100vmax var(--rs-soft,#f2f7ec)!important;clip-path:inset(0 -100vmax)!important;color:#2b3328!important;padding:40px 0!important;margin:34px 0!important}' +
    '.in-index .welcome-wrapper .welcome{max-width:1080px;margin:0 auto!important;background:#fff;border:1px solid var(--rs-line,#e6f0db);border-radius:22px;padding:28px 32px!important;box-shadow:0 14px 30px rgba(27,63,32,.08)}' +
    '.in-index .welcome-wrapper .welcome,.in-index .welcome-wrapper .welcome p{color:#2b3328!important;font-size:16px;line-height:1.65}' +
    '.in-index .welcome-wrapper h1,.in-index .welcome-wrapper .h1,.in-index .welcome-wrapper h2,.in-index .welcome-wrapper h3{color:var(--rs-g,#1b3f20)!important;font-size:26px!important;font-weight:800!important;line-height:1.25;margin:0 0 14px!important;text-align:left}' +
    '.in-index .welcome-wrapper a{color:var(--rs-g,#1b3f20)!important;font-weight:700!important;text-decoration:underline!important;text-decoration-color:var(--rs-l,#86BB41)!important;text-decoration-thickness:2px!important;text-underline-offset:3px}' +
    '.in-index .welcome-wrapper a:hover{color:#4f8a2a!important}' +
    '.in-index .homepage-blog-wrapper .news-item{padding:8px!important}' +
    '.in-index .homepage-blog-wrapper .news-item>a{display:flex;flex-direction:column;height:100%;background:#fff;border:1px solid var(--rs-line,#e6f0db);border-radius:20px;overflow:hidden;box-shadow:0 8px 22px rgba(27,63,32,.06);text-decoration:none!important;transition:transform .2s,box-shadow .2s}' +
    '.in-index .homepage-blog-wrapper .news-item .image{margin:0!important}.in-index .homepage-blog-wrapper .news-item .image img{width:100%;aspect-ratio:16/10;object-fit:cover;display:block}' +
    '.in-index .homepage-blog-wrapper .news-item .text{padding:14px 18px 18px!important}' +
    '.in-index .homepage-blog-wrapper .news-item .title{color:var(--rs-g,#1b3f20)!important;font-weight:800!important;font-size:18px!important;line-height:1.3}' +
    '.in-index .homepage-blog-wrapper .news-item .description{color:#3d4a3d!important;font-size:14.5px!important;line-height:1.55!important}' +
    '.in-index .homepage-blog-wrapper .news-item .read-article{color:#4f8a2a!important;font-weight:700!important}' +
    '.in-index #hodnoceniobchodu h2,.in-index #hodnoceniobchodu h3,.in-index #hodnoceniobchodu .h2,.in-index #hodnoceniobchodu .h3{color:var(--rs-g,#1b3f20)!important}' +
    '@media(max-width:560px){.in-index .homepage-group-title{font-size:24px!important;margin:28px 0 14px!important}.in-index .welcome-wrapper .welcome{padding:20px!important}.in-index .welcome-wrapper .h1,.in-index .welcome-wrapper h1,.in-index .welcome-wrapper h2{font-size:21px!important}}';
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html) e.innerHTML = html; return e; }
  function situace() {
    var m = new Date().getMonth() + 1, def = (m >= 3 && m <= 8) ? 'sekacka' : 'vysavac';
    var sec = el('section', 'rsh rsv', '<h2>S čím vám poradíme?</h2><p class="rsh-sub">Vyberte, co řešíte – ukážeme vám rovnou roboty, kteří se na to hodí.</p>' +
      '<div class="rsv-tabs" role="tablist">' + Object.keys(SIT).map(function (k) { return '<button type="button" role="tab" class="rsv-tab" data-k="' + k + '">' + SIT[k].label + '</button>'; }).join('') + '</div>' +
      '<div class="rsv-g"></div><div class="rsv-p" id="rsv-p" role="region" aria-live="polite"></div>');
    sec.setAttribute('aria-label', 'Výběr robota podle situace');
    var grid = sec.querySelector('.rsv-g'), panel = sec.querySelector('.rsv-p'), cur = def;
    function tab(k) {
      cur = k; panel.classList.remove('on');
      [].forEach.call(sec.querySelectorAll('.rsv-tab'), function (t) { t.setAttribute('aria-selected', t.dataset.k === k ? 'true' : 'false'); });
      grid.innerHTML = SIT[k].items.map(function (s, i) { return '<button type="button" class="rsv-t" aria-expanded="false" aria-controls="rsv-p" data-i="' + i + '"><span class="e" aria-hidden="true">' + s[0] + '</span>' + s[1] + '</button>'; }).join('');
    }
    sec.addEventListener('click', function (e) {
      var t = e.target.closest && e.target.closest('.rsv-tab'); if (t) { tab(t.dataset.k); return; }
      var b = e.target.closest && e.target.closest('.rsv-t'); if (!b) return;
      var open = b.getAttribute('aria-expanded') === 'true';
      [].forEach.call(grid.querySelectorAll('.rsv-t'), function (x) { x.setAttribute('aria-expanded', 'false'); });
      if (open) { panel.classList.remove('on'); return; }
      var g = SIT[cur], s = g.items[+b.getAttribute('data-i')]; b.setAttribute('aria-expanded', 'true');
      panel.innerHTML = '<h3>' + s[0] + ' ' + s[1] + '</h3><p>' + s[2] + '</p><div class="rsh-cta"><a class="pri" href="' + g.base + s[3] + '">' + s[4] + ' →</a>' +
        '<a class="sec" href="tel:' + TEL + '">📞 Poradit model – ' + TELT + '</a>' +
        '<a class="sec" href="mailto:' + MAIL + '?subject=' + encodeURIComponent(g.label + ' – ' + s[1]) + '">✉️ Napsat e-mail</a></div>';
      panel.classList.add('on');
      if (window.innerWidth < 760) panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
    tab(def);
    return sec;
  }
  /* sezónní blok: sekačky a bazény i mimo sezónu (dárek, příprava na jaro) */
  function sezona() {
    return el('section', 'rsh rsz', '<h2>Myslíte už na jaro?</h2><p class="rsh-sub">Robotickou sekačku nebo bazénový vysavač vyberete v klidu teď – a na jaře je rovnou spustíme.</p><div class="rsz-g">' +
      '<div class="rsz-c"><img src="' + U + 'Instalace%20-%20widget/IMG_5724.jpg" alt="Instalace robotické sekačky Mammotion LUBA 2" loading="lazy"><div class="rsz-b"><span class="rsz-tag">Tip na Vánoce</span><b>Robotická sekačka pod stromeček</b>' +
      '<p>Vyberte sekačku teď a instalaci domluvíme na jaro, až začne sezóna. Projedeme zahradu, nastavíme zóny a všechno vysvětlíme.</p>' +
      '<div class="rsh-cta"><a class="pri" href="/roboticke-bezdratove-sekacky/">Bezdrátové sekačky →</a><a class="sec" href="/darkove-poukazy/">Dárkový poukaz</a><a class="sec" href="/instalace-sekacek/">Instalace</a></div></div></div>' +
      '<div class="rsz-c"><img src="' + U + 'Instalace%20-%20widget/baz%C3%A9nov%C3%A9%20vysava%C4%8De/Aiper-Scuba-S1%20Teplice.jpg" alt="Bazénový vysavač Aiper Scuba S1 u zákazníka" loading="lazy"><div class="rsz-b"><span class="rsz-tag">Příprava na sezónu</span><b>Bazénový vysavač na příští léto</b>' +
      '<p>Poradíme podle tvaru a povrchu bazénu. Vybrané modely vám předvedeme přímo ve vašem bazénu ještě před nákupem.</p>' +
      '<div class="rsh-cta"><a class="pri" href="/bazenove-vysavace/">Bazénové vysavače →</a><a class="sec" href="/predvedeni-bazenovych-vysavacu/">Předvedení u vás</a></div></div></div>' +
      '</div>');
  }
  function sluzby() {
    return el('section', 'rsh rss', '<h2>Služby, které u velkých obchodů nedostanete</h2><p class="rsh-sub">Robota vám nejen prodáme – přijedeme, nastavíme ho a postaráme se o něj i po nákupu.</p><div class="rss-g">' +
      SVC.map(function (s) { return '<a class="rss-c" href="' + s[4] + '"><img src="' + s[0] + '" alt="' + s[1] + '" loading="lazy"><span class="rss-b"><b>' + s[1] + '</b><span>' + s[2] + '</span><span class="rss-pr">' + s[3] + '<i>Více →</i></span></span></a>'; }).join('') + '</div>');
  }
  // realizace jako pohyblivý pás (Michael 18. 10. 2026: rozmanité fotky z různých let, pak případně vyměníme)
  // MIX = fotky z knihovny Fotky 2023–2025 (bez EXIF), rok podle data pořízení
  var MIXY = ['2024', '2024', '2023', '2023', '2025', '2025', '2025', '2025', '2025', '2023', '2023', '2023', '2025', '2024', '2024', '2024'];
  var MIX = MIXY.map(function (y, i) { return [J + 'realizace-mix-' + (i < 9 ? '0' : '') + (i + 1) + '.jpg', 'Instalace sekačky', y]; })
    .concat([[J + 'realizace-2026-luba-02.jpg', 'Mammotion LUBA', '2026'], [J + 'realizace-2026-luba-mini-03.jpg', 'Mammotion LUBA mini', '2026'], [J + 'realizace-2026-luba-06.jpg', 'Mammotion LUBA', '2026']]);
  function realizace() {
    var all = [], a = REAL.slice(), b = MIX.slice();
    while (a.length || b.length) { if (a.length) all.push(a.shift()); if (b.length) all.push(b.shift()); if (b.length) all.push(b.shift()); }
    var fig = function (r, dup) { return '<figure class="rsr2-f"' + (dup ? ' aria-hidden="true"' : '') + '><img src="' + r[0] + '" alt="' + (dup ? '' : r[1] + ' – ' + r[2]) + '" loading="lazy"><figcaption>' + r[1] + '<small>' + r[2] + '</small></figcaption></figure>'; };
    return el('section', 'rsh rsr2', '<h2>Naše realizace</h2><p class="rsh-sub">Skutečné zahrady, byty a bazény našich zákazníků – od roku 2023 po celé České republice.</p>' +
      '<div class="rsr2-m"><div class="rsr2-track">' + all.map(function (r) { return fig(r); }).join('') + all.map(function (r) { return fig(r, 1); }).join('') + '</div></div>' +
      '<p class="rsr2-more"><a href="/instalace-sekacek/">Více o instalacích a servisu →</a></p>');
  }
  function majitel() {
    return el('section', 'rso', '<div class="rso-in"><img src="' + FOTO + '" alt="Michael Boháček, majitel Robotí Sekačky" loading="lazy" width="104" height="104">' +
      '<div class="rso-t"><p class="rso-h">Potřebujete poradit s výběrem?</p><p class="rso-p">Zavolejte mi nebo napište. Poradím vám podle vaší domácnosti, zahrady nebo bazénu.</p><p class="rso-n"><strong>Michael Boháček</strong> · majitel Robotisekacky.cz</p></div>' +
      '<div class="rso-c"><a class="pri" href="tel:' + TEL + '">📞 ' + TELT + '</a><a class="sec" href="mailto:' + MAIL + '">✉️ ' + MAIL + '</a></div></div>');
  }
  // uvítací text (17. 10. 2026): dvousloupcová karta – vlevo mozaika fotek služeb (instalace sekačky – skutečná realizace, vysavač a bazén – fotky ze stránek služeb) (vysavač, sekačka, bazén),
  // vpravo text z adminu (Shoptet → úvodní text) beze změny; poslední odstavec „Nevíte si rady?“ → tlačítka telefon/e-mail
  var WCSS = '' +
    '.in-index .welcome-wrapper .welcome.rsw{display:grid;grid-template-columns:minmax(0,.95fr) minmax(0,1.25fr);gap:32px;align-items:center;max-width:1180px;padding:24px!important}' +
    '.rsw-m{display:grid;grid-template-columns:1.35fr 1fr;grid-template-rows:1fr 1fr;gap:10px;height:380px}' +
    '.rsw-m figure{position:relative;margin:0;border-radius:16px;overflow:hidden;background:var(--rs-soft,#f2f7ec)}.rsw-m figure:first-child{grid-row:1/3}' +
    '.rsw-m img{width:100%;height:100%;object-fit:cover;display:block}' +
    '.rsw-m figcaption{position:absolute;left:8px;bottom:8px;background:rgba(255,255,255,.86);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);color:var(--rs-g,#1b3f20);font-size:12.5px;font-weight:800;padding:4px 10px;border-radius:999px}' +
    '.rsw-t>div>p{margin:0 0 12px!important}' +
    '.in-index .welcome-wrapper p.rsw-c{display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:18px 0 0!important;padding-top:16px;border-top:1px solid var(--rs-line,#e6f0db)}' +
    '.rsw-c span{font-weight:700;color:var(--rs-g,#1b3f20);margin-right:4px}' +
    '.in-index .welcome-wrapper .rsw-c a{display:inline-flex;align-items:center;gap:6px;border-radius:999px;padding:10px 18px;text-decoration:none!important;font-weight:800!important}' +
    '.in-index .welcome-wrapper .rsw-c a.pri{background:var(--rs-g,#1b3f20);color:#fff!important}.in-index .welcome-wrapper .rsw-c a.pri:hover{background:#2a5a30}' +
    '.in-index .welcome-wrapper .rsw-c a.sec{background:#fff;border:1px solid var(--rs-line,#e6f0db);color:var(--rs-g,#1b3f20)!important}' +
    '@media(max-width:991px){.in-index .welcome-wrapper .welcome.rsw{grid-template-columns:1fr;gap:20px}.rsw-m{height:300px}}' +
    '@media(max-width:560px){.rsw-m{height:220px}.rsw-m figcaption{font-size:11px;padding:3px 8px;white-space:nowrap;left:6px;bottom:6px}.in-index .welcome-wrapper .welcome.rsw{padding:14px!important}.in-index .welcome-wrapper .rsw-c a{flex:1 1 100%;justify-content:center}}';
  function uvod() {
    var w = document.querySelector('.welcome-wrapper .welcome');
    if (!w || w.classList.contains('rsw')) return;
    var st = document.createElement('style'); st.id = 'rsw-css'; st.textContent = WCSS; document.head.appendChild(st);
    var t = el('div', 'rsw-t'); while (w.firstChild) t.appendChild(w.firstChild);
    var svc = function (href) { for (var i = 0; i < SVC.length; i++) if (SVC[i][4] === href) return SVC[i][0]; return REAL[2][0]; };
    var pick = [[REAL[0][0], 'Instalace sekačky'], [svc('/zprovozneni-robotickeho-vysavace/'), 'Zprovoznění vysavače'], [svc('/predvedeni-bazenovych-vysavacu/'), 'Předvedení u bazénu']];
    var m = el('div', 'rsw-m', pick.map(function (p, i) { return '<figure><img src="' + p[0] + '" alt="' + p[1] + '" loading="' + (i ? 'lazy' : 'eager') + '"><figcaption>' + p[1] + '</figcaption></figure>'; }).join(''));
    w.appendChild(m); w.appendChild(t); w.classList.add('rsw');
    var ps = t.querySelectorAll('p'), last = ps[ps.length - 1];
    if (last && /Nevíte si rady/i.test(last.textContent)) {
      last.className = 'rsw-c';
      last.innerHTML = '<span>Nevíte si rady? Poradím vám osobně.</span><a class="pri" href="tel:' + TEL + '">📞 ' + TELT + '</a><a class="sec" href="mailto:' + MAIL + '">✉️ ' + MAIL + '</a>';
    }
  }
  function build() {
    try { uvod(); } catch (e) {}
    var host = document.querySelector('.index-content-wrapper');
    if (!host || document.querySelector('.rsv')) return;
    var st = document.createElement('style'); st.id = 'rsh-css'; st.textContent = CSS; document.head.appendChild(st);
    host.insertBefore(situace(), host.firstChild);
    var blog = host.querySelector('.homepage-blog-wrapper');
    var s = sluzby(), r = realizace();
    var z = sezona();
    if (blog) { host.insertBefore(z, blog); host.insertBefore(s, blog); host.insertBefore(r, blog); } else { host.appendChild(z); host.appendChild(s); host.appendChild(r); }
    var foot = document.getElementById('footer');
    if (foot && !document.querySelector('.rso')) foot.parentNode.insertBefore(majitel(), foot);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build); else build();
})();
