/* Robotisekacky.cz: sdílené obsahové komponenty a galerie v1, 20. 10. 2026. */
(function () {
  'use strict';
  if (window.__rsContentV1) return;
  window.__rsContentV1 = true;
  var script = document.currentScript;
  function init() {
    var roots = Array.from(document.querySelectorAll('.rs-article, .rs-content'));
    roots = roots.filter(function (r) { return !roots.some(function (p) { return p !== r && p.contains(r); }); });
    if (!roots.length) return;
    if (!document.querySelector('link[data-rs-content-css]')) {
      var link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = new URL('rs-content.css', script && script.src || location.href).href;
      link.setAttribute('data-rs-content-css', '1');
      document.head.appendChild(link);
    }
    var dialog;
    var items = [];
    var index = 0;
    var trigger;
    var overflow;
    var touch;
    function close() { if (dialog && dialog.open) dialog.close(); }
    function show() {
      var item = items[index];
      dialog.querySelector('.lb-image').src = item.href;
      dialog.querySelector('.lb-image').alt = item.img.alt || '';
      dialog.querySelector('.lb-caption').textContent = item.caption;
      dialog.querySelector('.lb-count').textContent = (index + 1) + ' / ' + items.length;
      dialog.querySelector('.lb-prev').hidden = items.length < 2;
      dialog.querySelector('.lb-next').hidden = items.length < 2;
    }
    function step(n) { index = (index + n + items.length) % items.length; show(); }
    function build() {
      if (dialog) return;
      dialog = document.createElement('dialog');
      dialog.id = 'rs-content-lightbox';
      dialog.className = 'lightbox rs-lightbox';
      dialog.setAttribute('aria-label', 'Fotogalerie článku');
      dialog.innerHTML = '<p class="lb-count" aria-live="polite"></p><button type="button" class="lb-close" aria-label="Zavřít galerii">✕</button><button type="button" class="lb-prev" aria-label="Předchozí fotografie">❮</button><figure class="lb-figure"><img class="lb-image" alt=""><figcaption class="lb-caption"></figcaption></figure><button type="button" class="lb-next" aria-label="Další fotografie">❯</button>';
      document.body.appendChild(dialog);
      dialog.querySelector('.lb-close').addEventListener('click', close);
      dialog.querySelector('.lb-prev').addEventListener('click', function () { step(-1); });
      dialog.querySelector('.lb-next').addEventListener('click', function () { step(1); });
      dialog.addEventListener('click', function (e) { if (e.target === dialog) close(); });
      dialog.addEventListener('close', function () {
        document.body.style.overflow = overflow;
        if (trigger && trigger.isConnected) trigger.focus({ preventScroll: true });
        dialog.querySelector('.lb-image').removeAttribute('src');
      });
      dialog.addEventListener('keydown', function (e) {
        if (e.key === 'Tab') {
          var buttons = Array.from(dialog.querySelectorAll('button')).filter(function (b) { return !b.hidden; });
          var current = buttons.indexOf(document.activeElement);
          e.preventDefault();
          buttons[(current + (e.shiftKey ? -1 : 1) + buttons.length) % buttons.length].focus();
        }
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); step(e.key === 'ArrowRight' ? 1 : -1); }
      });
      dialog.addEventListener('touchstart', function (e) {
        touch = e.touches.length === 1 ? { x: e.touches[0].clientX, y: e.touches[0].clientY } : null;
      }, { passive: true });
      dialog.addEventListener('touchend', function (e) {
        if (!touch || e.touches.length || e.changedTouches.length !== 1) return;
        var dx = e.changedTouches[0].clientX - touch.x;
        var dy = e.changedTouches[0].clientY - touch.y;
        if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) step(dx < 0 ? 1 : -1);
        touch = null;
      }, { passive: true });
    }
    roots.forEach(function (root) {
      var group = [];
      root.querySelectorAll('figure').forEach(function (figure) {
        var img = figure.querySelector('img');
        if (!img || figure.querySelector('iframe,video') || figure.closest('.rs-owner-note,.tips-media') || figure.querySelector('figure')) return;
        var anchor = img.closest('a');
        if (anchor && !/\.(jpg|jpeg|png|webp|avif)(\?|$)/i.test(anchor.href)) return;
        var caption = figure.querySelector('figcaption');
        var text = caption ? Array.from(caption.childNodes).map(function (n) { return n.textContent; }).join(' ').trim().replace(/\s+/g, ' ') : img.alt;
        if (caption) {
          if (!caption.querySelector('strong')) {
            var parts = text.match(/^(.+?\.)\s+(.*)$/);
            var title = document.createElement('strong');
            var copy = document.createElement('span');
            title.textContent = parts ? parts[1] : text;
            copy.textContent = parts ? parts[2] : '';
            caption.replaceChildren(title, document.createTextNode(' '), copy);
          }
          caption.classList.add('inner');
        }
        figure.classList.add('hero', 'rs-media', 'rs-photo');
        img.classList.add('hero-img', 'zoomable');
        if (!anchor) {
          anchor = document.createElement('a');
          anchor.href = img.currentSrc || img.src;
          img.replaceWith(anchor);
          anchor.appendChild(img);
        }
        anchor.classList.add('rs-gallery-trigger');
        anchor.setAttribute('aria-label', 'Zvětšit fotografii: ' + (img.alt || text));
        anchor.setAttribute('aria-haspopup', 'dialog');
        var item = { anchor: anchor, img: img, href: anchor.href, caption: text };
        group.push(item);
        anchor.addEventListener('click', function (e) {
          if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0 || typeof HTMLDialogElement === 'undefined' || !HTMLDialogElement.prototype.showModal) return;
          e.preventDefault();
          build();
          items = group;
          index = items.indexOf(item);
          trigger = anchor;
          overflow = document.body.style.overflow;
          show();
          dialog.showModal();
          document.body.style.overflow = 'hidden';
          dialog.querySelector('.lb-close').focus();
        });
      });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
}());
