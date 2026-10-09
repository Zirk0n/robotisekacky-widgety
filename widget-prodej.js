/* robotisekacky.cz – prodejní vrstva produktové stránky (widget-prodej v1, 9. 10. 2026)
   Bezpečné doplňky, které nic existujícího nemění, jen přidávají prvky:
   poradce s fotkou, hodnocení obchodu s rotujícími citacemi, USP, pruh služby instalace,
   náhrady u nedostupného modelu, skrytí prázdných hvězdiček „Neohodnoceno“.
   Načítá ho widget-vysavac.js (šablona v1) i widget-vysavac-v2.js. Konfigurace podle typu níže. */
(function(){
if(window.__rsProdej)return;window.__rsProdej=1;
var CDN='https://cdn.jsdelivr.net/gh/Zirk0n/robotisekacky-widgety@main/';
function has(sel){return !!document.querySelector(sel)}
var TYPE=has('link[href*="widget-sekacka"],script[src*="widget-sekacka"]')?'sekacka':has('link[href*="widget-bazen"],script[src*="widget-bazen"]')?'bazen':has('link[href*="widget-vysavac"],script[src*="widget-vysavac"]')?'vysavac':'';
var CFG={
 vysavac:{
  svcUrl:'/zprovozneni-robotickeho-vysavace/',
  advisorS:'Michael Boháček, majitel – poradím s výběrem a robota vám můžu i nastavit u vás doma.',
  install:['Zprovozníme vám ho u vás doma','Wi-Fi, aplikace, mapa i plán úklidu · od 3 490 Kč · Praha a Středočeský kraj bez příplatku'],
  usp:[['🏠','Pomůžeme se zprovozněním – na dálku i u vás',1],['💬','Poradíme osobně i po nákupu'],['↩︎','Vrácení do 14 dnů bez dohadů'],['⭐','Ověřeno zákazníky – Heureka 5,0']],
  skip:/zprovozn|instalac|servis|kartáč|filtr|mop |sáček|kapalin|nádob|garáž|modul|anténa|kabel/i
 }
};
var C=CFG[TYPE];if(!C)return;
if(!has('link[href*="widget-prodej.css"]')){var l=document.createElement('link');l.rel='stylesheet';l.href=CDN+'widget-prodej.css';document.head.appendChild(l);}
function ready(fn,d){if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){setTimeout(fn,d||0)});else setTimeout(fn,d||0)}
function safe(fn){return function(){try{fn()}catch(e){console.warn('[widget-prodej]',e)}}}
/* posun na cíl v popisu – když je popis v záložce, nejdřív ji otevře */
function goTo(el){var tab=document.querySelector('a[href="#description"]');var d=document.getElementById('description');if(tab&&d&&!d.classList.contains('active'))tab.click();el.scrollIntoView({behavior:'smooth',block:'start'})}
function svcLink(a){var t=document.getElementById('zprovozneni');if(t){a.href='#zprovozneni';a.addEventListener('click',function(e){e.preventDefault();goTo(t)})}else{a.href=C.svcUrl}}
function cnt(){var m=0;['heurekaCount','heurekaCountModal'].forEach(function(id){var e=document.getElementById(id);var n=e?parseInt((e.textContent||'').replace(/\D/g,''),10):0;if(n>m)m=n});return m||null}

/* 1) poradce u tlačítka koupit */
ready(safe(function(){if(has('.rs-advisor'))return;var f=document.getElementById('product-detail-form');if(!f)return;var d=document.createElement('div');d.className='rs-advisor';d.innerHTML='<div class="ph" role="img" aria-label="Michael Boháček, majitel Robotí Sekačky"></div><div><div class="t">Nevíte, jestli se k vám hodí?</div><div class="s"></div><div class="l"><a href="tel:+420792325839">📞 +420 792 325 839</a><a href="mailto:info@robotisekacky.cz">✉️ info@robotisekacky.cz</a></div></div>';d.querySelector('.s').textContent=C.advisorS;f.insertAdjacentElement('afterend',d)}));

/* 2) hodnocení obchodu pod krátkým popisem + USP pod poradcem */
ready(safe(function(){
var sd=document.querySelector('.p-short-description');
if(sd&&!has('.rs-rating')){var Q=[['Na všechny otázky odpověděl, poradil a veškerá komunikace byla perfektní.','Tereza D.'],['Pán na telefonu přesně ví, o čem hovoří, má přehled a dokáže poradit.','Jan'],['Doručení bez problémů, dokonce o dva dny dřív, než bylo inzerováno.','Karel J.'],['Skvělý přístup, díky za konzultaci a následné bleskové doručení.','Martin Š.'],['Od objednávky po doručení proběhlo vše na výbornou.','Jan K.']];
var a=document.createElement('a');a.className='rs-rating';a.href='https://www.robotisekacky.cz/hodnoceni-obchodu/';a.innerHTML='<span class="top"><span class="rs-stars">★★★★★</span><b>5,0</b> · <span class="rs-cnt">400+</span> hodnocení obchodu</span><span class="rq"><q></q> <span class="who"></span></span>';sd.insertAdjacentElement('afterend',a);
var i=0,box=a.querySelector('.rq');function show(){box.querySelector('q').textContent=Q[i][0];box.querySelector('.who').textContent='— '+Q[i][1]}show();
var red=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches,hov=false;a.addEventListener('mouseenter',function(){hov=true});a.addEventListener('mouseleave',function(){hov=false});
if(!red)setInterval(function(){if(hov||document.hidden)return;box.classList.add('fade');setTimeout(function(){i=(i+1)%Q.length;show();box.classList.remove('fade')},350)},6500)}
var adv=document.querySelector('.rs-advisor');
if(adv&&!has('.rs-usp')){var u=document.createElement('div');u.className='rs-usp';C.usp.forEach(function(x){var d=document.createElement('div');var ic=document.createElement('i');ic.textContent=x[0];d.appendChild(ic);if(x[2]){var l=document.createElement('a');l.textContent=x[1];svcLink(l);d.appendChild(l)}else d.appendChild(document.createTextNode(x[1]));u.appendChild(d)});adv.insertAdjacentElement('afterend',u)}
var tries=0;(function upd(){var n=cnt();if(n){document.querySelectorAll('.rs-cnt').forEach(function(x){x.textContent=n})}if(tries++<24)setTimeout(upd,500)})();
},50));

/* 2b) oprava v1 šablony: TIPY_HTML (<ul>) byl obalený v <ol> → rozbitý seznam */
ready(safe(function(){document.querySelectorAll('.tips-card ol').forEach(function(ol){if(ol.children.length===1&&ol.firstElementChild.tagName==='UL')ol.replaceWith(ol.firstElementChild)})}));

/* 2c) dlaždice „Dárek k robotu zdarma“ v popisu: s dárkem v kartě ukáže jeho název, bez dárku se změní na podporu (nic neslibovat, co neplatí) */
ready(safe(function(){var tiles=[].slice.call(document.querySelectorAll('#description .trust-tile')).filter(function(t){return /Dárek k/.test(t.textContent)});if(!tiles.length)return;
var g=[].slice.call(document.querySelectorAll('.p-gifts-wrapper .p-gift-name')).map(function(e){return e.textContent.trim()}).filter(Boolean);
tiles.forEach(function(t){if(g.length){var c=t.querySelector('.trust-copy');if(c)c.textContent='K tomuto robotu dostanete zdarma: '+g.join(', ')+'.'}else{var b=t.querySelector('.trust-badge');if(b)b.textContent='PODPORA';var e=t.querySelector('.trust-emoji');if(e)e.textContent='💬';var k=t.querySelector('.trust-kicker');if(k)k.textContent='I po nákupu';var h=t.querySelector('.trust-heading');if(h)h.textContent='Poradíme s nastavením';var c2=t.querySelector('.trust-copy');if(c2)c2.textContent='Zavolejte nebo napište – pomůžeme s aplikací, mapou i údržbou.';var n=t.querySelector('.trust-note');if(n)n.innerHTML='<a href="tel:+420792325839">+420 792 325 839</a>'}})}),400);

/* 3) skrýt prázdné hvězdičky „Neohodnoceno“ */
ready(safe(function(){document.querySelectorAll('.p-detail-inner-header *, .p-detail *').forEach(function(e){if(e.childElementCount===0&&/^\s*Neohodnoceno\s*$/.test(e.textContent)){var w=e.closest('.stars-wrapper')||e.parentElement;if(w&&!w.closest('.rs-rating'))w.style.display='none'}})}));

/* 4) náhrady u nedostupného modelu – skladem, podobná cena, přednostně stejná značka (kategorie z drobečkové navigace) */
/* jen dostupnost hlavního produktu (ne související produkty na stránce): schema.org, pak štítek u ceny */
function soldOut(){if(has('#product-detail-form .sold-out'))return true;var a=document.querySelector('.p-detail [itemprop="availability"]')||document.querySelector('[itemprop="availability"]');var v=a?(a.getAttribute('content')||a.getAttribute('href')||''):'';if(v)return /OutOfStock|SoldOut|Discontinued/i.test(v);var l=document.querySelector('.p-data-wrapper .availability-label');return !!l&&/Momentálně nedostupné/.test(l.textContent)}
function num(t){var n=parseInt(String(t||'').replace(/[^\d]/g,''),10);return isNaN(n)?0:n}
function parseList(h){var d=new DOMParser().parseFromString(h,'text/html');return [].slice.call(d.querySelectorAll('.product')).map(function(c){var a=c.querySelector('a.name')||c.querySelector('a[href]');var im=c.querySelector('img');return {n:((c.querySelector('.name')||{}).textContent||'').trim(),u:a&&a.getAttribute('href'),pr:((c.querySelector('.price-final')||{}).textContent||'').replace(/\s+/g,' ').trim(),av:((c.querySelector('.availability')||{}).textContent||'').replace(/\s+/g,' ').trim(),img:im&&(im.getAttribute('data-src')||im.getAttribute('src'))}}).filter(function(x){return x.n&&x.u})}
ready(safe(function(){if(!soldOut()||has('.rs-alt'))return;
var wrap=document.querySelector('#description .wrap');if(!wrap)return;var anchor=wrap.querySelector('.qt-wrap, .video-row, .feat-card');var after=null;if(!anchor){after=wrap.querySelector('h2');if(!after)return}
var brandA=document.querySelector('.p-detail a[href*="/znacka/"]');var brand=brandA?brandA.textContent.trim():'';
var crumbs=[].slice.call(document.querySelectorAll('.breadcrumbs a, [class*="breadcrumb"] a')).map(function(a){return {t:a.textContent.trim(),u:a.getAttribute('href')}}).filter(function(c){return c.u&&c.u!=='/'});
if(!crumbs.length)return;var cat=crumbs[crumbs.length-1];if(/starší|archiv|doprodej/i.test(cat.t)&&crumbs.length>1)cat=crumbs[crumbs.length-2];var top=crumbs[0];
var me=num((document.querySelector('.p-final-price-wrapper .price-final, .price-final')||{}).textContent);var myName=((document.querySelector('h1')||{}).textContent||'').trim();var myBase=myName.split(' ').slice(0,3).join(' ');var here=location.pathname;
function ok(x){var p=num(x.pr);if(x.u===here||x.u.indexOf(here)>=0)return false;if(C.skip.test(x.n))return false;if(x.n.indexOf(myBase)===0)return false;if(/nedostupn|vyprodán/i.test(x.av))return false;if(me&&(p<me*0.45||p>me*2.2))return false;return true}
var COL=/\s+(černý|černá|bílý|bílá|šedý|stříbrný|zlatý|black|white|silver|gold|grey|gray)\s*$/i;var myCol=(myName.match(COL)||[])[1]||'';function base(n){return n.replace(COL,'').trim()}
function rank(list){var by={};list.filter(ok).forEach(function(x){var k=base(x.n);var c=(x.n.match(COL)||[])[1]||'';var cur=by[k];if(!cur||(myCol&&c.toLowerCase()===myCol.toLowerCase()&&(cur.n.match(COL)||[])[1]!==c))by[k]=x});return Object.keys(by).map(function(k){return by[k]}).sort(function(a,b){var ba=brand&&a.n.indexOf(brand)===0?0:1,bb=brand&&b.n.indexOf(brand)===0?0:1;var sa=/^Skladem/i.test(a.av)?0:1,sb=/^Skladem/i.test(b.av)?0:1;if(sa!==sb)return sa-sb;if(ba!==bb)return ba-bb;return Math.abs(num(a.pr)-me)-Math.abs(num(b.pr)-me)})}
function get(u){return fetch(u).then(function(r){return r.text()}).then(parseList).catch(function(){return []})}
Promise.all([get(cat.u),get(cat.u+'strana-2/')]).then(function(r){var pick=rank([].concat(r[0],r[1])).slice(0,3);if(pick.length>=3||!top||top.u===cat.u)return pick;return get(top.u+'?stock=1').then(function(o){var more=rank(o).filter(function(x){return !pick.some(function(y){return y.u===x.u})});return pick.concat(more).slice(0,3)})})
.then(function(list){return Promise.all(list.map(function(x){if(x.img)return x;return fetch(x.u).then(function(r){return r.text()}).then(function(h){var m=h.match(/property="og:image"\s+content="([^"]+)"/)||h.match(/content="([^"]+)"\s+property="og:image"/);if(m)x.img=m[1];return x}).catch(function(){return x})}))})
.then(function(list){if(!list.length||has('.rs-alt'))return;
var title=brand?'aktuální modely '+brand:'aktuální modely';var box=document.createElement('section');box.className='rs-alt';box.id='rs-alt';box.innerHTML='<h3></h3><p class="sub">Podobná cenová třída. Nevíte, který se k vám hodí? Zavolejte <a href="tel:+420792325839">+420 792 325 839</a>, poradíme.</p><div class="g"></div>';box.querySelector('h3').textContent='Tento model je momentálně nedostupný – podívejte se na '+title;var g=box.querySelector('.g');
list.forEach(function(x){var a=document.createElement('a');a.className='c';a.href=x.u;a.innerHTML=(x.img?'<img alt="" loading="lazy">':'')+'<span><span class="n"></span><br><span class="p"></span><br><span class="go">Zobrazit detail →</span></span>';if(x.img)a.querySelector('img').src=x.img;a.querySelector('.n').textContent=x.n;a.querySelector('.p').textContent=x.pr;g.appendChild(a)});
if(anchor)anchor.insertAdjacentElement('beforebegin',box);else{var p=after.nextElementSibling;while(p&&p.tagName==='P'&&p.nextElementSibling&&p.nextElementSibling.tagName==='P')p=p.nextElementSibling;(p||after).insertAdjacentElement('afterend',box)}
var adv=document.querySelector('.rs-advisor');if(adv&&!has('.rs-soldnote')){var nt=document.createElement('div');nt.className='rs-soldnote';nt.innerHTML='Tento model je momentálně nedostupný. <a href="#rs-alt"></a>';var na=nt.querySelector('a');na.textContent='Podívejte se na '+title+' ↓';var ins=document.querySelector('.rs-install');(ins||adv).insertAdjacentElement(ins?'afterend':'beforebegin',nt);na.addEventListener('click',function(e){e.preventDefault();goTo(document.getElementById('rs-alt'))})}})}));

/* 5) pruh služby instalace nad poradcem */
ready(safe(function run(){if(has('.rs-install'))return;var adv=document.querySelector('.rs-advisor');if(!adv){if((run.n=(run.n||0)+1)<20)setTimeout(safe(run),300);return}
var a=document.createElement('a');a.className='rs-install';a.innerHTML='<span class="ic">🛠️</span><span class="tx"><b></b><span></span></span><span class="ar">→</span>';a.querySelector('b').textContent=C.install[0];a.querySelector('.tx span').textContent=C.install[1];svcLink(a);
var note=document.querySelector('.rs-soldnote');(note||adv).insertAdjacentElement('beforebegin',a)}),200);
})();
