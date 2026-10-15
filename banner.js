/* banner.js — persistent prototype notice for the public demo.
 * Lives outside the prototype's own template so it survives screen changes.
 * Remove this script tag from Stillhaven.dc.html to run without it.
 */
(function () {
  'use strict';

  function addBanner() {
    if (document.querySelector('[data-prototype-banner]')) return;

    var bar = document.createElement('div');
    bar.setAttribute('data-prototype-banner', '');
    bar.setAttribute('role', 'note');
    bar.style.cssText = [
      'position:sticky', 'top:0', 'z-index:10000',
      'box-sizing:border-box', 'width:100%',
      'padding:10px 16px',
      'background:rgba(13,26,48,.94)',
      'border-bottom:1px solid rgba(255,255,255,.14)',
      'color:#f3f1ee',
      "font:500 12.5px/1.45 'Inter',system-ui,-apple-system,'Segoe UI',sans-serif",
      'text-align:center'
    ].join(';');

    var link = 'color:#d3c0ec;text-decoration:underline;font-weight:600';
    bar.innerHTML =
      '<strong style="font-weight:600">Design prototype, not a finished product.</strong> ' +
      'Stillhaven is not therapy or emergency care. If you are in danger or can\u2019t stay safe, ' +
      '<a href="tel:988" style="' + link + '">call</a> or ' +
      '<a href="sms:988" style="' + link + '">text 988</a> (US) or your local emergency number.';

    document.body.insertBefore(bar, document.body.firstChild);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addBanner);
  } else {
    addBanner();
  }
})();
