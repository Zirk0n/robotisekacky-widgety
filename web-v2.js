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
    '.products-block .slick-list,.products-block .slick-track{float:none!important;clear:both}.products-block.slick-slider::after{content:"";display:table;clear:both}' +
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
    /* --- 17. 10. odpoledne: drobnosti z kontroly Michaela --- */
    '#category-header{border-bottom:0!important}' + /* zbytečná linka pod tlačítky řazení */
    '.order-summary .order-recapitulation{border:0!important;box-shadow:none!important;background:none!important;padding:0!important;border-radius:0!important;margin:0!important}.order-summary .recapitulation-single{border-bottom:1px solid ' + LINE + '!important;padding:12px 0!important}' +
    '.ordering-process .form-control,.ordering-process input[type=text],.ordering-process input[type=email],.ordering-process input[type=tel],.ordering-process input[type=password],.ordering-process select,.ordering-process textarea{border:1px solid ' + LINE + '!important;border-radius:12px!important;background:#fff!important;box-shadow:inset 0 1px 2px rgba(27,63,32,.05)!important;min-height:46px;transition:border-color var(--rs-ease),box-shadow var(--rs-ease)}' +
    '.ordering-process .form-control:focus,.ordering-process input:focus,.ordering-process select:focus,.ordering-process textarea:focus{border-color:' + L + '!important;box-shadow:0 0 0 3px rgba(134,187,65,.25)!important;outline:0!important}' +
    '.ordering-process .login-button,.ordering-process .btn-secondary{border:1px solid ' + G + '!important;color:' + G + '!important;background:#fff!important;border-radius:var(--rs-pill)!important;text-transform:none!important;letter-spacing:0!important;font-weight:700!important;padding:11px 22px!important}.ordering-process .login-button:hover{background:' + G + '!important;color:#fff!important}' +
    /* zaškrtávátka v objednávce: Shoptet kreslí vlastní čtvereček přes label::before → nativní input jen schovat (18. 10.: byly zdvojené) */
    '.ordering-process input[type=checkbox]{position:absolute!important;opacity:0!important;width:1px!important;height:1px!important;margin:0!important;pointer-events:none}' +
    '.ordering-process input[type=checkbox]+label::before{border-radius:5px!important;border-color:#b9c9ad!important;background-color:#fff!important}' +
    '.ordering-process input[type=checkbox]:checked+label::before{background-color:' + G + '!important;border-color:' + G + '!important}' +
    '.ordering-process input[type=checkbox]:focus-visible+label::before{box-shadow:0 0 0 3px rgba(134,187,65,.35)}' +
    /* krok 3 – souhlasy (18. 10., Michael: táhnout k tomu, co potřebujeme): souhlas s podmínkami jako výrazná karta,
       odhlášení dotazníků (Zboží, Heureka, hodnocení produktů) nenápadně a s vysvětlením, proč nám pomáhají */
    '.ordering-process .form-group:has(> input[name="consents[]"]){padding:14px 16px;border:2px solid ' + L + ';border-radius:16px;background:#f6faf1;margin:6px 0 14px!important}' +
    '.ordering-process input[name="consents[]"]+label{font-weight:700!important;color:' + G + '!important;font-size:15.5px!important}' +
    '.ordering-process .form-group:has(> input[name="consents[]"]):has(> input:checked){border-color:' + G + ';background:#eef6e6}' +
    '.ordering-process .form-group:has(> #consentszboziConsent),.ordering-process .form-group:has(> #consentsheurekaConsent),.ordering-process .form-group:has(> #consentsproductRatingRequestOptOut){opacity:.72;margin:2px 0!important}' +
    '.ordering-process #consentszboziConsent+label,.ordering-process #consentsheurekaConsent+label,.ordering-process #consentsproductRatingRequestOptOut+label{font-size:12.5px!important;color:#6b7a69!important;font-weight:400!important}' +
    '.rs-optout-note{font-size:13px;color:#4f5d4c;margin:14px 0 4px;padding-left:2px}.rs-optout-note b{color:' + G + '}' +
    /* košík – dárek zdarma výrazněji */
    '.free-product-gifts-wrapper .free-product-gifts>li,.free-product-gifts>li{position:relative;border:2px solid #f2c94c!important;border-radius:16px!important;background:linear-gradient(135deg,#fffaf0,#fff3d6)!important;padding:14px 16px 14px 16px!important;box-shadow:0 10px 24px rgba(242,201,76,.25)}' +
    '.free-product-gifts>li::before{content:"🎁 Dárek zdarma k vaší objednávce";display:block;font-weight:800;color:#8a5a00;font-size:14px;margin:0 0 6px}' +
    '.free-gift-name{font-weight:700;color:#3d3a2a}' +
    '.ordering-process .next-step-finish,.ordering-process .btn-conversion{background:' + G + '!important;border:0!important;border-radius:var(--rs-pill)!important;color:#fff!important}' +
    '.co-box h4,.co-box .h4,.ordering-process .co-box label,.ordering-process .co-box label *,.ordering-process .radio-wrapper *{text-transform:none!important;letter-spacing:0!important}' +
    '.type-detail .p-code,.type-detail .p-detail-info .p-code{font-size:11px!important;color:#a3ab9f!important;font-weight:400!important}.type-detail .p-code span{font-weight:400!important}' +
    /* --- 18. 10.: jednotné najetí v menu (dřív se míchalo bílé pozadí + stín + světle zelené + zvýrazněný sloupec) --- */
    '#navigation .menu-level-1>li>a,#header .menu-helper>span,#navigation .rs-mega>li>a,#header .menu-helper a{transition:background-color .15s,color .15s!important;transform:none!important}' +
    '#navigation .menu-level-1>li:hover>a,#navigation .menu-level-1>li.exp>a,#navigation .menu-level-1>li>a:focus,#header .menu-helper:hover>span{background:#eef6e6!important;color:' + G + '!important;box-shadow:none!important;transform:none!important}' +
    '#navigation .rs-mega>li:not(.rs-mega__foot)>a:hover,#navigation .rs-mega .menu-level-3 a:hover,#header .menu-helper .menu-level-2>li>a:hover,#header .menu-helper>ul>li>a:hover{background:#f2f7ec!important;color:' + G + '!important;box-shadow:none!important;transform:none!important}' +
    '#header .menu-helper>ul>li:hover,#header .menu-helper>ul>li{background:transparent!important}' +
    '#navigation a:hover,#header .menu-helper a:hover{color:' + G + '!important}' +
    /* --- texty kategorií rs-cat-* (18. 10.): jednotný vzhled z CDN místo inline <style> v každém popisu; tokeny webu, šipky jako CSS chevron --- */
    'body:not(.rs-cat-blue) .rs-cat-intro,body:not(.rs-cat-blue) .rs-cat-guide{color:#2b3328;line-height:1.62}body:not(.rs-cat-blue) .rs-cat-intro{margin:18px 0 30px}' +
    'body:not(.rs-cat-blue) .rs-cat-intro h2{font-size:32px;line-height:1.18;color:' + G + ';font-weight:800;margin:0 0 14px}body:not(.rs-cat-blue) .rs-cat-intro>p{font-size:17px;margin:0 0 16px}body:not(.rs-cat-blue) .rs-cat-intro strong,body:not(.rs-cat-blue) .rs-cat-guide strong{color:' + G + '}' +
    'body:not(.rs-cat-blue) .rs-cat-topgrid,body:not(.rs-cat-blue) .rs-cat-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin:20px 0}' +
    'body:not(.rs-cat-blue) .rs-cat-topitem,body:not(.rs-cat-blue) .rs-cat-mini,body:not(.rs-cat-blue) .rs-cat-more,body:not(.rs-cat-blue) .rs-cat-card{border:1px solid ' + LINE + ';border-radius:20px;background:#fff;box-shadow:0 12px 28px rgba(27,63,32,.07);clip-path:none}' +
    'body:not(.rs-cat-blue) .rs-cat-topitem{position:relative;min-height:0;padding:20px 58px 18px 20px;overflow:hidden;cursor:pointer;transition:box-shadow .2s,border-color .2s;transform:none}' +
    'body:not(.rs-cat-blue) .rs-cat-topitem:hover,body:not(.rs-cat-blue) .rs-cat-topitem:focus-within,body:not(.rs-cat-blue) .rs-cat-topitem.is-open{transform:none;border-color:#cfe3bd;box-shadow:0 16px 34px rgba(27,63,32,.11)}' +
    'body:not(.rs-cat-blue) .rs-cat-topitem strong,body:not(.rs-cat-blue) .rs-cat-mini strong{display:block;color:' + G + ';font-size:19px;font-weight:800;line-height:1.2;margin:0 0 8px}' +
    'body:not(.rs-cat-blue) .rs-cat-topitem span{display:block;max-height:74px;overflow:hidden;color:#3d4a3d;font-size:15.5px;transition:max-height .25s}' +
    'body:not(.rs-cat-blue) .rs-cat-topitem.is-open span,body:not(.rs-cat-blue) .rs-cat-topitem:hover span,body:not(.rs-cat-blue) .rs-cat-topitem:focus-within span{max-height:240px}' +
    /* tlačítko se znakem „⌄“ → čistá šipka (chevron) */
    'body:not(.rs-cat-blue) .rs-cat-topitem button{position:absolute;right:16px;top:22px;transform:none;width:32px;height:32px;border-radius:50%;border:1px solid ' + LINE + ';background:#f2f7ec;font-size:0!important;color:transparent;box-shadow:none;cursor:pointer;padding:0;transition:background .15s}' +
    'body:not(.rs-cat-blue) .rs-cat-topitem button::before,body:not(.rs-cat-blue) .rs-cat-more summary::after,body:not(.rs-cat-blue) .rs-cat-faq summary::after{content:"";position:absolute;left:50%;top:50%;width:8px;height:8px;border:solid ' + G + ';border-width:0 2px 2px 0;transform:translate(-50%,-70%) rotate(45deg);transition:transform .2s;background:none;border-radius:0}' +
    'body:not(.rs-cat-blue) .rs-cat-topitem.is-open button::before,body:not(.rs-cat-blue) .rs-cat-topitem:hover button::before,body:not(.rs-cat-blue) .rs-cat-more[open] summary::after,body:not(.rs-cat-blue) .rs-cat-faq details[open] summary::after{transform:translate(-50%,-30%) rotate(-135deg)}' +
    'body:not(.rs-cat-blue) .rs-cat-topitem.is-open button,body:not(.rs-cat-blue) .rs-cat-topitem:hover button{transform:none;background:#e3eed8}' +
    'body:not(.rs-cat-blue) .rs-cat-more{overflow:hidden;margin:16px 0}body:not(.rs-cat-blue) .rs-cat-more summary,body:not(.rs-cat-blue) .rs-cat-faq summary{list-style:none;cursor:pointer;position:relative;color:' + G + ';font-weight:800}' +
    'body:not(.rs-cat-blue) .rs-cat-more summary{padding:16px 58px 16px 20px;font-size:17px}body:not(.rs-cat-blue) .rs-cat-more summary::-webkit-details-marker,body:not(.rs-cat-blue) .rs-cat-faq summary::-webkit-details-marker{display:none}' +
    'body:not(.rs-cat-blue) .rs-cat-more summary::after{left:auto;right:24px}body:not(.rs-cat-blue) .rs-cat-more summary::before,body:not(.rs-cat-blue) .rs-cat-faq summary::before{content:"";position:absolute;right:16px;top:50%;width:32px;height:32px;margin-top:-16px;border-radius:50%;background:#f2f7ec;border:1px solid ' + LINE + '}' +
    'body:not(.rs-cat-blue) .rs-cat-more summary::after{content:"";width:8px;height:8px;display:block;z-index:1}body:not(.rs-cat-blue) .rs-cat-more p{padding:0 20px 18px;margin:0;color:#3d4a3d}' +
    'body:not(.rs-cat-blue) .rs-cat-guide{margin:36px 0}body:not(.rs-cat-blue) .rs-cat-card,body:not(.rs-cat-blue) .rs-cat-cta{position:relative;padding:24px;margin:18px 0}' +
    'body:not(.rs-cat-blue) .rs-cat-guide h2{color:' + G + ';font-size:28px;font-weight:800;line-height:1.2;margin:0 0 14px}body:not(.rs-cat-blue) .rs-cat-guide h3{color:' + G + ';margin:0 0 8px}body:not(.rs-cat-blue) .rs-cat-guide p{font-size:16.5px;margin:0 0 14px;color:#3d4a3d}' +
    'body:not(.rs-cat-blue) .rs-cat-intro p a,body:not(.rs-cat-blue) .rs-cat-guide p a,body:not(.rs-cat-blue) .rs-cat-more a{color:' + G + '!important;font-weight:700;text-decoration:underline;text-decoration-color:' + L + ';text-decoration-thickness:2px;text-underline-offset:3px}body:not(.rs-cat-blue) .rs-cat-cta p a{color:#fff!important;text-decoration-color:rgba(255,255,255,.6)}' +
    'body:not(.rs-cat-blue) .rs-cat-mini{padding:18px}body:not(.rs-cat-blue) .rs-cat-mini span{color:#3d4a3d}' +
    /* FAQ: otázky jako řádky se šipkou (dřív holé texty bez značky) */
    'body:not(.rs-cat-blue) .rs-cat-faq details{border-top:1px solid ' + LINE + ';padding:0}body:not(.rs-cat-blue) .rs-cat-faq details:first-of-type{border-top:0}' +
    'body:not(.rs-cat-blue) .rs-cat-faq summary{padding:14px 56px 14px 0;font-size:16.5px}body:not(.rs-cat-blue) .rs-cat-faq summary::after{left:auto;right:24px;z-index:1}body:not(.rs-cat-blue) .rs-cat-faq details p{margin:0 0 14px;padding-right:40px}' +
    'body:not(.rs-cat-blue) .rs-cat-cta{border-radius:20px;border:0;background:linear-gradient(135deg,' + G + ',#4f8a2a);color:#fff;box-shadow:0 18px 40px rgba(27,63,32,.22);clip-path:none}' +
    'body:not(.rs-cat-blue) .rs-cat-cta h2,body:not(.rs-cat-blue) .rs-cat-cta p{color:#fff!important}body:not(.rs-cat-blue) .rs-cat-cta a{color:#fff!important;font-weight:800}' +
    'body:not(.rs-cat-blue) .rs-cat-contact{display:flex;flex-wrap:wrap;gap:10px;margin:16px 0 0!important}' +
    'body:not(.rs-cat-blue) .rs-cat-contact a{display:inline-flex;align-items:center;gap:8px;padding:11px 18px;border-radius:999px;background:#fff;border:0;color:' + G + '!important;text-decoration:none!important;font-weight:800;white-space:nowrap;box-shadow:none;transition:background .15s}body:not(.rs-cat-blue) .rs-cat-contact a:hover{background:#eef6e6;transform:none}' +
    /* recenze v kategoriích */
    'body:not(.rs-cat-blue) .rs-cat-reviews{position:relative;margin:24px 0 8px;padding:22px 22px 30px;border-radius:24px;clip-path:none;border:1px solid ' + LINE + ';background:linear-gradient(160deg,#fff 0,#f4f9ef 100%);box-shadow:0 14px 32px rgba(27,63,32,.08);overflow:hidden}' +
    'body:not(.rs-cat-blue) .rs-cat-reviews::before{display:none}body:not(.rs-cat-blue) .rs-review-head{display:flex;align-items:center;gap:16px;margin:0 120px 16px 0}' +
    'body:not(.rs-cat-blue) .rs-review-badge{width:68px;height:68px;flex:0 0 68px;border-radius:18px;background:#fff;box-shadow:0 8px 20px rgba(27,63,32,.08);display:flex;align-items:center;justify-content:center}body:not(.rs-cat-blue) .rs-review-badge img{width:58px;height:58px}' +
    'body:not(.rs-cat-blue) .rs-review-title{margin:0;color:' + G + ';font-size:24px;font-weight:800;line-height:1.16}body:not(.rs-cat-blue) .rs-review-sub{margin:6px 0 0;color:#3d4a3d;font-size:15px}body:not(.rs-cat-blue) .rs-review-sub a{color:' + G + ';font-weight:800}' +
    'body:not(.rs-cat-blue) .rs-review-controls{position:absolute;right:22px;top:28px;display:flex;gap:10px}' +
    'body:not(.rs-cat-blue) .rs-review-btn{width:42px;height:42px;border-radius:50%;border:1px solid ' + LINE + ';background:#fff;color:transparent;font-size:0;position:relative;cursor:pointer;box-shadow:none;transition:background .15s}body:not(.rs-cat-blue) .rs-review-btn:hover{background:#eef6e6;transform:none}' +
    'body:not(.rs-cat-blue) .rs-review-btn::before{content:"";position:absolute;left:50%;top:50%;width:9px;height:9px;border:solid ' + G + ';border-width:0 2px 2px 0;transform:translate(-65%,-50%) rotate(-45deg)}body:not(.rs-cat-blue) .rs-review-btn[data-rs-review-prev]::before{transform:translate(-35%,-50%) rotate(135deg)}' +
    'body:not(.rs-cat-blue) .rs-review-window{overflow:hidden;padding:2px 0 26px}body:not(.rs-cat-blue) .rs-review-track{display:flex;gap:14px;transition:transform .42s ease}' +
    'body:not(.rs-cat-blue) .rs-review-card{flex:0 0 calc((100% - 28px)/3);min-height:200px;box-sizing:border-box;border:1px solid ' + LINE + ';border-radius:18px;background:#fff;box-shadow:0 8px 20px rgba(27,63,32,.06);padding:18px;text-decoration:none!important;color:#2b3328!important;display:flex;flex-direction:column;justify-content:space-between;transition:box-shadow .18s}body:not(.rs-cat-blue) .rs-review-card:hover{transform:none;box-shadow:0 14px 30px rgba(27,63,32,.11)}' +
    'body:not(.rs-cat-blue) .rs-review-stars{color:#F6A000;font-size:24px;letter-spacing:1px;line-height:1;margin:0 0 10px}body:not(.rs-cat-blue) .rs-review-text{font-size:16px;line-height:1.4;margin:0}body:not(.rs-cat-blue) .rs-review-author{font-size:13.5px;color:#6b7a69;margin-top:14px}' +
    'body:not(.rs-cat-blue) .rs-review-dots{position:absolute;left:50%;bottom:16px;transform:translateX(-50%);display:flex;gap:7px}body:not(.rs-cat-blue) .rs-review-dot{width:8px;height:8px;border-radius:999px;border:0;background:#d6e6c6;padding:0;cursor:pointer}body:not(.rs-cat-blue) .rs-review-dot.is-active{width:26px;background:' + L + '}' +
    '@media(max-width:991px){body:not(.rs-cat-blue) .rs-cat-topgrid,body:not(.rs-cat-blue) .rs-cat-grid{grid-template-columns:1fr}body:not(.rs-cat-blue) .rs-cat-intro h2{font-size:27px}body:not(.rs-cat-blue) .rs-review-head{margin-right:0;padding-right:100px}body:not(.rs-cat-blue) .rs-review-card{flex-basis:calc((100% - 14px)/2)}}' +
    '@media(max-width:767px){body:not(.rs-cat-blue) .rs-review-head{display:block;padding-right:0}body:not(.rs-cat-blue) .rs-review-badge{margin:0 0 10px}body:not(.rs-cat-blue) .rs-review-controls{position:static;margin:12px 0 0}body:not(.rs-cat-blue) .rs-review-card{flex-basis:86%}body:not(.rs-cat-blue) .rs-cat-contact a{width:100%;justify-content:center}}' +
    /* menu: informační stránky ve Více + průvodce výběrem sekačky v mega nabídce */
    '#header .menu-helper .rs-vice-info{display:flex!important;flex-direction:column;gap:2px;padding:6px!important;border-left:1px solid ' + LINE + '}' +
    '.rs-vice-info__h{font-weight:800;color:' + G + ';font-size:15px;padding:6px 8px}.rs-vice-info a{padding:5px 8px!important;font-size:13.5px!important;font-weight:600!important;color:' + G + '!important;border-radius:10px}.rs-vice-info a:hover{background:#f2f7ec!important}' +
    '#navigation .rs-mega>li.rs-mega__guide{grid-column:1/-1}#navigation .rs-mega>li.rs-mega__guide>a{display:flex!important;flex-wrap:wrap;align-items:baseline;gap:4px 10px;padding:12px 16px!important;border-radius:14px;background:#f2f7ec!important;border:1px solid ' + LINE + '}' +
    '#navigation .rs-mega__guide b{color:' + G + ';font-weight:800}#navigation .rs-mega__guide span{color:#3d4a3d;font-weight:600;font-size:13.5px}' +
    /* --- statické stránky rs-pg-* (O nás, Kontakty; 18. 10.) – obsah v Shoptetu bez inline stylů, vzhled odsud --- */
    '.rs-pg{color:#2b3328;line-height:1.62;font-size:16.5px}.rs-pg h2{color:' + G + ';font-weight:800;line-height:1.2;margin:0 0 14px}.rs-pg h3{color:' + G + ';font-weight:800;font-size:18px;margin:0 0 6px}' +
    '.rs-pg a:not(.rs-pg-btn):not(.rs-pg-contact){color:' + G + ';font-weight:700;text-decoration:underline;text-decoration-color:' + L + ';text-decoration-thickness:2px;text-underline-offset:3px}' +
    '.rs-pg-hero{display:grid;grid-template-columns:minmax(0,1.35fr) minmax(0,.9fr);gap:32px;align-items:center;padding:30px;border:1px solid ' + LINE + ';border-radius:24px;background:linear-gradient(160deg,#fff 0,#f2f7ec 100%);box-shadow:0 14px 34px rgba(27,63,32,.08);margin:6px 0 30px}' +
    '.rs-pg-hero h2{font-size:34px}.rs-pg-kicker{display:inline-block;margin:0 0 10px!important;padding:4px 12px;border-radius:999px;background:#e8f2dd;color:' + G + ';font-size:13px;font-weight:800}' +
    '.rs-pg-lead{font-size:17.5px;margin:0 0 18px}.rs-pg-hero-f{margin:0;position:relative}.rs-pg-hero-f img{width:100%;height:auto;aspect-ratio:1;object-fit:cover;border-radius:22px;box-shadow:0 18px 40px rgba(27,63,32,.18)}' +
    '.rs-pg-hero-f figcaption{position:absolute;left:14px;bottom:14px;background:rgba(255,255,255,.9);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);border-radius:14px;padding:8px 14px;font-size:13px;color:#3d4a3d}.rs-pg-hero-f figcaption strong{display:block;color:' + G + ';font-size:15px}' +
    '.rs-pg-hero-f--sm{max-width:300px;justify-self:end}' +
    '.rs-pg-btns{display:flex;flex-wrap:wrap;gap:10px;margin:0!important}.rs-pg-btn{display:inline-flex;align-items:center;gap:8px;padding:12px 20px;border-radius:999px;background:' + G + ';color:#fff!important;font-weight:800;text-decoration:none!important;transition:background .15s}.rs-pg-btn:hover{background:#2a5a30}' +
    '.rs-pg-btn--o{background:#fff;color:' + G + '!important;border:1px solid ' + LINE + '}.rs-pg-btn--o:hover{background:#eef6e6}.rs-pg-btn--w{background:#fff;color:' + G + '!important}.rs-pg-btn--w:hover{background:#eef6e6}.rs-pg-btn--wo{background:transparent;border:1px solid rgba(255,255,255,.6)}.rs-pg-btn--wo:hover{background:rgba(255,255,255,.15)}' +
    '.rs-pg-sec{margin:0 0 30px}.rs-pg-sec>h2{font-size:28px}' +
    '.rs-pg-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px}.rs-pg-card{display:block;padding:20px;border:1px solid ' + LINE + ';border-radius:20px;background:#fff;box-shadow:0 10px 24px rgba(27,63,32,.06);color:#2b3328!important;text-decoration:none!important}.rs-pg-card p{margin:0;font-size:15.5px}' +
    '.rs-pg-ic{display:inline-grid;place-items:center;width:44px;height:44px;border-radius:14px;background:#f2f7ec;font-size:22px;margin:0 0 10px}' +
    '.rs-pg-contact{transition:box-shadow .15s,border-color .15s}.rs-pg-contact:hover{border-color:#cfe3bd;box-shadow:0 16px 32px rgba(27,63,32,.12)}.rs-pg-big{font-size:18px!important;font-weight:800;color:' + G + ';margin:2px 0 4px!important;word-break:break-word}' +
    '.rs-pg-contact{position:relative}.rs-pg .rs-pg-stretch{color:' + G + '!important;text-decoration:none!important}.rs-pg-stretch::after{content:"";position:absolute;inset:0;border-radius:20px}' +
    '.rs-pg-form input[type=text],.rs-pg-form input[type=email],.rs-pg-form input[type=tel],.rs-pg-form textarea,.rs-pg-form .form-control{width:100%;max-width:560px;border:1px solid ' + LINE + '!important;border-radius:12px!important;padding:11px 14px!important;background:#fff!important;box-shadow:inset 0 1px 2px rgba(27,63,32,.05)}' +
    '.rs-pg-form input:focus,.rs-pg-form textarea:focus{border-color:' + L + '!important;box-shadow:0 0 0 3px rgba(134,187,65,.25)!important;outline:0}' +
    '.rs-pg-form .btn,.rs-pg-form button[type=submit],.rs-pg-form input[type=submit]{background:' + G + '!important;color:#fff!important;border:0!important;border-radius:999px!important;padding:12px 28px!important;text-transform:none!important;letter-spacing:0!important;font-weight:800!important}.rs-pg-form .btn:hover,.rs-pg-form button[type=submit]:hover{background:#2a5a30!important}' +
    '.rs-pg-grid--contact{margin:0 0 16px}.rs-pg-grid--contact .rs-pg-big{font-size:15.5px!important;word-break:normal;overflow-wrap:anywhere}.rs-pg-links{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 30px}.rs-pg .rs-pg-links a{padding:7px 14px;border-radius:999px;border:1px solid ' + LINE + ';background:#fff;text-decoration:none!important;font-size:14px}' +
    '.rs-pg-steps{list-style:none;counter-reset:s;padding:0;margin:0;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px}' +
    '.rs-pg-steps li{counter-increment:s;position:relative;padding:20px 18px 18px;border:1px solid ' + LINE + ';border-radius:20px;background:#fff}.rs-pg-steps li::before{content:counter(s);display:grid;place-items:center;width:34px;height:34px;border-radius:50%;background:' + G + ';color:#fff;font-weight:800;margin:0 0 10px}' +
    '.rs-pg-steps strong{display:block;color:' + G + ';font-size:17px;margin:0 0 4px}.rs-pg-steps span{font-size:15px;color:#3d4a3d}' +
    '.rs-pg-gal{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:10px}.rs-pg-gal img{width:100%;aspect-ratio:3/4;object-fit:cover;border-radius:16px;display:block}' +
    '.rs-pg-cta{padding:28px;border-radius:24px;background:linear-gradient(135deg,' + G + ',#4f8a2a);color:#fff;margin:0 0 18px}.rs-pg-cta h2,.rs-pg-cta p{color:#fff!important}' +
    '.rs-pg-grid--3{grid-template-columns:repeat(3,minmax(0,1fr))}.rs-pg-table-w{overflow-x:auto;border:1px solid ' + LINE + ';border-radius:18px;background:#fff}' +
    '.rs-pg-table{width:100%;border-collapse:collapse;font-size:15.5px}.rs-pg-table th{background:#f2f7ec;color:' + G + ';text-align:left;padding:12px 16px;font-weight:800}.rs-pg-table td{padding:12px 16px;border-top:1px solid ' + LINE + '}.rs-pg-free{color:#2f7d1e;font-weight:800}' +
    '.rs-pg-list{margin:0;padding:0 0 0 2px;list-style:none}.rs-pg-list li{position:relative;padding:6px 0 6px 28px}.rs-pg-list li::before{content:"";position:absolute;left:4px;top:13px;width:12px;height:7px;border:solid ' + L + ';border-width:0 0 3px 3px;transform:rotate(-45deg)}' +
    '.rs-pg-toc{display:flex;flex-wrap:wrap;gap:8px;padding:16px 18px;border:1px solid ' + LINE + ';border-radius:18px;background:#f6faf1;margin:0 0 24px}.rs-pg-toc strong{width:100%;color:' + G + '}.rs-pg .rs-pg-toc a{padding:7px 14px;border-radius:999px;background:#fff;border:1px solid ' + LINE + ';text-decoration:none!important;font-size:14px}' +
    '.rs-pg-small{font-size:13.5px;color:#6b7a69}.rs-pg-form{padding:24px;border:1px solid ' + LINE + ';border-radius:22px;background:#fff}' +
    '.rs-pg-firma{padding:22px 24px;border-radius:20px;background:#f6faf1;border:1px solid ' + LINE + '}.rs-pg-firma-g{display:grid;grid-template-columns:1fr 1fr;gap:16px}.rs-pg-firma p{margin:0}' +
    '@media(max-width:991px){.rs-pg-hero{grid-template-columns:1fr;padding:22px}.rs-pg-hero-f--sm{justify-self:start;max-width:220px}.rs-pg-grid,.rs-pg-steps{grid-template-columns:1fr 1fr}.rs-pg-gal{grid-template-columns:repeat(3,1fr)}.rs-pg-hero h2{font-size:27px}}' +
    '@media(max-width:560px){.rs-pg-grid,.rs-pg-steps,.rs-pg-firma-g{grid-template-columns:1fr}.rs-pg-gal{grid-template-columns:repeat(2,1fr)}.rs-pg-btn{flex:1 1 100%;justify-content:center}}' +
    /* archivní kategorie: odkaz na servis i pro starší roboty (místo zařazení služeb do archivu) */
    '.rs-arch-svc{margin:0 0 18px;padding:14px 18px;border:1px solid ' + LINE + ';border-left:4px solid ' + L + ';border-radius:16px;background:#f6faf1;color:#2b3328;font-size:15.5px;line-height:1.55}.rs-arch-svc strong{color:' + G + '}.rs-arch-svc a{color:' + G + '!important;font-weight:700;text-decoration:underline;text-decoration-color:' + L + ';text-underline-offset:3px}' +
    /* okna Shoptetu (colorbox: „Přidáno do košíku“, hlídací pes, dotaz…) a hlavní tlačítko v našem vzhledu (18. 10.) */
    '#cboxOverlay{background:rgba(20,40,22,.45)!important;backdrop-filter:blur(3px);-webkit-backdrop-filter:blur(3px)}' +
    '#colorbox,#cboxWrapper,#cboxContent,#cboxLoadedContent{border-radius:24px!important}#cboxContent,#cboxLoadedContent{overflow:hidden;background:#fff!important}#colorbox{box-shadow:0 30px 70px rgba(20,40,22,.28)!important}' +
    '#cboxClose{width:40px!important;height:40px!important;border-radius:50%!important;background:#f2f7ec!important;top:14px!important;right:14px!important;transition:background .15s}#cboxClose:hover{background:#e3eed8!important}' +
    '.advanced-order .h1{color:' + G + '!important;font-weight:800!important;font-size:28px!important}.advanced-order .h2{color:#2b3328!important;font-weight:700!important;font-size:19px!important}' +
    '.advanced-order .extras-wrap .extra{margin:0!important;padding:0!important}.advanced-order .extras-wrap{display:inline-flex;align-items:center;gap:8px;background:#f2f7ec;border-radius:999px;padding:8px 16px;color:' + G + '}' +
    '.advancedOrder__buttons{display:flex;justify-content:center;align-items:center;gap:12px;flex-wrap:wrap}' +
    '.advancedOrder__buttons .colorbox-close,.advancedOrder__buttons .next-step-back{border:1px solid ' + LINE + '!important;background:#fff!important;color:' + G + '!important;border-radius:999px!important;padding:12px 22px!important;font-weight:700!important;text-transform:none!important}' +
    '.advanced-order .advanced-order-suggestion{color:' + G + '!important;font-size:24px!important}' +
    '.btn.btn-conversion,a.btn-conversion,button.btn-conversion{background:' + G + '!important;border:0!important;color:#fff!important;border-radius:999px!important;text-transform:none!important;letter-spacing:0!important;font-weight:800!important;box-shadow:0 10px 22px rgba(27,63,32,.18);transition:background .15s,transform .15s}' +
    '.btn.btn-conversion:hover,a.btn-conversion:hover,button.btn-conversion:hover{background:#2a5a30!important;transform:translateY(-1px)}' +
    /* karusely produktů: spodek karet (rámeček, zaoblení, stín) se ořezával o slick-list */
    '.products-block .slick-list{padding:4px 0 22px!important;margin-bottom:-14px!important}' +
    /* košík: související produkty (upsell) automaticky rozbalené jako jeden vodorovný pás */
    '.cart-table tr.related.rs-rel>td{padding:4px 18px 16px!important;border:0!important}' +
    '.rs-rel-h{font-weight:800;color:' + G + ';font-size:14px;margin:0 0 8px 2px}' +
    '.cart-table tr.rs-rel>td{max-width:0}' +
    '.rs-rel-strip{display:flex;gap:10px;overflow-x:auto;scroll-snap-type:x mandatory;padding:2px 2px 8px;scrollbar-width:thin;width:100%}' +
    '.rs-rel-strip .cart-related-product{flex:0 0 250px;scroll-snap-align:start;display:grid!important;grid-template-columns:52px 1fr;grid-template-rows:auto auto;column-gap:10px;row-gap:6px;align-items:center;margin:0!important;padding:10px 12px!important;border:1px solid ' + LINE + '!important;border-radius:16px!important;background:#fff!important;box-shadow:0 6px 16px rgba(27,63,32,.06);float:none!important;width:auto!important}' +
    '.rs-rel-strip .cart-related-info{display:contents!important}' +
    '.rs-rel-strip .cart-related-img{grid-row:1/3;grid-column:1}.rs-rel-strip .cart-related-img img{width:52px!important;height:52px!important;object-fit:contain}' +
    '.rs-rel-strip .cart-related-name{grid-column:2;display:-webkit-box!important;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;font-size:12.5px!important;line-height:1.3;font-weight:700;color:' + G + '!important;white-space:normal!important}' +
    '.rs-rel-strip .cart-related-availability{display:none!important}' +
    '.rs-rel-strip .cart-related-button{grid-column:2;display:flex!important;align-items:center;justify-content:space-between;gap:8px;float:none!important;width:auto!important;padding:0!important;white-space:nowrap}' +
    '.rs-rel-strip .cart-related-button .price{font-size:13px!important;color:' + G + '!important;margin:0!important}' +
    '.rs-rel-strip .cart-related-button .btn,.rs-rel-strip .cart-related-button button{padding:5px 12px!important;font-size:12px!important;text-transform:none!important;letter-spacing:0!important;border-radius:999px!important;min-height:0!important;line-height:1.2!important;background:' + G + '!important;color:#fff!important;border:0!important}' +
    '.rs-rel-strip .cart-related-button .btn::after,.rs-rel-strip .cart-related-button .btn::before,.rs-rel-strip .cart-related-button button::after,.rs-rel-strip .cart-related-button button::before{display:none!important}' +
    '.rs-rel-strip .rs-rel-na{opacity:.55}' +
    /* „Více“ jako přehledný panel (Michael 17. 10.): skupiny vedle sebe ve sloupcích místo dlouhého seznamu */
    '@media(min-width:992px){#header .menu-helper>ul,#header .menu-helper .menu-level-1{display:none;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:6px 18px;width:min(980px,calc(100vw - 80px))!important;min-width:0!important;max-height:calc(100vh - 140px)!important;overflow:auto!important;left:auto!important;right:0!important;padding:18px!important;border-radius:20px!important;background:rgba(255,255,255,.98)!important;border:1px solid ' + LINE + '!important;box-shadow:0 24px 48px rgba(27,63,32,.16)!important}' +
    '#header .menu-helper:hover>ul,#header .menu-helper:focus-within>ul{display:grid!important}' +
    '#header .menu-helper>ul>li{float:none!important;width:auto!important;break-inside:avoid;padding:6px!important;border-radius:14px}#header .menu-helper>ul>li:hover{background:var(--rs-soft)}' +
    '#header .menu-helper>ul>li>a{padding:6px 8px!important;font-size:15px!important}#header .menu-helper .menu-level-2>li>a{padding:5px 8px!important;font-size:13.5px!important}' +
    '#header .menu-helper .rs-mega__img{flex-basis:32px;width:32px;height:24px}#header .menu-helper .rs-mega__quick{padding:4px 8px 6px!important}}' +
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
    /* nové informační stránky (18. 10.), pokud je Shoptet v patičce ještě nemá */
    [['Doprava', '/doprava/'], ['O nás', '/o-nas/']].forEach(function (x) { if (!arts.some(function (a) { return a[1].indexOf(x[1]) > -1; })) nakup.unshift(x); });
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
  // texty kategorií (rs-cat-*): rozbalovací karty a karusel recenzí – dřív inline <script> v každém popisu kategorie,
  // od 18. 10. jen tady (CDN, cache). Příznaky data-ready zabrání dvojímu spuštění, dokud inline kopie ještě existuje.
  function catBlocks() {
    // bazénové kategorie mají vlastní modrý vzhled a jiný karusel (rs-cat-review-*) → jednotné zelené styly se na ně nepoužijí
    if (document.querySelector('.rs-cat-theme-blue, .rs-cat-theme-pool, .rs-cat-review-track')) { document.body.classList.add('rs-cat-blue'); return; }
    [].forEach.call(document.querySelectorAll('.rs-cat-topitem'), function (card) {
      if (card.dataset.ready === '1') return; card.dataset.ready = '1'; card.setAttribute('tabindex', '0');
      var toggle = function (e) { if (e && e.target && e.target.tagName === 'A') return; card.classList.toggle('is-open'); };
      card.addEventListener('click', toggle);
      card.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(e); } });
    });
    [].forEach.call(document.querySelectorAll('.rs-cat-reviews'), function (box) {
      if (box.dataset.reviewReady === '1') return; box.dataset.reviewReady = '1';
      var track = box.querySelector('.rs-review-track'), cards = [].slice.call(box.querySelectorAll('.rs-review-card')), dots = box.querySelector('.rs-review-dots');
      if (!track || !cards.length) return;
      var i = 0, timer = null;
      function per() { return window.innerWidth < 768 ? 1 : (window.innerWidth < 992 ? 2 : 3); }
      function max() { return Math.max(0, cards.length - per()); }
      function buildDots() { if (!dots) return; dots.innerHTML = ''; for (var d = 0; d <= max(); d++) { var b = document.createElement('button'); b.type = 'button'; b.setAttribute('aria-label', 'Recenze ' + (d + 1)); b.className = 'rs-review-dot' + (d === i ? ' is-active' : ''); (function (n) { b.addEventListener('click', function () { go(n, true); }); })(d); dots.appendChild(b); } }
      function render() { if (i > max()) i = max(); track.style.transform = 'translateX(' + (-(cards[i] ? cards[i].offsetLeft : 0)) + 'px)'; if (dots) [].forEach.call(dots.children, function (dot, n) { dot.classList.toggle('is-active', n === i); }); }
      function go(n, manual) { i = (n < 0 ? max() : (n > max() ? 0 : n)); render(); if (manual) restart(); }
      function restart() { if (timer) clearInterval(timer); timer = setInterval(function () { go(i + 1, false); }, 5200); }
      var pv = box.querySelector('[data-rs-review-prev]'), nx = box.querySelector('[data-rs-review-next]');
      if (pv) pv.addEventListener('click', function () { go(i - 1, true); }); if (nx) nx.addEventListener('click', function () { go(i + 1, true); });
      window.addEventListener('resize', function () { buildDots(); render(); });
      buildDots(); render(); restart();
    });
    var cnt = [].filter.call(document.querySelectorAll('[data-rs-review-count]'), function (e) { return !e.dataset.rsDone; });
    if (cnt.length) { cnt.forEach(function (e) { e.dataset.rsDone = 1; }); try { fetch('https://raw.githubusercontent.com/Zirk0n/robotisekacky-widgety/main/data/recenze.json').then(function (r) { return r.json(); }).then(function (d) { if (d && d.celkem) cnt.forEach(function (e) { e.textContent = d.celkem + '+'; }); }).catch(function () {}); } catch (e) {} }
  }
  // košík (18. 10., Michael: zvýšit upsell, ale nezabrat celou obrazovku): související produkty se rozbalí samy
  // jako jeden vodorovný pás karet; nedostupné na konec. Jen při max. 3 položkách v košíku.
  function cartRelated() {
    var rows = document.querySelectorAll('.cart-table tr.related');
    if (!rows.length || document.querySelectorAll('.cart-table tr.removeable').length > 3) return;
    [].forEach.call(rows, function (tr) {
      if (tr.classList.contains('rs-rel')) return;
      var td = tr.querySelector('td'); if (!td) return;
      var items = [].slice.call(td.querySelectorAll('.cart-related-product')); if (!items.length) return;
      var strip = document.createElement('div'); strip.className = 'rs-rel-strip';
      items.forEach(function (it) { if (/nedostupn|ukončen/i.test((it.querySelector('.cart-related-availability') || {}).textContent || '')) it.classList.add('rs-rel-na'); });
      items.sort(function (a, b) { return a.classList.contains('rs-rel-na') - b.classList.contains('rs-rel-na'); }).forEach(function (it) { strip.appendChild(it); });
      td.innerHTML = '<p class="rs-rel-h">K tomuto produktu se hodí</p>'; td.appendChild(strip);
      tr.classList.add('rs-rel', 'visible'); tr.style.display = 'table-row';
    });
  }
  // krok 3 objednávky: krátké vysvětlení nad odhlášením dotazníků (zaškrtnutí dál možné, jen víc kontextu)
  function checkoutNotes() {
    var first = document.getElementById('consentszboziConsent') || document.getElementById('consentsheurekaConsent');
    if (!first || document.querySelector('.rs-optout-note')) return;
    var g = first.closest('.form-group') || first.parentElement;
    var n = document.createElement('p'); n.className = 'rs-optout-note';
    n.innerHTML = '<b>Krátký dotazník po nákupu</b> – vaše hodnocení pomáhá dalším zákazníkům s výběrem a nám se zlepšovat. Pokud ho dostávat nechcete, zaškrtněte:';
    g.parentNode.insertBefore(n, g);
  }
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
      /* průvodce výběrem sekačky jako hlavní rozcestník (Michael 18. 10. 2026) */
      if (/sekack/.test(href) && !ul.querySelector('.rs-mega__guide')) {
        var gi = document.createElement('li'); gi.className = 'rs-mega__guide';
        gi.innerHTML = '<a href="/jak-vybrat-robotickou-sekacku/"><b>Nevíte, kterou vybrat?</b><span>Průvodce výběrem robotické sekačky podle vaší zahrady →</span></a>';
        ul.appendChild(gi);
      }
      var f = document.createElement('li'); f.className = 'rs-mega__foot';
      f.innerHTML = '<a href="' + (top ? top.getAttribute('href') : '/') + '">Zobrazit vše →</a><span>Nevíte si rady? <a href="tel:' + TEL + '">' + TELT + '</a></span>';
      ul.appendChild(f);
    });
    /* panel „Více“ udržet celý na obrazovce (posunout doprava, když by přetekl vlevo) */
    var helper = document.querySelector('#header .menu-helper');
    if (helper && !helper.dataset.rsFit) {
      helper.dataset.rsFit = 1;
      var fit = function () { var ul = helper.querySelector(':scope>ul'); if (!ul) return;
        /* informační stránky na konec panelu Více (Michael 18. 10.); Shoptet panel přestavuje, proto vkládat při otevření */
        if (!ul.querySelector('.rs-vice-info')) { var ii = document.createElement('li'); ii.className = 'rs-vice-info'; ii.innerHTML = '<span class="rs-vice-info__h">Nakupování u nás</span><a href="/o-nas/">O nás</a><a href="/doprava/">Doprava</a><a href="/platby/">Platby</a><a href="/reklamace-a-vraceni-zbozi/">Reklamace a vrácení</a><a href="/kontakty/">Kontakty</a>'; ul.appendChild(ii); }
        ul.style.setProperty('right', '0px', 'important'); requestAnimationFrame(function () { var r = ul.getBoundingClientRect(); if (r.width && r.left < 16) ul.style.setProperty('right', Math.round(r.left - 16) + 'px', 'important'); }); };
      helper.addEventListener('mouseenter', fit); helper.addEventListener('focusin', fit);
    }
    var nav = document.getElementById('navigation');
    if (nav && !nav.querySelector('.rs-navcontact')) {
      var c = document.createElement('div'); c.className = 'rs-navcontact';
      c.innerHTML = '<b>Poradíme s výběrem</b><a href="tel:' + TEL + '">' + ICON.tel + TELT + '</a><a href="mailto:' + MAIL + '">' + ICON.mail + MAIL + '</a><a href="/kontakty/">Kontakty →</a>';
      (nav.querySelector('.navigation-in') || nav).appendChild(c);
    }
    var h = document.getElementById('header');
    if (h && !h.dataset.rsScroll) { h.dataset.rsScroll = 1; var on = function () { h.classList.toggle('rs-scrolled', window.scrollY > 40); }; window.addEventListener('scroll', on, { passive: true }); on(); }
  }

  function run() { css(); topbar(); sealRating(); megaMenu(); footer(); filtersOpen(); sliders(); benefitCount(); topProducts(); soldOutLast(); try { cartRelated(); } catch (e) {} try { catBlocks(); } catch (e) {} try { checkoutNotes(); } catch (e) {} }
  window.addEventListener('load', function () { setTimeout(filtersOpen, 300); setTimeout(sealRating, 300); setTimeout(sealRating, 2500); });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run); else run();
  /* Shoptet po AJAXu filtrů přepisuje obsah → znovu */
  var mo = new MutationObserver(function () { clearTimeout(mo.t); mo.t = setTimeout(function () { filtersOpen(); sliders(); soldOutLast(); try { cartRelated(); } catch (e) {} try { checkoutNotes(); } catch (e) {} }, 120); });
  function watch() { var c = document.getElementById('content') || document.body; mo.observe(c, { childList: true, subtree: true }); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', watch); else watch();
})();
