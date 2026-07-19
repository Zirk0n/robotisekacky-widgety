(function () {
  var cssHref = 'https://cdn.jsdelivr.net/gh/Zirk0n/robotisekacky-widgety@main/widget-instalace-clanky.css';
  if (!document.querySelector('link[href*="widget-instalace-clanky.css"]')) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = cssHref;
    document.head.appendChild(link);
  }

  function init(root) {
    if (!root || root.__rswArticleInit) return;
    root.__rswArticleInit = true;

    var track = root.querySelector('[data-rsw-track]');
    var slides = Array.prototype.slice.call(root.querySelectorAll('[data-rsw-slide]'));
    var prev = root.querySelector('[data-rsw-prev]');
    var next = root.querySelector('[data-rsw-next]');
    var index = 0;
    var timer = null;

    function go(target) {
      if (!track || !slides.length) return;
      index = (target + slides.length) % slides.length;
      track.style.transform = 'translateX(-' + (index * 100) + '%)';
    }

    function stop() {
      if (timer) window.clearInterval(timer);
      timer = null;
    }

    function start() {
      stop();
      if (slides.length > 1) timer = window.setInterval(function () { go(index + 1); }, 3800);
    }

    if (prev) prev.addEventListener('click', function () { go(index - 1); start(); });
    if (next) next.addEventListener('click', function () { go(index + 1); start(); });

    var touchX = 0;
    if (track) {
      track.addEventListener('touchstart', function (event) {
        if (!event.touches || !event.touches[0]) return;
        touchX = event.touches[0].clientX;
        stop();
      }, { passive: true });
      track.addEventListener('touchend', function (event) {
        var end = event.changedTouches && event.changedTouches[0];
        if (end && Math.abs(end.clientX - touchX) > 45) go(index + (end.clientX < touchX ? 1 : -1));
        start();
      }, { passive: true });
    }

    var overlay = root.querySelector('[data-rsw-overlay]');
    function closeAll() {
      if (overlay) overlay.style.display = 'none';
      root.querySelectorAll('[data-rsw-modal]').forEach(function (modal) { modal.style.display = 'none'; });
    }
    function openModal(id) {
      var modal = root.querySelector('[data-rsw-modal="' + id + '"]');
      if (!modal || !overlay) return;
      overlay.style.display = 'block';
      modal.style.display = 'block';
    }
    root.querySelectorAll('[data-rsw-open]').forEach(function (button) {
      button.addEventListener('click', function () { openModal(button.getAttribute('data-rsw-open')); });
    });
    root.querySelectorAll('[data-rsw-close]').forEach(function (button) { button.addEventListener('click', closeAll); });
    if (overlay) overlay.addEventListener('click', closeAll);

    function setReviewCount(count) {
      if (!count || count < 50 || count > 9999) return;
      root.querySelectorAll('[data-rsw-review-count]').forEach(function (node) { node.textContent = count; });
    }
    setReviewCount(421);
    window.fetch('/hodnoceni-obchodu/', { credentials: 'same-origin', cache: 'force-cache' })
      .then(function (response) { return response.text(); })
      .then(function (html) {
        var plain = html.replace(/<[^>]+>/g, ' ');
        var matches = plain.match(/(\d{2,4})\s+hodnocen/gi) || [];
        var counts = matches.map(function (value) { return parseInt(value, 10); }).filter(function (value) { return value >= 50 && value <= 9999; });
        if (counts.length) setReviewCount(Math.max.apply(null, counts));
      })
      .catch(function () {});

    go(0);
    start();
  }

  function initAll() {
    document.querySelectorAll('.rsw-article').forEach(init);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initAll);
  else initAll();
})();
