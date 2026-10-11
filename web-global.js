/* robotisekacky.cz – globální skripty pro celý web (načítá se z HTML kódu Záhlaví). Spravuje Firma/playbooky/webove-stranky/bannery-a-homepage.md */
(function () {
  /* Box „Potřebujete poradit s výběrem?“ nad patičkou (inspirace ESHOP BOOSTER / x-trenink). Fotku doplnit do FOTO. */
  var FOTO = ''; // např. 'https://cdn.myshoptet.com/usr/www.robotisekacky.cz/user/documents/upload/michael.jpg'
  function poradime() {
    if (document.querySelector('.rs-poradime')) return;
    if (/^\/(kosik|objednavka|objednavka-krok|login|registrace)/.test(location.pathname)) return;
    var foot = document.querySelector('#footer') || document.querySelector('footer');
    if (!foot) return;
    var s = document.createElement('section');
    s.className = 'rs-poradime';
    s.innerHTML =
      '<div class="rs-poradime__in">' +
        (FOTO ? '<img class="rs-poradime__foto" src="' + FOTO + '" alt="Michael Boháček" loading="lazy" width="96" height="96">'
              : '<div class="rs-poradime__foto rs-poradime__foto--ini" aria-hidden="true">MB</div>') +
        '<div class="rs-poradime__txt">' +
          '<p class="rs-poradime__h">Potřebujete poradit s výběrem?</p>' +
          '<p class="rs-poradime__p">Zavolejte mi nebo napište. Poradím vám podle vaší domácnosti, zahrady nebo bazénu.</p>' +
          '<p class="rs-poradime__jm"><strong>Michael Boháček</strong> · majitel Robotisekacky.cz</p>' +
        '</div>' +
        '<div class="rs-poradime__cta">' +
          '<a class="rs-poradime__btn" href="tel:+420792325839">☎ 792 325 839</a>' +
          '<a class="rs-poradime__btn rs-poradime__btn--sec" href="mailto:info@robotisekacky.cz">✉ info@robotisekacky.cz</a>' +
        '</div>' +
      '</div>';
    foot.parentNode.insertBefore(s, foot);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', poradime); else poradime();
})();
