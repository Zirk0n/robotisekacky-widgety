/* robotisekacky.cz – celoplošná vrstva vzhledu v2 (15. 10. 2026)
   Zdroj pravdy: Firma/nastroje/web/web-v2.js → repo Zirk0n/robotisekacky-widgety/web-v2.js (načítá se ze zápatí, pinovaný hash).
   Obsah: 1) horní kontaktní lišta  2) menu v našem vzhledu  3) produktové karty (všude)  4) kategorie: filtry
   (desktop rozbalené, mobil sbalené), posuvníky u číselných parametrů, vzhled  5) patička.
   Barvy: tmavě zelená #1b3f20, zelená #86BB41, rámeček #e6f0db, světlé pozadí #f2f7ec. */
(function () {
  if (window.__rsWeb2) return; window.__rsWeb2 = 1;
  var FOTO = 'https://cdn.myshoptet.com/usr/www.robotisekacky.cz/user/documents/upload/Instalace%20-%20widget/baz%C3%A9nov%C3%A9%20vysava%C4%8De/michael-bohacek-profil-2026.jpg';
  var TEL = '+420792325839', TELT = '792 325 839', MAIL = 'info@robotisekacky.cz';
  /* barvy a tvary bereme z design tokenů (:root níže) – jediné místo pro změnu vzhledu */
  var G = 'var(--rs-g)', L = 'var(--rs-l)', LINE = 'var(--rs-line)';
  var CSS = '' +
    /* --- 0) design tokeny (používají je i homepage-v2.js a recenze-widget.js) --- */
    ':root{--rs-g:#1b3f20;--rs-l:#86BB41;--rs-line:#e6f0db;--rs-soft:#f2f7ec;--rs-soft2:#eef6e6;--rs-text:#2b3328;--rs-muted:#5a6b56;' +
    '--rs-r:20px;--rs-r-sm:14px;--rs-pill:999px;--rs-shadow:0 1px 0 rgba(255,255,255,.9) inset,0 8px 22px rgba(47,74,42,.08);--rs-shadow-hover:0 1px 0 rgba(255,255,255,.9) inset,0 16px 36px rgba(47,74,42,.18);--rs-lift:translateY(-4px);--rs-btn-shadow:0 10px 22px rgba(27,63,32,.2);--rs-ease:.2s ease}' +
    /* hodnoty převzaté ze šablon produktů v2 (widget-*-v2.css: karta hover, tlačítka) – Michael 16. 10. 2026: prvky brát ze šablon */
    '.rsh-cta a,.rso-c a,.rs-foot__btn,.rs-topbar__kontakt,.products-block .btn-cart,.products-block .p-tools .btn,.type-detail .p-to-cart-block .add-to-cart-button,.rsr__btn{transition:transform var(--rs-ease),box-shadow var(--rs-ease),background var(--rs-ease)!important}' +
    '.rsh-cta a:hover,.rso-c a:hover,.rs-foot__btn:hover,.products-block .btn-cart:hover,.products-block .p-tools .btn:hover,.type-detail .p-to-cart-block .add-to-cart-button:hover,.rsr__btn:hover{transform:translateY(-2px)!important;box-shadow:var(--rs-btn-shadow)!important}' +
    /* jednotný hover všech karet – stejný jako u produktů (Michael 16. 10. 2026) */
    '.products-block .product .p,.subcategories.with-image li a,.benefitBanner__item,.rsv-t,.rss-c,.rsz-c,.rsr__card,.in-index .homepage-blog-wrapper .news-item>a,.in-index .next-to-carousel-banners .banner-wrapper a,#navigation .rs-mega>li:not(.rs-mega__foot)>a,.rs-foot__heu{transition:transform var(--rs-ease),box-shadow var(--rs-ease),border-color var(--rs-ease)!important}' +
    '.products-block .product .p:hover,.subcategories.with-image li a:hover,.benefitBanner__item:hover,.rsv-t:hover,.rss-c:hover,.rsz-c:hover,.rsr__card:hover,.in-index .homepage-blog-wrapper .news-item>a:hover,.in-index .next-to-carousel-banners .banner-wrapper a:hover,.rs-foot__heu:hover{transform:var(--rs-lift)!important;box-shadow:var(--rs-shadow-hover)!important}' +
    '#navigation .rs-mega>li:not(.rs-mega__foot)>a:hover{background:#fff!important;transform:translateY(-2px);box-shadow:var(--rs-shadow-hover)}' +
    '@media(hover:none){.products-block .product .p:hover,.subcategories.with-image li a:hover,.benefitBanner__item:hover,.rsv-t:hover,.rss-c:hover,.rsz-c:hover,.rsr__card:hover{transform:none!important}}' +
    /* --- 17. 10. 2026: sjednocení hoverů menu, Více, ikony, šipky karuselu, zaškrtávátka, MIME podpis --- */
    '@media(min-width:992px){#navigation .menu-level-1>li>a{transition:transform var(--rs-ease),box-shadow var(--rs-ease),background var(--rs-ease)!important}' +
    '#navigation .menu-level-1>li:hover>a,#navigation .menu-level-1>li.exp>a{background:#fff!important;transform:translateY(-2px);box-shadow:var(--rs-shadow-hover)}' +
    '#header .navigation-buttons>a:not(.heureka-header-seal),#header .navigation-buttons>button{width:46px!important;height:46px!important;margin:17px 2px!important;border-radius:50%!important;display:grid!important;place-items:center;transition:transform var(--rs-ease),box-shadow var(--rs-ease)!important}' +
    '#header .navigation-buttons>a:not(.heureka-header-seal):hover,#header .navigation-buttons>button:hover{background:#fff!important;transform:translateY(-2px);box-shadow:var(--rs-shadow-hover)!important}' +
    '.menu-helper:hover>span{background:#fff!important;transform:translateY(-2px);box-shadow:var(--rs-shadow-hover)}.menu-helper>span{transition:transform var(--rs-ease),box-shadow var(--rs-ease)}}' + /* konec @media(min-width:992px) – chybějící závorka 17. 10. rozbila mobil */
    /* rozbalené „Více“ – kompaktní seznam s malými logy */
    '.menu-helper .menu-level-1{min-width:300px;max-height:70vh;overflow:auto!important;text-align:left!important}.menu-helper .menu-level-1>li{text-align:left!important}.menu-helper .menu-level-1>li>a{display:flex!important;justify-content:flex-start!important;text-align:left!important;font-weight:800!important;font-size:15px!important}' +
    '.menu-helper .menu-level-2{position:static!important;display:block!important;box-shadow:none!important;border:0!important;padding:0 0 6px 10px!important;margin:0!important;width:auto!important;background:transparent!important}' +
    '.menu-helper .menu-level-2>li>a{display:flex!important;align-items:center;gap:10px;padding:6px 10px!important;border-radius:10px;font-size:14px!important;font-weight:600!important;color:var(--rs-g)!important;text-align:left!important}' +
    '.menu-helper .menu-level-2>li>a:hover{background:var(--rs-soft)!important}' +
    '.menu-helper .menu-level-2 img,.menu-helper .rs-mega__img img{max-width:34px!important;max-height:22px!important;width:auto!important;height:auto!important}' +
    '.menu-helper .rs-mega__img{flex:0 0 40px;width:40px;height:28px;border-radius:8px;background:#fff;border:1px solid var(--rs-line);display:grid;place-items:center}' +
    '.menu-helper .rs-mega__foot{display:none!important}' +
    /* šipky hlavního karuselu = šipky šablon produktů */
    '.carousel .carousel-control,#carousel .carousel-control{width:46px!important;height:46px!important;border-radius:50%!important;top:50%!important;bottom:auto!important;transform:translateY(-50%);background:rgba(27,63,32,.80)!important;border:1px solid rgba(255,255,255,.6)!important;box-shadow:0 14px 28px rgba(0,0,0,.18)!important;opacity:1!important;display:grid!important;place-items:center;transition:transform var(--rs-ease),box-shadow var(--rs-ease),background var(--rs-ease)!important}' +
    '.carousel .carousel-control.left{left:18px!important}.carousel .carousel-control.right{right:18px!important}' +
    '.carousel .carousel-control:hover{transform:translateY(-50%) scale(1.04);box-shadow:0 16px 32px rgba(0,0,0,.28)!important;background:rgba(27,63,32,.92)!important}' +
    '.carousel .carousel-control>*,.carousel .carousel-control::before{display:none!important}' +
    '.carousel .carousel-control::after{content:"❮"!important;display:block!important;position:static!important;color:#fff!important;font-size:18px!important;line-height:1!important;background:none!important;border:0!important;width:auto!important;height:auto!important;transform:none!important}' +
    '.carousel .carousel-control.right::after{content:"❯"!important}' +
    /* zaškrtávátka: kroužek, po výběru zelená tečka; šablonové čtverečky pryč */
    '#filters label.filter-label::before,#filters label.filter-label::after,#filters input+label::before,#filters input+label::after{display:none!important;content:none!important}' +
    '#filters label.filter-label{padding-left:2px!important;margin-left:0!important}' +
    '#filters input[type=checkbox]:checked{background:radial-gradient(circle,var(--rs-l) 0 5px,#fff 5.5px)!important;border-color:var(--rs-g)!important}' +
    '#filters input[type=checkbox]:checked::after{display:none!important}' +
    /* podpis agentury v patičce – Michael 17. 10. 2026: nechat jen Shoptet */
    '#signature>span,#signature a[href*="mime"],#signature img[src*="mime"]{display:none!important}' +
    /* loga v kartách podkategorií větší */
    '.subcategories.with-image .image{height:72px!important}.subcategories.with-image .image img{max-width:150px!important;max-height:64px!important}' +
    /* --- košík a objednávka (17. 10. 2026) – jazyk šablon v2 --- */
    '.cart-header{display:flex!important;gap:10px;border:0!important;margin:10px 0 22px!important}' +
    '.cart-header .step{flex:1;border:1px solid var(--rs-line)!important;border-radius:var(--rs-pill)!important;background:#fff!important;text-align:center;padding:12px 16px!important;color:var(--rs-muted)!important;font-weight:700;box-shadow:none!important}' +
    '.cart-header .step::before,.cart-header .step::after{display:none!important}' +
    '.cart-header .step{flex:1 1 0!important;width:auto!important;max-width:none!important;display:flex!important;align-items:center;justify-content:center;min-height:0!important;height:auto!important}' +
    '.cart-header .step>strong,.cart-header .step>a,.cart-header .step span{background:none!important;border:0!important;box-shadow:none!important;padding:0!important;margin:0!important;min-height:0!important;height:auto!important;width:auto!important;color:inherit!important;display:inline!important;font-size:15px!important;line-height:1.3!important}' +
    '.cart-header .step>strong::after,.cart-header .step>a::after{display:none!important}' +
    '.cart-header .step.active{background:var(--rs-g)!important;border-color:var(--rs-g)!important;color:#fff!important}' +
    '.cart-header .step.completed{background:var(--rs-soft2)!important;color:var(--rs-g)!important}.cart-header .step a{color:inherit!important;text-decoration:none!important}' +
    '.cart-inner .cart-table{border:1px solid var(--rs-line);border-radius:var(--rs-r);overflow:hidden;background:#fff;box-shadow:var(--rs-shadow)}' +
    '.cart-table tr{border-color:var(--rs-line)!important}.cart-table .p-name a,.cart-table .main-link{color:var(--rs-g)!important;font-weight:700}' +
    '.cart-table .price-final,.cart-table .p-total{color:var(--rs-g)!important;font-weight:800}' +
    '.quantity{border:1px solid var(--rs-line)!important;border-radius:var(--rs-pill)!important;overflow:hidden;background:#fff}.quantity input,.quantity button{border:0!important;background:#fff!important;color:var(--rs-g)!important;font-weight:700}' +
    '.discount-coupon .form-control{border-radius:var(--rs-pill) 0 0 var(--rs-pill)!important;border-color:var(--rs-line)!important}' +
    '.discount-coupon .btn,.discount-coupon button{border-radius:0 var(--rs-pill) var(--rs-pill) 0!important;background:var(--rs-g)!important;border-color:var(--rs-g)!important;color:#fff!important;text-transform:none!important;font-weight:700}' +
    '.co-box,.order-recapitulation,.order-summary{border:1px solid var(--rs-line)!important;border-radius:var(--rs-r)!important;background:#fff!important;box-shadow:var(--rs-shadow);overflow:hidden}' +
    '.co-box h4,.co-box .h4,.order-summary h4,.order-recapitulation h4,.cart-inner h4{color:var(--rs-g)!important;font-weight:800!important;text-transform:none!important}' +
    '.co-box .radio-wrapper{border-color:var(--rs-line)!important;transition:background var(--rs-ease)}.co-box .radio-wrapper:hover{background:var(--rs-soft)}' +
    '.co-box .radio-wrapper.active{background:var(--rs-soft2)!important}.co-box .radio-wrapper label{text-transform:none!important;color:var(--rs-text)!important;font-weight:700}' +
    '.co-box input[type=radio]{-webkit-appearance:none;appearance:none;width:20px;height:20px;border:2px solid #b9cfa9;border-radius:50%;background:#fff;vertical-align:middle}' +
    '.co-box input[type=radio]:checked{background:radial-gradient(circle,var(--rs-l) 0 5px,#fff 5.5px);border-color:var(--rs-g)}' +
    '.co-box .radio-wrapper label::before,.co-box .radio-wrapper label::after{display:none!important}' +
    '.for-free,.payment-shipping-price.for-free{color:var(--rs-l)!important;font-weight:800}' +
    '.next-step .btn-conversion,.next-step-forward{background:var(--rs-g)!important;border-color:var(--rs-g)!important;color:#fff!important;border-radius:var(--rs-pill)!important;text-transform:none!important;font-weight:800!important;padding:14px 28px!important;box-shadow:var(--rs-btn-shadow);transition:transform var(--rs-ease),background var(--rs-ease)!important}' +
    '.next-step .btn-conversion:hover,.next-step-forward:hover{background:var(--rs-l)!important;transform:translateY(-2px)}' +
    '.next-step-back,.continue-shopping{color:var(--rs-g)!important;font-weight:700}' +
    '.cart-inner .summary .price-final,.order-summary .price-final,.order-recapitulation .price-primary{color:var(--rs-g)!important;font-weight:800}' +
    /* --- vlastní základ webu (17. 10. 2026) – napsáno od nuly, nahrazuje vzhled agentury MIME (jejich kód nekopírujeme) --- */
    ':root body,:root body h1,:root body h2,:root body h3,:root body h4,:root body h5,:root body h6,:root body .h1,:root body .h2,:root body .h3,:root body .h4,:root body #navigation,:root body .menu-helper,:root body .p-detail-tabs,:root body .cart-table .main-link,:root body .btn,:root body button,:root body input,:root body select,:root body textarea{font-family:"Helvetica Neue",Helvetica,Arial,sans-serif}' +
    'body{-webkit-font-smoothing:antialiased;color:#4b4f49;font-size:16px}a{color:' + G + '}li::marker{color:' + G + '}' +
    '.in-index{overflow-x:hidden}.in-index .top-products-wrapper,.in-index .shp-tabs-row{display:none!important}.in-index .tab-content>#homepageProducts2{display:block!important;opacity:1!important}' +
    '.detail-parameters tr,.detail-parameters-wrapper tr{border-bottom:1px solid ' + LINE + '}.browse-p .p-prev,.browse-p .p-next{color:' + L + '!important;background:none!important}' +
    /* karusel produktů na titulce: základní rozložení pro knihovnu Slick (MIT) + naše šipky */
    '.slick-slider{position:relative;display:block;box-sizing:border-box;touch-action:pan-y;-webkit-user-select:none;user-select:none}.slick-list{position:relative;display:block;overflow:hidden;margin:0;padding:0}' +
    '.slick-track{position:relative;left:0;top:0;display:flex!important}.slick-slide{display:none;min-height:1px;float:none!important}.slick-initialized .slick-slide{display:block}.slick-slide img{display:block}' +
    '.in-index .homepage-group-title{display:block;text-align:center}#filters .has-parametric-slider .more-filters,#filters .rs-has-range .more-filters{display:none!important}' +
    '.slick-slider .product .p{margin:16px}.products-block.slick-slider>div{border:0;padding:0;width:100%}' +
    '.slick-slider .slick-arrow{position:absolute;top:42%;z-index:5;width:46px;height:46px;border-radius:50%;border:0;background:' + G + '!important;color:transparent;font-size:0;cursor:pointer;box-shadow:var(--rs-btn-shadow);transition:transform var(--rs-ease)}' +
    '.slick-slider .slick-arrow::after{content:"";position:absolute;left:50%;top:50%;width:11px;height:11px;border-top:2.5px solid #fff;border-right:2.5px solid #fff;transform:translate(-65%,-50%) rotate(45deg)}' +
    '.slick-slider .slick-prev{left:-6px}.slick-slider .slick-prev::after{transform:translate(-35%,-50%) rotate(-135deg)}.slick-slider .slick-next{right:-6px}.slick-slider .slick-arrow:hover{transform:translateY(-2px)}' +
    /* filtry: „Zobrazit všechny“ a sbalené sekce na mobilu (třídy přidává skript filtrů) */
    '#filters .filter-section form{max-height:244px;overflow:hidden}#filters .filter-section form fieldset{overflow:auto}#filters .filter-section.filter-showall form{max-height:none;overflow:visible}#filters .filter-section.filter-showall .more-filters{display:none}' +
    '#filters .more-filters{display:inline-flex;align-items:center;gap:6px;margin:10px 0 2px;padding:6px 14px;border:1px solid ' + LINE + ';border-radius:var(--rs-pill);background:#fff;color:' + G + ';font-size:13px;font-weight:700;cursor:pointer}#filters .more-filters span{display:none}#filters .more-filters:hover{box-shadow:var(--rs-shadow-hover)}' +
    '@media(max-width:767px){#filters .filter-section-button{display:none}#filters .filter-section>h4,#filters .slider-wrapper>h4{display:flex;justify-content:space-between;align-items:center;cursor:pointer;margin-bottom:0}' +
    '#filters .filter-section>h4::after,#filters .slider-wrapper>h4::after{content:"";width:9px;height:9px;border-right:2px solid ' + G + ';border-bottom:2px solid ' + G + ';transform:rotate(45deg);margin:-4px 6px 0 0;transition:transform var(--rs-ease)}' +
    '#filters .filter-open>h4::after{transform:rotate(-135deg);margin-top:4px}#filters .filter-section.filter-section-boolean{display:block}' +
    '#filters .filter-section:not(.filter-open)>form,#filters .filter-section:not(.filter-open) .more-filters,#filters .filter-section:not(.filter-open) .rs-range,#filters .filter-section:not(.filter-open) .parametric-slider-wrapper,#filters .slider-wrapper:not(.filter-open)>.slider-header,#filters .slider-wrapper:not(.filter-open)>.slider-content{display:none!important}' +
    '#filters .filter-section.has-parametric-slider .more-filters{display:none!important}.filters-wrapper{margin-bottom:20px}}' +
    /* mobil: tlačítko Otevřít filtr (Shoptet ho barví křiklavě zeleně) v našem vzhledu */
    '.filters-unveil-button-wrapper .unveil-button{background:' + G + '!important;color:#fff!important;border:0!important;border-radius:var(--rs-pill)!important;font-weight:700!important;text-transform:none!important;letter-spacing:0!important;padding:13px 22px!important;box-shadow:var(--rs-btn-shadow)!important}' +
    /* posuvník ceny: bez šedého rámečku kolem dráhy (Michael 17. 10.) */
    '.slider-wrapper .slider-content{border:0!important;background:none!important;box-shadow:none!important}' +
    /* informační lišta Shoptetu dole (site-msg) v našem vzhledu */
    '.site-msg.information{background:rgba(255,255,255,.96)!important;border:1px solid ' + LINE + '!important;border-radius:16px!important;box-shadow:0 16px 36px rgba(27,63,32,.16)!important;color:var(--rs-text)!important;-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px)}' +
    '.site-msg.information .text a{color:' + G + '!important;text-decoration:none!important;font-size:15px!important}.site-msg.information .text a:hover{color:' + L + '!important}.site-msg.information .close{opacity:.6}' +
    /* blok Shoptetu „Nejprodávanější“ nad výpisem – malé karty */
    '.products-top-wrapper{margin:6px 0 18px!important}.products-top-header{font-size:20px!important;color:' + G + '!important;margin:0 0 10px!important}' +
    '.products-top .product .p{background:#fff;border:1px solid ' + LINE + '!important;border-radius:14px!important;padding:12px 14px!important;box-shadow:var(--rs-shadow);height:100%}.products-top .product .name{font-size:14px!important;font-weight:700;color:' + G + '!important}' +
    /* produktové karty: kód nenápadně, sleva červeně (Michael 17. 10.) */
    '.products-block .p-code{font-size:10.5px!important;color:#a3ab9f!important;opacity:.8;font-weight:400!important}' +
    '.flag.flag-discount,.flag.flag-action{background-color:#e2231a!important}' +
    /* tlačítka pod výpisem: Načíst další, Nahoru, stránkování */
    '.listingControls .loadMore__button,.listingControls .btn{text-transform:none!important;letter-spacing:0!important}.listingControls .loadMore__button{border:0!important;background:' + G + '!important;color:#fff!important;border-radius:var(--rs-pill)!important;padding:12px 26px!important;font-weight:700!important;box-shadow:var(--rs-btn-shadow);transition:transform var(--rs-ease)}.listingControls .loadMore__button:hover{transform:var(--rs-lift)}' +
    '.listingControls .btn:not(.loadMore__button),.listingControls a.btn{border:1px solid ' + LINE + '!important;background:#fff!important;color:' + G + '!important;border-radius:var(--rs-pill)!important;font-weight:700!important}' +
    '.pagination__list{gap:6px}.pagination__link,.pagination__currentPage{min-width:40px;height:40px;border-radius:50%!important;display:inline-flex!important;align-items:center;justify-content:center;border:1px solid ' + LINE + '!important;background:#fff;color:' + G + '!important;font-weight:700}.pagination__currentPage{background:' + G + '!important;color:#fff!important;border-color:' + G + '!important}.pagination__link:hover{box-shadow:var(--rs-shadow-hover)}' +
    /* --- 1) horní lišta --- */
    '.rs-topbar{background:' + G + ';color:#fff;font-size:13.5px;line-height:1.2}' +
    '.rs-topbar__in{max-width:1400px;margin:0 auto;padding:7px 20px;display:flex;align-items:center;justify-content:space-between;gap:16px}' +
    '.rs-topbar__claim{opacity:.9;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}' +
    '.rs-topbar__links{display:flex;align-items:center;gap:18px;flex-shrink:0}' +
    '.rs-topbar a{color:#fff!important;text-decoration:none!important;font-weight:600;display:inline-flex;align-items:center;gap:6px;white-space:nowrap}' +
    '.rs-topbar a:hover{color:' + L + '!important}' +
    '.rs-topbar svg{width:15px;height:15px;flex:0 0 15px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}' +
    '.rs-topbar .rs-topbar__kontakt{border:1px solid rgba(255,255,255,.45);border-radius:999px;padding:4px 12px}' +
    '.rs-topbar__who{display:inline-flex;align-items:center;gap:7px;opacity:.95;white-space:nowrap}.rs-topbar__who img{width:26px;height:26px;border-radius:50%;object-fit:cover;border:2px solid var(--rs-l)}' +
    '.rs-seal{display:none}@media(min-width:1600px){#header .heureka-header-seal{width:auto!important;flex:0 0 auto!important;gap:8px;padding-right:6px}.rs-seal{display:flex;flex-direction:column;line-height:1.15;font-size:12.5px;color:var(--rs-g);white-space:nowrap}.rs-seal b{font-size:14px}.rs-seal i{color:#f5b301;font-style:normal;letter-spacing:1px}}' +
    '@media(max-width:1199px){.rs-topbar__who{display:none}}' +
    '@media(max-width:991px){.rs-topbar__claim{display:none}.rs-topbar__in{justify-content:center;padding:6px 12px}.rs-topbar__links{gap:14px}}' +
    '@media(max-width:420px){.rs-topbar{font-size:12.5px}.rs-topbar__links{gap:10px}.rs-topbar .rs-topbar__mail span{display:none}.rs-topbar .rs-topbar__kontakt{padding:3px 10px}}' +
    /* --- 2) hlavička a menu (liquid glass) --- */
    '#header{background:#fff!important;border-bottom:1px solid ' + LINE + ';transition:box-shadow .25s}' +
    '@media(min-width:992px){#header{background:rgba(255,255,255,.86)!important;-webkit-backdrop-filter:saturate(1.4) blur(14px);backdrop-filter:saturate(1.4) blur(14px)}}' +
    '#header.rs-scrolled{box-shadow:0 10px 30px rgba(27,63,32,.10)}' +
    '#navigation .menu-level-1>li>a{border-radius:999px;transition:background .2s,color .2s;color:' + G + '!important;font-weight:700!important}' +
    '#header .navigation-buttons,#header .navigation-buttons>a,#header .navigation-buttons>button,#header .menu-helper,#header .menu-helper>span,#header .site-name,#header .navigation-wrapper,#header .navigation-buttons>a::before,#header .navigation-buttons>button::before{background:transparent!important;box-shadow:none!important}' +
    '#header .navigation-buttons>a,#header .navigation-buttons>button{border-radius:50%;transition:background .2s}' +
    '@media(min-width:992px){#navigation .menu-level-1{align-items:center!important}#navigation .menu-level-1>li{display:flex!important;align-items:center;height:80px}#navigation .menu-level-1>li>a{padding:9px 14px!important;margin:0 1px;line-height:1.2!important;height:auto!important}' +
    '#navigation .menu-level-1>li:hover>a,#navigation .menu-level-1>li.exp>a,#navigation .menu-level-1>li>a:focus{background:#eef6e6!important}' +
    '#navigation .menu-level-1>li.active>a{background:' + G + '!important;color:#fff!important}' +
    '#header .navigation-buttons>a:not(.heureka-header-seal):hover,#header .navigation-buttons>button:hover{background:#eef6e6!important}#header .heureka-header-seal:hover{background:transparent!important;transform:scale(1.05)}#header .heureka-header-seal{transition:transform .2s}' +
    '@media(min-width:992px){#navigation,#navigation .navigation-in{background:transparent!important}#navigation .navigation-in{height:auto!important;overflow:visible!important}}' +
    '.menu-helper>span{border-radius:999px;padding:9px 14px;color:' + G + ';font-weight:700}.menu-helper:hover>span{background:#eef6e6}' +
    /* mega nabídka */
    '#navigation .menu-level-2.rs-mega{display:none;grid-template-columns:repeat(2,minmax(0,1fr));gap:4px;width:540px!important;padding:12px!important;background:rgba(255,255,255,.97)!important;border:1px solid ' + LINE + '!important;border-radius:20px!important;box-shadow:0 24px 48px rgba(27,63,32,.16)!important;margin-top:6px!important;left:0}' +
    '#navigation li:hover>.menu-level-2.rs-mega,#navigation li.exp>.menu-level-2.rs-mega,#navigation li:focus-within>.menu-level-2.rs-mega{display:grid!important}' +
    '#navigation .rs-mega>li{width:auto!important;float:none!important}' +
    '#navigation .rs-mega>li>a{display:flex!important;align-items:center;gap:12px;border-radius:12px;padding:8px 10px!important;color:' + G + '!important;font-weight:700;font-size:14.5px;line-height:1.25;white-space:normal}' +
    '#navigation .rs-mega .rs-mega__img{flex:0 0 54px;width:54px;height:38px;border-radius:10px;background:#fff;border:1px solid ' + LINE + ';display:grid;place-items:center;overflow:hidden}' +
    '#navigation .rs-mega .rs-mega__img img{max-width:46px;max-height:30px;object-fit:contain}' +
    '#navigation .rs-mega>li.rs-mega__foot{grid-column:1/-1;display:flex;justify-content:space-between;align-items:center;gap:10px;margin-top:6px;padding:10px 12px;border-radius:14px;background:#f2f7ec;font-size:14px;color:#3d4a3d}' +
    '#navigation .rs-mega>li.rs-mega__quick{grid-column:1/-1;display:flex;flex-wrap:wrap;align-items:center;gap:6px;margin-top:6px;padding:10px 4px 2px;border-top:1px solid ' + LINE + '}' +
    '#navigation .rs-mega>li.rs-mega__quick b{font-size:12px;text-transform:uppercase;letter-spacing:.06em;color:var(--rs-muted);margin-right:4px}' +
    '#navigation .rs-mega>li.rs-mega__quick a{display:inline-flex!important;padding:6px 12px!important;border:1px solid ' + LINE + '!important;border-radius:var(--rs-pill)!important;background:#fff!important;font-size:13px!important;font-weight:700!important;color:' + G + '!important;line-height:1.2!important;transition:transform var(--rs-ease),box-shadow var(--rs-ease)}' +
    '#navigation .rs-mega>li.rs-mega__quick a:hover{transform:translateY(-2px);box-shadow:var(--rs-shadow-hover)}' +
    /* „Více“: skupiny jako nadpisy, rychlé odkazy i tady, kolečko neskroluje stránku pod menu */
    '.menu-helper .menu-level-1,.menu-helper>ul{overscroll-behavior:contain;padding-bottom:8px!important}.menu-helper .menu-level-1>li>a,.menu-helper .menu-level-1>li>a>b,.menu-helper>ul>li>a{font-weight:800!important;color:' + G + '!important;font-size:14.5px!important;padding-top:10px!important}' +
    '.menu-helper>ul>li>a .submenu-arrow,.menu-helper>ul>li>a::after,.menu-helper .menu-level-1>li>a::after{display:none!important}' +
    '.menu-helper .rs-mega__quick{display:flex!important;flex-wrap:wrap;gap:5px;padding:2px 10px 10px 20px!important;border:0!important;margin:0!important}.menu-helper .rs-mega__quick b{display:none}' +
    '.menu-helper .rs-mega__quick a{padding:4px 10px!important;font-size:12px!important;border:1px solid ' + LINE + '!important;border-radius:var(--rs-pill)!important;background:#fff!important;color:' + G + '!important;font-weight:700!important;display:inline-flex!important}' +
    '#navigation .rs-mega>li.rs-mega__foot a{display:inline-flex!important;padding:0!important;background:none!important;font-weight:800;color:' + G + '!important}' +
    '.menu-helper .menu-level-1{border:1px solid ' + LINE + '!important;border-radius:18px!important;box-shadow:0 24px 48px rgba(27,63,32,.16)!important;padding:10px!important;background:#fff!important;margin-top:6px}' +
    '.menu-helper .menu-level-1>li>a{border-radius:10px;padding:9px 12px!important;color:' + G + '!important;font-weight:700}' +
    '.menu-helper .menu-level-1>li>a:hover{background:#f2f7ec}}' +
    /* drobečková navigace – světlý pruh místo tmavého */
    '.breadcrumbs{background:#f2f7ec!important;box-shadow:none!important;clip-path:none!important;border-radius:999px;margin:12px 0 4px!important;padding-left:18px!important;padding-right:18px!important;width:auto!important}.breadcrumbs::before,.breadcrumbs::after{display:none!important}' +
    '.breadcrumbs,.breadcrumbs a,.breadcrumbs span{color:' + G + '!important}.breadcrumbs a{font-weight:600}' +
    /* mobilní menu */
    '@media(max-width:991px){.navigation-window-visible #navigation{background:#fff}' +
    '#navigation .menu-level-1>li{border-bottom:1px solid ' + LINE + '}' +
    '#navigation .menu-level-1>li>a{border-radius:0!important}' +
    '#navigation .menu-level-2>li>a{color:' + G + '!important;font-weight:600}' +
    '.rs-navcontact{display:block;margin:16px;padding:16px;border-radius:18px;background:#f2f7ec;border:1px solid ' + LINE + '}' +
    '.rs-navcontact b{display:block;color:' + G + ';margin-bottom:8px}' +
    '.rs-navcontact a{display:flex;align-items:center;gap:8px;color:' + G + '!important;font-weight:700;padding:6px 0;text-decoration:none!important}' +
    '.rs-navcontact svg{width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}}' +
    '@media(min-width:992px){.rs-navcontact{display:none!important}}' +
    /* --- 3) produktové karty – stejné na homepage, v kategoriích i v doporučených --- */
    '.products-block .product{border:0!important;background:transparent!important;padding:8px!important}' +
    '.products-block .product .p{background:#fff!important;border:1px solid ' + LINE + '!important;border-radius:var(--rs-r)!important;overflow:hidden;box-shadow:var(--rs-shadow);height:100%}' +
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
    /* --- 3b) výhody, záložky a nákupní box na produktu (jazyk šablon v2) --- */
    '.benefitBanner{display:grid!important;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:14px!important}.benefitBanner__item{width:auto!important;max-width:none!important;margin:0!important}' +
    '@media(max-width:560px){.benefitBanner{display:grid!important;grid-template-columns:1fr!important;gap:8px!important;overflow:visible!important;padding:0!important}.benefitBanner__item{display:flex!important;align-items:center;gap:12px;padding:12px 14px!important;border-radius:14px!important}.benefitBanner__item:hover{transform:none}.benefitBanner__link{display:flex!important;align-items:center!important;gap:14px!important;width:100%}.benefitBanner__picture,.benefitBanner__item img{flex:0 0 42px!important;width:42px!important;max-width:42px!important;height:auto!important;margin:0!important}.benefitBanner__content{padding:0!important;margin:0!important;text-align:left!important}.benefitBanner__title{font-size:15px!important;line-height:1.25!important;margin:0 0 2px!important}.benefitBanner__data,.benefitBanner__data p{font-size:13.5px!important;line-height:1.4!important;margin:0!important}}' +
    '.benefitBanner__item{background:#fff;border:1px solid #e6f0db;border-radius:18px;box-shadow:0 8px 20px rgba(27,63,32,.06);padding:16px!important;transition:transform .2s,box-shadow .2s}' +
    '.benefitBanner__title{color:#1b3f20!important}' +
    '.p-detail-tabs{border:0!important;display:flex!important;flex-wrap:wrap;gap:8px;margin-bottom:18px!important}' +
    '.p-detail-tabs .shp-tab{border:0!important;margin:0!important;background:none!important}' +
    '.p-detail-tabs .shp-tab-link{display:inline-block;border:1px solid ' + LINE + '!important;border-radius:999px!important;background:#fff!important;color:' + G + '!important;font-weight:700!important;padding:10px 18px!important;text-transform:none!important}' +
    '.p-detail-tabs .shp-tab-link:hover{background:#f2f7ec!important}' +
    '.p-detail-tabs .shp-tab.active .shp-tab-link{background:' + G + '!important;border-color:' + G + '!important;color:#fff!important}' +
    '.p-detail-tabs .shp-tab::before,.p-detail-tabs .shp-tab::after,.p-detail-tabs::after{display:none!important}' +
    '.type-detail .p-to-cart-block .add-to-cart-button,.type-detail .p-to-cart-block .btn-conversion{background:' + G + '!important;border-color:' + G + '!important;color:#fff!important;border-radius:999px!important;font-weight:800!important;text-transform:none!important;letter-spacing:0!important;padding-left:26px!important;padding-right:26px!important;box-shadow:0 10px 22px rgba(27,63,32,.18)}' +
    '.type-detail .p-to-cart-block .add-to-cart-button:hover{background:' + L + '!important;border-color:' + L + '!important}' +
    '.type-detail .p-to-cart-block .quantity{border-radius:999px!important;overflow:hidden;border:1px solid ' + LINE + '!important}' +
    '.type-detail .p-to-cart-block .quantity input,.type-detail .p-to-cart-block .quantity button{border:0!important;background:#fff!important;color:' + G + '!important;font-weight:700}' +
    '.type-detail .p-final-price-wrapper .price-final,.type-detail .p-final-price-wrapper .price-final strong{color:' + G + '!important;font-weight:800!important}' +
    '.type-detail .price-save{background:#eef6e6;color:' + G + '!important;border-radius:999px;padding:2px 10px;font-weight:700}' +
    /* --- 4) kategorie --- */
    '.type-category .category-title,.type-category h1,.type-detail h1,.type-page h1,.type-article h1,.type-posts-listing h1{color:' + G + '!important;font-weight:800!important}' +
    '.type-category .rs-cat-intro h2,.type-category .category-perex h2,.type-category .category-perex h3{color:' + G + '!important}' +
    '.subcategories.with-image{display:grid!important;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:14px;margin:18px 0 26px!important;padding:0!important}' +
    '.subcategories.with-image li{display:block!important;width:auto!important;max-width:none!important;flex:none!important;padding:0!important;margin:0!important}.subcategories.with-image li a{width:100%!important;max-width:none!important;box-sizing:border-box}' +
    '.subcategories.with-image li a{display:flex!important;flex-direction:column;align-items:center;justify-content:center;gap:10px;height:100%;min-height:128px;padding:16px 12px!important;background:#fff!important;border:1px solid ' + LINE + '!important;border-radius:18px!important;box-shadow:var(--rs-shadow);color:' + G + '!important;font-weight:700;font-size:14.5px;line-height:1.25;text-align:center;text-decoration:none!important}' +
    '.subcategories.with-image .image{display:grid!important;place-items:center;width:100%;height:56px;margin:0!important}' +
    '.subcategories.with-image .image img{max-width:120px!important;max-height:52px!important;width:auto!important;height:auto!important;object-fit:contain}' +
    '.subcategories.with-image .text{padding:0!important;margin:0!important}' +
    '@media(max-width:560px){.subcategories.with-image{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.subcategories.with-image li a{min-height:108px;font-size:13.5px}}' +
    '#filters{background:#fff;border:1px solid ' + LINE + ';border-radius:20px;padding:6px 18px 12px;box-shadow:0 8px 22px rgba(27,63,32,.06)}' +
    '#filters h4,#filters h4 span{color:' + G + '!important;font-weight:800!important;font-size:15px!important;text-transform:none!important}' +
    '#filters .filter-section{border-color:' + LINE + '!important}' +
    '#filters input[type=checkbox]{-webkit-appearance:none;appearance:none;width:20px;height:20px;min-width:20px;border:2px solid #b9cfa9;border-radius:50%;background:#fff;margin:0 8px 0 0!important;vertical-align:middle;position:relative;cursor:pointer;transition:border-color .15s,background .15s}' +
    '#filters input[type=checkbox]:hover{border-color:' + G + '}' +
    '#filters input[type=checkbox]:checked{background:' + G + ';border-color:' + G + '}' +
    '#filters input[type=checkbox]:checked::after{content:"";position:absolute;left:6px;top:2px;width:5px;height:10px;border:solid #fff;border-width:0 2px 2px 0;transform:rotate(45deg)}' +
    '#filters input[type=checkbox]:focus-visible{outline:3px solid rgba(134,187,65,.45);outline-offset:2px}' +
    '#filters .filter-label::before,#filters .filter-label::after{display:none!important}' +
    '#filters .ui-slider{height:5px!important;border:0!important;border-radius:5px!important;background:' + LINE + '!important;margin:14px 10px 12px!important}' +
    '#filters .ui-slider .ui-slider-range{background:' + L + '!important;border-radius:5px}' +
    '#filters .ui-slider .ui-slider-handle{width:22px!important;height:22px!important;top:-9px!important;margin-left:-11px!important;border-radius:50%!important;background:#fff!important;border:3px solid ' + G + '!important;box-shadow:0 3px 8px rgba(0,0,0,.18)!important;cursor:pointer}' +
    '#filters .slider-header{font-weight:700;color:' + G + ';font-size:14px}' +
    '#filters .parametric-slider-input{border:1px solid ' + LINE + '!important;border-radius:999px!important;text-align:center;font-weight:700;color:' + G + ';height:34px}' +
    '#filters .parametric-slider-submit-btn{border-radius:999px!important;background:' + G + '!important;border-color:' + G + '!important;font-weight:700}' +
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
    /* --- 5) patička (vlastní rozložení podle e-shopů ESHOP BOOSTER: 4 sloupce + pruh plateb) --- */
    '#footer{background:' + G + '!important;color:#e9f1e3;border-radius:28px 28px 0 0;margin-top:40px;overflow:hidden}' +
    '#footer .socials-block,#footer .footer-symbol,#footer .footer-rows{display:none!important}' +
    '#footer a{color:#e9f1e3!important;text-decoration:none!important}#footer a:hover{color:' + L + '!important}' +
    '.rs-foot{max-width:1320px;margin:0 auto;padding:44px 24px 10px;box-sizing:border-box}' +
    '.rs-foot__help{display:flex;align-items:center;gap:20px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.14);border-radius:22px;padding:18px 22px;margin-bottom:38px}' +
    '.rs-foot__help img{width:72px;height:72px;border-radius:50%;object-fit:cover;border:3px solid ' + L + ';flex:0 0 72px}' +
    '.rs-foot__help b{display:block;color:#fff;font-size:19px;font-weight:800;margin-bottom:2px}.rs-foot__help p{margin:0;color:#c9d8c2;font-size:14.5px}' +
    '.rs-foot__help .rs-foot__btns{margin-left:auto;display:flex;gap:10px;flex-wrap:wrap}' +
    '.rs-foot__btn{display:inline-flex;align-items:center;gap:8px;border-radius:999px;padding:10px 18px;font-weight:700;font-size:15px;white-space:nowrap}' +
    '#footer .rs-foot__btn--p{background:#fff;color:' + G + '!important}#footer .rs-foot__btn--p:hover{background:' + L + ';color:#fff!important}' +
    '#footer .rs-foot__btn--s{border:1px solid rgba(255,255,255,.5)}' +
    '.rs-foot__btn svg,.rs-foot__soc svg{width:17px;height:17px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}' +
    '.rs-foot__cols{display:grid;grid-template-columns:1.25fr 1fr 1fr 1fr;gap:32px}' +
    '.rs-foot__h{color:#fff;font-size:16px;font-weight:800;margin:0 0 14px}' +
    '.rs-foot ul{list-style:none;margin:0;padding:0}.rs-foot li{padding:4px 0;font-size:15px}' +
    '.rs-foot__logo img{height:54px;width:auto;display:block;margin-bottom:14px}' +
    '.rs-foot__about{color:#c9d8c2;font-size:14.5px;line-height:1.6;margin:0 0 16px}' +
    '.rs-foot__socs{display:flex;gap:10px}.rs-foot__soc{width:38px;height:38px;border-radius:50%;display:grid;place-items:center;background:rgba(255,255,255,.1)}' +
    '#footer .rs-foot__soc:hover{background:' + L + ';color:#fff!important}.rs-foot__soc svg{fill:currentColor;stroke:none}' +
    '.rs-foot__heu{display:flex;align-items:center;gap:12px;margin:0 0 16px;padding:10px 14px 10px 10px;border-radius:18px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.14);width:max-content;max-width:100%}' +
    '.rs-foot__heu img{width:58px;height:58px;flex:0 0 58px}.rs-foot__heu>span{display:flex;flex-direction:column;line-height:1.3}.rs-foot__stars{color:#f5b301;font-size:15px;letter-spacing:1px}.rs-foot__stars i{color:#fff;font-style:normal;letter-spacing:0;font-size:14px;margin-left:4px}.rs-foot__cnt{color:#e9f1e3;font-size:14px;font-weight:600}' +
    '.rs-foot__contact li{display:flex;align-items:center;gap:8px}.rs-foot__contact li.ic::before{display:none!important}.rs-foot__contact li.ic a{display:inline-flex;align-items:center;gap:8px;font-weight:700}' +
    '.rs-foot__contact svg{width:16px;height:16px;flex:0 0 16px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}' +
    '.rs-foot__pay{display:flex;align-items:center;flex-wrap:wrap;gap:10px 14px;border-top:1px solid rgba(255,255,255,.14);margin-top:34px;padding:20px 0 6px;font-size:14px;color:#c9d8c2}' +
    '.rs-foot__pay b{color:#fff;margin-right:4px}' +
    '.rs-foot__logos{display:inline-flex;align-items:center;gap:16px;background:#fff;border-radius:999px;padding:7px 18px}.rs-foot__logos img{height:22px;width:auto;display:block}.rs-foot__logos img.mc{height:26px}.rs-foot__logos img.ap,.rs-foot__logos img.gp{height:24px}' +
    '.rs-foot__pay span.t{background:rgba(255,255,255,.1);border-radius:999px;padding:6px 12px}' +
    '#footer .footer-bottom{border-top:1px solid rgba(255,255,255,.14);padding:14px 24px!important;color:#c9d8c2;font-size:13px;background:transparent!important}' +
    '#footer .footer-bottom a,#footer .footer-bottom strong{color:#c9d8c2!important}#footer #signature img{filter:grayscale(1) brightness(1.8);opacity:.7}' +
    '@media(max-width:991px){.rs-foot__cols{grid-template-columns:1fr 1fr}.rs-foot__help{flex-wrap:wrap}.rs-foot__help .rs-foot__btns{margin-left:0;width:100%}}' +
    '@media(max-width:560px){.rs-foot{padding:32px 16px 6px}.rs-foot__cols{grid-template-columns:1fr;gap:26px}.rs-foot__help{padding:16px}.rs-foot__help img{width:56px;height:56px;flex-basis:56px}.rs-foot__btn{flex:1;justify-content:center}}' +
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
      '<span class="rs-topbar__links"><span class="rs-topbar__who"><img src="' + FOTO + '" alt="" width="26" height="26">Poradí vám Michael</span><a href="tel:' + TEL + '">' + ICON.tel + '<span>' + TELT + '</span></a>' +
      '<a class="rs-topbar__mail" href="mailto:' + MAIL + '" aria-label="E-mail ' + MAIL + '">' + ICON.mail + '<span>' + MAIL + '</span></a>' +
      '<a class="rs-topbar__kontakt" href="/kontakty/">Kontakty</a></span></div>';
    if (getComputedStyle(h).position === 'fixed') {
      /* mobil: hlavička je fixní → lišta pod ní */
      var pad = parseFloat(getComputedStyle(h.parentNode).paddingTop) || 0;
      d.style.marginTop = Math.max(0, h.offsetHeight - pad) + 'px';
      h.parentNode.insertBefore(d, h.nextSibling);
      /* výška hlavičky se po načtení stylů mění → přepočítat, aby lišta nezajela pod hlavičku */
      var fix = function () { var m = parseFloat(d.style.marginTop) || 0; var top = d.getBoundingClientRect().top + window.pageYOffset - m; var need = Math.max(0, h.getBoundingClientRect().bottom + (window.pageYOffset ? 0 : 0) - (top - window.pageYOffset)); if (window.pageYOffset < 5) d.style.marginTop = need + 'px'; };
      fix(); setTimeout(fix, 600); window.addEventListener('load', function () { fix(); setTimeout(fix, 1200); });
    } else h.parentNode.insertBefore(d, h);
  }

  /* filtry: na desktopu rozbalit, na mobilu nechat sbalené */
  function filtersOpen() {
    if (!window.matchMedia('(min-width: 992px)').matches) return;
    var hidden = [].some.call(document.querySelectorAll('#filters .filter-section-parametric, #filters .filter-section-manufacturer'), function (s) { return s.offsetHeight === 0; });
    var b = document.querySelector('#filters .filter-section-button .toggle-filters');
    if (!hidden || !b || b.offsetParent === null) return;
    if ((+b.dataset.rsTries || 0) > 6) return;
    b.dataset.rsTries = (+b.dataset.rsTries || 0) + 1; b.click();
    /* Shoptet si obsluhu tlačítka váže až po načtení – když klik ještě nezabral, zkusit znovu */
    setTimeout(filtersOpen, 600);
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
      var box = document.createElement('div'); box.className = 'rs-range'; sec.classList.add('rs-has-range');
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

  /* patička: vlastní rozložení. Odkazy „Informace pro vás“ se berou z původní patičky Shoptetu,
     takže úprava článků v adminu se projeví i tady. */
  var PAY = 'https://cdn.myshoptet.com/usr/www.robotisekacky.cz/user/documents/upload/';
  var SOC = {
    facebook: '<svg viewBox="0 0 24 24"><path d="M14 8h3V4h-3c-2.8 0-4 1.7-4 4.2V10H7v4h3v8h4v-8h3l1-4h-4V8.6c0-.4.3-.6.6-.6z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24"><path d="M12 7.3a4.7 4.7 0 1 0 0 9.4 4.7 4.7 0 0 0 0-9.4zm0 7.7a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm6-7.9a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0zM12 3.6c2.7 0 3 0 4.1.1 2.7.1 4 1.4 4.1 4.1.1 1 .1 1.4.1 4.1s0 3-.1 4.1c-.1 2.7-1.4 4-4.1 4.1-1 .1-1.4.1-4.1.1s-3 0-4.1-.1c-2.7-.1-4-1.4-4.1-4.1C3.7 15 3.6 14.7 3.6 12s0-3 .1-4.1c.1-2.7 1.4-4 4.1-4.1 1-.1 1.4-.1 4.2-.1z"/></svg>',
    youtube: '<svg viewBox="0 0 24 24"><path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8zM10 15V9l5.2 3z"/></svg>'
  };
  function footer() {
    var f = document.getElementById('footer'); if (!f || f.querySelector('.rs-foot')) return;
    var esc = function (t) { return String(t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
    var arts = [].map.call(f.querySelectorAll('.custom-footer__articles a'), function (a) { return [a.textContent.trim(), a.getAttribute('href')]; });
    var poradime = /jak-vybrat|blog|kontakty|hodnoceni/;
    var nakup = arts.filter(function (x) { return !poradime.test(x[1]); });
    var rady = arts.filter(function (x) { return poradime.test(x[1]); });
    var li = function (x) { return '<li><a href="' + esc(x[1]) + '">' + esc(x[0]) + '</a></li>'; };
    var socs = [].map.call(f.querySelectorAll('.custom-footer__contact a[href*="facebook"],.custom-footer__contact a[href*="instagram"],.custom-footer__contact a[href*="youtube"]'), function (a) {
      var k = /facebook/.test(a.href) ? 'facebook' : /instagram/.test(a.href) ? 'instagram' : 'youtube';
      return '<a class="rs-foot__soc" href="' + esc(a.href) + '" target="_blank" rel="noopener" aria-label="' + k + '">' + SOC[k] + '</a>';
    }).join('');
    var logo = (f.querySelector('.custom-footer__banner9 img') || {}).src || '';
    var isHome = document.body.classList.contains('in-index');
    var box = document.createElement('div'); box.className = 'rs-foot';
    box.innerHTML = (isHome ? '' :
      '<div class="rs-foot__help"><img src="' + FOTO + '" alt="Michael Boháček" loading="lazy" width="72" height="72"><div><b>Potřebujete poradit s výběrem?</b><p>Zavolejte nebo napište – poradíme podle vaší zahrady, bytu nebo bazénu. Michael Boháček, majitel</p></div>' +
      '<div class="rs-foot__btns"><a class="rs-foot__btn rs-foot__btn--p" href="tel:' + TEL + '">' + ICON.tel + TELT + '</a><a class="rs-foot__btn rs-foot__btn--s" href="mailto:' + MAIL + '">' + ICON.mail + 'Napsat e-mail</a></div></div>') +
      '<div class="rs-foot__cols">' +
      '<div><a class="rs-foot__logo" href="/">' + (logo ? '<img src="' + esc(logo) + '" alt="Robotí Sekačky" loading="lazy">' : '') + '</a>' +
      '<p class="rs-foot__about">Robotické sekačky, robotické vysavače a bazénové vysavače s instalací, zprovozněním a servisem. Roboty známe, sami je instalujeme a poradíme.</p>' +
      '<a class="rs-foot__heu" href="/hodnoceni-obchodu/"><img src="https://cdn.myshoptet.com/usr/www.robotisekacky.cz/user/banners/logo-overeno--gold.svg?69c559fe" alt="Ověřeno zákazníky – Heureka" width="58" height="58" loading="lazy"><span><b class="rs-foot__stars">★★★★★ <i>5,0 z 5</i></b><span class="rs-foot__cnt">400+ ověřených hodnocení</span></span></a>' +
      '<div class="rs-foot__socs">' + socs + '</div></div>' +
      '<div><p class="rs-foot__h">Naše služby</p><ul>' +
      '<li><a href="/instalace-sekacek/">Instalace robotických sekaček</a></li>' +
      '<li><a href="/zprovozneni-robotickeho-vysavace/">Zprovoznění robotického vysavače</a></li>' +
      '<li><a href="/predvedeni-bazenovych-vysavacu/">Předvedení bazénových vysavačů</a></li>' +
      '<li><a href="/zimni-servis-a-cisteni-robota/">Zimní servis a čištění robota</a></li></ul></div>' +
      '<div><p class="rs-foot__h">Vše o nákupu</p><ul>' + nakup.map(li).join('') + '</ul></div>' +
      '<div><p class="rs-foot__h">Poradíme vám</p><ul class="rs-foot__contact">' + rady.map(li).join('') +
      '<li class="ic"><a href="tel:' + TEL + '">' + ICON.tel + TELT + '</a></li><li class="ic"><a href="mailto:' + MAIL + '">' + ICON.mail + MAIL + '</a></li></ul></div>' +
      '</div>' +
      '<div class="rs-foot__pay"><b>Platby:</b>' +
      '<span class="rs-foot__logos"><img src="' + PAY + 'mceclip2.png" alt="Visa" loading="lazy"><img class="mc" src="' + PAY + 'mceclip1.png" alt="Mastercard" loading="lazy">' +
      '<img class="ap" src="' + PAY + 'mceclip5.png" alt="Apple Pay" loading="lazy"><img class="gp" src="' + PAY + 'mceclip6.png" alt="Google Pay" loading="lazy"></span>' +
      '<span class="t">Převod s QR kódem</span><span class="t">Splátky a nákup na třetiny</span><span class="t">Platba u vás doma při instalaci</span>' +
      '<a href="/platby/" style="text-decoration:underline!important">Více o platbách</a></div>';
    try { fetch('https://raw.githubusercontent.com/Zirk0n/robotisekacky-widgety/main/data/recenze.json').then(function (r) { return r.json(); }).then(function (d) {
      if (!d || !d.celkem) return; var c = box.querySelector('.rs-foot__cnt'), i = box.querySelector('.rs-foot__stars i');
      if (c) c.textContent = d.celkem + ' ověřených hodnocení'; if (i && d.prumer) i.textContent = String(d.prumer).replace('.', ',') + ' z 5';
    }).catch(function () {}); } catch (e) {}
    var bottom = f.querySelector('.footer-bottom');
    f.insertBefore(box, bottom || null);
  }


  /* menu: obrázky podkategorií (data-image ze Shoptetu) + patička nabídky s kontaktem */
  /* počet hodnocení v pásku výhod (text banneru v Shoptetu má pevné „310+ recenzí“) → aktuální číslo z recenze.json */
  function benefitCount() {
    var items = [].filter.call(document.querySelectorAll('.benefitBanner__item'), function (i) { return /recenz|hodnocen/i.test(i.textContent) && !i.dataset.rsCnt; });
    if (!items.length) return;
    items.forEach(function (i) { i.dataset.rsCnt = 1; });
    try { fetch('https://raw.githubusercontent.com/Zirk0n/robotisekacky-widgety/main/data/recenze.json').then(function (r) { return r.json(); }).then(function (d) {
      if (!d || !d.celkem) return;
      items.forEach(function (it) {
        var w = document.createTreeWalker(it, NodeFilter.SHOW_TEXT), n;
        while ((n = w.nextNode())) { if (/\d[\d\s]*\+?\s*(recenz|hodnocen)/i.test(n.nodeValue)) n.nodeValue = n.nodeValue.replace(/\d[\d\s]*\+?(\s*)(recenz\S*|hodnocen\S*)/i, d.celkem + '$1hodnocení'); }
      });
    }).catch(function () {}); } catch (e) {}
  }
  /* vyprodané a ukončené produkty na konec výpisu (Michael 17. 10. 2026) – v rámci načtené stránky výpisu;
     jen při výchozím řazení (bez ?order= v adrese), aby se nerozbilo řazení podle ceny nebo abecedy */
  function soldOutLast() {
    if (/[?&]order=/.test(location.search)) return;
    var list = document.querySelector('#products'); if (!list) return;
    var items = [].slice.call(list.querySelectorAll(':scope > .product'));
    var out = items.filter(function (it) { var a = it.querySelector('.availability, .p-availability'); return a && /nedostupn|ukončen/i.test(a.textContent); });
    if (!out.length || out.length === items.length) return;
    var lastIn = items.filter(function (it) { return out.indexOf(it) < 0; }).pop();
    if (out.every(function (it) { return items.indexOf(it) > items.indexOf(lastIn); })) return; /* už jsou na konci */
    out.forEach(function (it) { list.appendChild(it); });
  }
  /* blok „Nejprodávanější“ nad výpisem nemá smysl, když má kategorie jen pár produktů */
  function topProducts() {
    var w = document.querySelector('.products-top-wrapper'); if (!w) return;
    var n = document.querySelectorAll('#products .product').length; if (n && n < 5) w.style.display = 'none';
  }
  function sealRating() {
    var a = document.querySelector('#header .heureka-header-seal'); if (!a || a.querySelector('.rs-seal')) return;
    var t = document.createElement('span'); t.className = 'rs-seal'; t.innerHTML = '<b>5,0 <i>★★★★★</i></b><span>400+ hodnocení</span>'; a.appendChild(t); try { window.dispatchEvent(new Event('resize')); } catch (e) {}
    try { fetch('https://raw.githubusercontent.com/Zirk0n/robotisekacky-widgety/main/data/recenze.json').then(function (r) { return r.json(); }).then(function (d) {
      if (d && d.celkem) { t.querySelector('span').textContent = d.celkem + ' hodnocení'; if (d.prumer) t.querySelector('b').firstChild.nodeValue = String(d.prumer).replace('.', ',') + ' '; }
    }).catch(function () {}); } catch (e) {}
  }
  var QUICK = [
    ['/roboticke-bezdratove-sekacky/', [['Do svahu (AWD od 65 %)', '?pv40=663,672,730,2264,2258'], ['Velká zahrada 1 500 m²+', '?pv28=124,2148,2163,2252,136,2166,2169'], ['Do 1 000 m²', '?pv28=2142,154,2181,2130,2178'], ['Stromy a budovy (LiDAR/kamera)', '?pv34=2245,2136']]],
    ['/roboticke-vysavace/', [['Na zvířecí chlupy', '?pv186=636'], ['I vytírá', '?pv201=516&pv228=459'], ['Bez vysypávání', '?pv180=465'], ['Pod nízký nábytek', '?pv195=2643,2769,612,2563,2658']]],
    ['/bazenove-vysavace/', [['Zapuštěný bazén', '?pv913=2338'], ['Nadzemní bazén', '?pv913=2347'], ['Vodní linka', '?pv346=991'], ['Listí na hladině', '?pv907=2302']]]
  ];
  function megaMenu() {
    [].forEach.call(document.querySelectorAll('#navigation .menu-level-1>li.ext'), function (li) {
      var ul = li.querySelector(':scope>.menu-level-2'); if (!ul || ul.classList.contains('rs-mega')) return;
      ul.classList.add('rs-mega');
      [].forEach.call(ul.querySelectorAll(':scope>li>a'), function (a) {
        if (a.querySelector('.rs-mega__img')) return; var src = a.getAttribute('data-image');
        var w = document.createElement('span'); w.className = 'rs-mega__img';
        if (!src) return; w.innerHTML = '<img src="' + src + '" alt="" loading="lazy">';
        a.insertBefore(w, a.firstChild);
      });
      var top = li.querySelector(':scope>a');
      /* rychlé odkazy „Podle potřeby“ do filtrů (Michael 17. 10. 2026) – ID hodnot viz playbooky/webove-stranky/bannery-a-homepage.md */
      var href = top ? top.getAttribute('href') || '' : '';
      var q = QUICK.filter(function (x) { return href.indexOf(x[0]) > -1; })[0];
      if (q) {
        var qi = document.createElement('li'); qi.className = 'rs-mega__quick';
        qi.innerHTML = '<b>Podle potřeby</b>' + q[1].map(function (c) { return '<a href="' + q[0] + c[1] + '">' + c[0] + '</a>'; }).join('');
        ul.appendChild(qi);
      }
      var f = document.createElement('li'); f.className = 'rs-mega__foot';
      f.innerHTML = '<a href="' + (top ? top.getAttribute('href') : '/') + '">Zobrazit vše →</a><span>Nevíte si rady? <a href="tel:' + TEL + '">' + TELT + '</a></span>';
      ul.appendChild(f);
    });
    var nav = document.getElementById('navigation');
    if (nav && !nav.querySelector('.rs-navcontact')) {
      var c = document.createElement('div'); c.className = 'rs-navcontact';
      c.innerHTML = '<b>Poradíme s výběrem</b><a href="tel:' + TEL + '">' + ICON.tel + TELT + '</a><a href="mailto:' + MAIL + '">' + ICON.mail + MAIL + '</a><a href="/kontakty/">Kontakty →</a>';
      (nav.querySelector('.navigation-in') || nav).appendChild(c);
    }
    var h = document.getElementById('header');
    if (h && !h.dataset.rsScroll) { h.dataset.rsScroll = 1; var on = function () { h.classList.toggle('rs-scrolled', window.scrollY > 40); }; window.addEventListener('scroll', on, { passive: true }); on(); }
  }

  function run() { css(); topbar(); sealRating(); megaMenu(); footer(); filtersOpen(); sliders(); benefitCount(); topProducts(); soldOutLast(); }
  window.addEventListener('load', function () { setTimeout(filtersOpen, 300); setTimeout(sealRating, 300); setTimeout(sealRating, 2500); });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run); else run();
  /* Shoptet po AJAXu filtrů přepisuje obsah → znovu */
  var mo = new MutationObserver(function () { clearTimeout(mo.t); mo.t = setTimeout(function () { filtersOpen(); sliders(); soldOutLast(); }, 120); });
  function watch() { var c = document.getElementById('content') || document.body; mo.observe(c, { childList: true, subtree: true }); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', watch); else watch();
})();
