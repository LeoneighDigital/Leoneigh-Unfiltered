/* ============================================================
   UTILITIES
   ============================================================ */
function $(sel, ctx) { return (ctx || document).querySelector(sel); }
function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
function fmtTime(t) {
  t = Math.max(0, t);
  var m = Math.floor(t / 60);
  var s = Math.floor(t % 60);
  return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
}
function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

/* Cleanup registry */
var cleanups = [];
function registerCleanup(fn) { cleanups.push(fn); }
function runCleanups() {
  cleanups.forEach(function (fn) { try { fn(); } catch (e) {} });
  cleanups = [];
}

/* Clock */
function tickClock() {
  var el = document.getElementById('clock');
  if (!el) return;
  var d = new Date();
  el.textContent =
    String(d.getUTCHours()).padStart(2, '0') + ':' +
    String(d.getUTCMinutes()).padStart(2, '0') + ':' +
    String(d.getUTCSeconds()).padStart(2, '0') + ' UTC';
}
setInterval(tickClock, 1000);
tickClock();

/* ============================================================
   SHARED AUDIO CONTEXT
   ============================================================ */
var sharedCtx = null;
function getAudioCtx() {
  if (!sharedCtx) {
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    sharedCtx = new AC();
  }
  if (sharedCtx.state === 'suspended') sharedCtx.resume();
  return sharedCtx;
}

/* ============================================================
   ROUTER
   ============================================================ */
var routes = {
  '/': renderHub,
  '/vocals': renderVocals,
  '/movement': renderMovement,
  '/inquiry': renderInquiry
};

function getPath() {
  var h = window.location.hash || '#/';
  return h.replace(/^#/, '') || '/';
}

function setActiveNav(path) {
  $$('.nav-link').forEach(function (link) {
    link.classList.toggle('active', link.getAttribute('data-route') === path);
  });
}

function navigate() {
  runCleanups();
  var path = getPath();
  var render = routes[path];
  if (!render) { window.location.hash = '#/'; return; }
  render();
  setActiveNav(path);
  window.scrollTo(0, 0);
}

window.addEventListener('hashchange', navigate);
window.addEventListener('DOMContentLoaded', function () {
  if (!window.location.hash) window.location.hash = '#/';
  navigate();
});