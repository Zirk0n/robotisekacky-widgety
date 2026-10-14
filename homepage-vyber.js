/* robotisekacky.cz – homepage: „S čím vám poradíme?“ – výběr robotického vysavače podle situace (14. 10. 2026).
   Dlaždice podle situace zákazníka → krátká rada, na co se dívat + Poradit konkrétní model / Prohlédnout vysavače.
   Vkládá se jen na titulní stranu, před produktové skupiny. Zdroj pravdy: Firma/nastroje/homepage/.
   Sezónně: v létě/jaru vyměnit obsah za sekačky (svah, stromy, více ploch) – pole S níže. */
(function () {
  if (!document.body || !document.body.classList.contains('in-index') || document.querySelector('.rsv')) return;
  var TEL = '+420792325839', TELT = '792 325 839', MAIL = 'info@robotisekacky.cz';
  var S = [
    ['🐕', 'Máme psa nebo kočku', 'Chlupy se nejvíc namotávají na štětinové kartáče – hledejte <b>gumové válce</b> nebo kartáč proti namotávání. Kamera a <b>rozpoznávání překážek</b> pomůže objet misky, kabely i nehodu na podlaze. A protože chlupy plní nádobku rychle, vyplatí se <b>stanice s automatickým vysypáváním</b>.'],
    ['🧽', 'Chci, aby i vytíral', 'Na skutečné vytírání jsou nejlepší <b>rotační mopy nebo mycí válec</b> s přítlakem. Rozhoduje i stanice: když mopy <b>sama pere a suší</b>, nebudou zapáchat. Máte koberce? Hledejte <b>zvedání mopů</b>, aby zůstaly suché.'],
    ['🗑️', 'Nechci nic vysypávat', 'Zvolte robota se <b>stanicí s automatickým vysypáváním</b> – prach jde do sáčku, který obvykle vydrží několik týdnů. Plně automatická stanice navíc <b>doplňuje vodu a pere mopy</b>, takže na robota sáhnete jen výjimečně.'],
    ['🛋️', 'Hodně nábytku a nízké postele', 'Rozhoduje <b>výška robota</b> – pod gauč nebo postel s mezerou kolem 10 cm se vejde jen nižší model. Věžička LiDARu robota zvyšuje, některé modely ji mají <b>zapuštěnou nebo výsuvnou</b>. Změřte si mezeru a poradíme.'],
    ['🏠', 'Velký byt nebo dům s patrem', 'U větších ploch se vyplatí <b>přesná navigace LiDAR</b>, ukládání <b>více map</b> (každé patro zvlášť) a větší baterie. Robot schody nevyjede – na patro ho přenesete, nebo zvolíte druhého robota.'],
    ['🎁', 'Kupuji rodičům', 'Nejvíc pomůže <b>plně automatická stanice</b> – rodiče pak robota skoro neřeší. A aby se nemuseli trápit s aplikací, <a href="/zprovozneni-robotickeho-vysavace/">zprovozníme ho přímo u nich doma</a>: Wi-Fi, mapa, plán úklidu i vysvětlení v klidu.']
  ];
  var css = '.rsv{max-width:1180px;margin:10px auto 26px;padding:0 16px;font-family:inherit}' +
    '.rsv h2{margin:0 0 4px!important;text-align:center;font-size:30px!important;font-weight:800;color:#1b3f20}' +
    '.rsv .rsv-sub{text-align:center;color:#4d4d4f;margin:0 0 18px}' +
    '.rsv-g{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:12px}' +
    '.rsv-t{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;min-height:118px;padding:14px 10px;border-radius:18px;border:1px solid #e6f0db;background:#fff;box-shadow:0 8px 20px rgba(27,63,32,.07);cursor:pointer;font:inherit;color:#1b3f20;font-weight:700;font-size:15px;line-height:1.25;text-align:center;transition:transform .2s,box-shadow .2s,border-color .2s}' +
    '.rsv-t:hover{transform:translateY(-3px);box-shadow:0 14px 28px rgba(27,63,32,.12)}' +
    '.rsv-t[aria-expanded="true"]{border-color:#86BB41;background:#f4f9ef;box-shadow:0 0 0 2px rgba(134,187,65,.35)}' +
    '.rsv-t .e{font-size:30px;line-height:1}' +
    '.rsv-p{margin-top:14px;padding:18px 22px;border-radius:18px;background:linear-gradient(160deg,#fff 0,#f4f9ef 100%);border:1px solid #e3eed8;display:none}' +
    '.rsv-p.on{display:block}.rsv-p h3{margin:0 0 6px!important;font-size:20px!important;color:#1b3f20}' +
    '.rsv-p p{margin:0 0 12px!important;color:#2b3328;font-size:16px;line-height:1.6}.rsv-p a{color:#1b3f20;font-weight:700}' +
    '.rsv-cta{display:flex;flex-wrap:wrap;gap:10px}.rsv-cta a{display:inline-flex;align-items:center;padding:10px 18px;border-radius:999px;text-decoration:none!important;font-weight:700}' +
    '.rsv-cta .pri{background:#1b3f20;color:#fff!important}.rsv-cta .pri:hover{background:#86BB41}.rsv-cta .sec{border:2px solid #1b3f20;color:#1b3f20!important;background:#fff}' +
    '@media(max-width:991px){.rsv-g{grid-template-columns:repeat(3,minmax(0,1fr))}}' +
    '@media(max-width:560px){.rsv h2{font-size:24px!important}.rsv-g{grid-template-columns:repeat(2,minmax(0,1fr))}.rsv-t{min-height:96px;font-size:14px}}';
  function build() {
    var host = document.querySelector('.index-content-wrapper');
    if (!host || document.querySelector('.rsv')) return;
    var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
    var sec = document.createElement('section'); sec.className = 'rsv'; sec.setAttribute('aria-label', 'Výběr robotického vysavače podle situace');
    var tiles = S.map(function (s, i) { return '<button type="button" class="rsv-t" aria-expanded="false" aria-controls="rsv-p" data-i="' + i + '"><span class="e" aria-hidden="true">' + s[0] + '</span>' + s[1] + '</button>'; }).join('');
    sec.innerHTML = '<h2>S čím vám poradíme?</h2><p class="rsv-sub">Vyberte, co u vás doma řešíte – řekneme, na co se při výběru robotického vysavače dívat.</p>' +
      '<div class="rsv-g">' + tiles + '</div><div class="rsv-p" id="rsv-p" role="region" aria-live="polite"></div>';
    host.insertBefore(sec, host.firstChild);
    var panel = sec.querySelector('.rsv-p');
    sec.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('.rsv-t'); if (!b) return;
      var open = b.getAttribute('aria-expanded') === 'true';
      [].forEach.call(sec.querySelectorAll('.rsv-t'), function (x) { x.setAttribute('aria-expanded', 'false'); });
      if (open) { panel.classList.remove('on'); return; }
      var s = S[+b.getAttribute('data-i')]; b.setAttribute('aria-expanded', 'true');
      panel.innerHTML = '<h3>' + s[0] + ' ' + s[1] + '</h3><p>' + s[2] + '</p><div class="rsv-cta"><a class="pri" href="tel:' + TEL + '">📞 Poradit konkrétní model – ' + TELT + '</a>' +
        '<a class="sec" href="mailto:' + MAIL + '?subject=' + encodeURIComponent('Výběr robotického vysavače – ' + s[1]) + '">✉️ Napsat e-mail</a><a class="sec" href="/roboticke-vysavace/">Prohlédnout robotické vysavače →</a></div>';
      panel.classList.add('on');
      if (window.innerWidth < 760) panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build); else build();
})();
