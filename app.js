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
   STEM PLAYER
   ============================================================ */
function StemPlayer(container, config) {
  this.el = container;
  this.config = config;
  this.ctx = null;
  this.playing = false;
  this.startCtxTime = 0;
  this.pausedElapsed = 0;
  this.rafId = null;
  this.nodes = [];
  this.duration = config.duration;
  this._build();
}

StemPlayer.prototype._build = function () {
  var self = this;
  var cfg = this.config;
  this.el.innerHTML =
    '<div class="stem-main">' +
      '<button class="stem-play" aria-label="Play ' + cfg.title + '"><span class="icon-play"></span></button>' +
      '<div class="stem-info">' +
        '<div class="stem-id">' + cfg.id + '</div>' +
        '<div class="stem-title">' + cfg.title + '</div>' +
      '</div>' +
      '<div class="stem-scrubber"><div class="stem-scrubber-track"><div class="stem-scrubber-fill"></div></div></div>' +
      '<div class="stem-time">00:00 / ' + fmtTime(this.duration) + '</div>' +
    '</div>' +
    '<div class="stem-meta-row">' +
      '<span>MIC: <span class="m-val">Condenser Cardioid</span></span>' +
      '<span>INTERFACE: <span class="m-val">Clean Gain Stage</span></span>' +
      '<span>KEY: <span class="m-val">' + cfg.key + '</span></span>' +
      '<span>RANGE: <span class="m-val">' + cfg.range + '</span></span>' +
      '<span>BPM: <span class="m-val">' + cfg.bpm + '</span></span>' +
    '</div>';

  this.playBtn = $('.stem-play', this.el);
  this.playIcon = this.playBtn.firstChild;
  this.scrubber = $('.stem-scrubber', this.el);
  this.fill = $('.stem-scrubber-fill', this.el);
  this.timeEl = $('.stem-time', this.el);

  this.playBtn.addEventListener('click', function () { self.toggle(); });
  this.scrubber.addEventListener('pointerdown', function (e) { self.seek(e); });
};

StemPlayer.prototype._ensureCtx = function () {
  if (!this.ctx) this.ctx = getAudioCtx();
  return this.ctx;
};

StemPlayer.prototype._elapsed = function () {
  if (!this.ctx || !this.playing) return this.pausedElapsed;
  return this.ctx.currentTime - this.startCtxTime;
};

StemPlayer.prototype.toggle = function () {
  if (this.playing) this.pause(); else this.play();
};

StemPlayer.prototype.play = function () {
  var ctx = this._ensureCtx();
  if (!ctx) return;
  var offset = this.pausedElapsed;
  if (this.duration - offset <= 0.05) offset = 0;
  this._schedule(offset, this.duration - offset);
  this.startCtxTime = ctx.currentTime - offset;
  this.playing = true;
  this._renderIcon();
  this._tick();
};

StemPlayer.prototype.pause = function () {
  this.pausedElapsed = clamp(this._elapsed(), 0, this.duration);
  this.playing = false;
  this._stopNodes();
  if (this.rafId) { cancelAnimationFrame(this.rafId); this.rafId = null; }
  this._renderIcon();
  this._renderProgress(this.pausedElapsed);
};

StemPlayer.prototype._stopNodes = function () {
  this.nodes.forEach(function (n) {
    try { if (n.stop) n.stop(); } catch (e) {}
    try { if (n.disconnect) n.disconnect(); } catch (e) {}
  });
  this.nodes = [];
};

StemPlayer.prototype._schedule = function (offset, duration) {
  var ctx = this.ctx;
  var now = ctx.currentTime;
  var notes = this.config.notes;
  var wave = this.config.wave || 'triangle';
  var filterFreq = this.config.filter || 1800;
  var self = this;

  notes.forEach(function (note) {
    var nStart = note.t;
    var nEnd = note.t + note.d;
    if (nEnd <= offset) return;
    var effStart = Math.max(nStart, offset);
    var remain = nEnd - effStart;
    if (remain <= 0.04) return;

    var when = now + (effStart - offset);

    var osc = ctx.createOscillator();
    var gain = ctx.createGain();
    var filt = ctx.createBiquadFilter();

    osc.type = wave;
    osc.frequency.value = note.f;

    filt.type = 'lowpass';
    filt.frequency.value = filterFreq;
    filt.Q.value = 0.8;

    gain.gain.setValueAtTime(0, when);
    gain.gain.linearRampToValueAtTime(note.a, when + 0.04);
    gain.gain.setValueAtTime(note.a, when + Math.max(0.05, remain - 0.12));
    gain.gain.linearRampToValueAtTime(0, when + remain);

    if (self.config.vibrato) {
      var lfo = ctx.createOscillator();
      var lfoGain = ctx.createGain();
      lfo.frequency.value = self.config.vibrato.rate;
      lfoGain.gain.value = self.config.vibrato.depth;
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      lfo.start(when);
      lfo.stop(when + remain);
      self.nodes.push(lfo);
    }

    osc.connect(filt);
    filt.connect(gain);
    gain.connect(ctx.destination);
    osc.start(when);
    osc.stop(when + remain);
    self.nodes.push(osc);
  });
};

StemPlayer.prototype._tick = function () {
  var self = this;
  if (!this.playing) return;
  var t = this._elapsed();
  if (t >= this.duration) {
    this.pausedElapsed = 0;
    this.playing = false;
    this._stopNodes();
    this._renderIcon();
    this._renderProgress(0);
    return;
  }
  this._renderProgress(t);
  this.rafId = requestAnimationFrame(function () { self._tick(); });
};

StemPlayer.prototype._renderProgress = function (t) {
  var pct = clamp(t / this.duration, 0, 1) * 100;
  this.fill.style.width = pct + '%';
  this.timeEl.textContent = fmtTime(t) + ' / ' + fmtTime(this.duration);
};

StemPlayer.prototype._renderIcon = function () {
  this.playIcon.className = this.playing ? 'icon-pause' : 'icon-play';
  this.playBtn.setAttribute('aria-label', (this.playing ? 'Pause ' : 'Play ') + this.config.title);
};

StemPlayer.prototype.seek = function (e) {
  var rect = this.scrubber.getBoundingClientRect();
  var pct = clamp((e.clientX - rect.left) / rect.width, 0, 1);
  var newTime = pct * this.duration;
  if (this.playing) {
    this._stopNodes();
    this._schedule(newTime, this.duration - newTime);
    this.startCtxTime = this.ctx.currentTime - newTime;
  } else {
    this.pausedElapsed = newTime;
    this._renderProgress(newTime);
  }
};

StemPlayer.prototype.destroy = function () {
  this._stopNodes();
  if (this.rafId) { cancelAnimationFrame(this.rafId); this.rafId = null; }
};

/* ============================================================
   MOTION TERMINAL (CANVAS)
   ============================================================ */
var SKELETON = ['head','neck','lSh','rSh','lEl','rEl','lHa','rHa','hip','lHi','rHi','lKn','rKn','lFo','rFo'];
var BONES = [
  ['head','neck'], ['neck','lSh'], ['neck','rSh'],
  ['lSh','lEl'], ['lEl','lHa'],
  ['rSh','rEl'], ['rEl','rHa'],
  ['neck','hip'], ['hip','lHi'], ['hip','rHi'],
  ['lHi','lKn'], ['lKn','lFo'],
  ['rHi','rKn'], ['rKn','rFo']
];
var POSES = [
  { head:[.50,.12], neck:[.50,.20], lSh:[.41,.22], rSh:[.59,.22],
    lEl:[.36,.35], rEl:[.64,.35], lHa:[.33,.48], rHa:[.67,.48],
    hip:[.50,.50], lHi:[.44,.52], rHi:[.56,.52],
    lKn:[.42,.72], rKn:[.58,.72], lFo:[.40,.90], rFo:[.60,.90] },
  { head:[.52,.12], neck:[.52,.20], lSh:[.43,.22], rSh:[.61,.22],
    lEl:[.30,.30], rEl:[.72,.30], lHa:[.22,.40], rHa:[.82,.42],
    hip:[.52,.50], lHi:[.46,.52], rHi:[.58,.52],
    lKn:[.44,.72], rKn:[.62,.70], lFo:[.42,.90], rFo:[.66,.88] },
  { head:[.48,.18], neck:[.48,.26], lSh:[.39,.28], rSh:[.57,.28],
    lEl:[.32,.40], rEl:[.64,.40], lHa:[.28,.52], rHa:[.70,.52],
    hip:[.48,.54], lHi:[.42,.56], rHi:[.54,.56],
    lKn:[.38,.72], rKn:[.58,.72], lFo:[.36,.90], rFo:[.62,.90] },
  { head:[.52,.14], neck:[.52,.22], lSh:[.43,.24], rSh:[.61,.24],
    lEl:[.38,.14], rEl:[.66,.14], lHa:[.34,.04], rHa:[.70,.04],
    hip:[.52,.50], lHi:[.46,.52], rHi:[.58,.52],
    lKn:[.44,.72], rKn:[.60,.72], lFo:[.42,.90], rFo:[.62,.90] }
];

function lerpPose(a, b, t) {
  var out = {};
  SKELETON.forEach(function (k) {
    out[k] = [
      a[k][0] + (b[k][0] - a[k][0]) * t,
      a[k][1] + (b[k][1] - a[k][1]) * t
    ];
  });
  return out;
}

function getPose(elapsed, cycleDur) {
  cycleDur = cycleDur || 6;
  var total = POSES.length;
  var pos = (elapsed / cycleDur) % 1;
  var idx = Math.floor(pos * total);
  var frac = (pos * total) - idx;
  var next = (idx + 1) % total;
  var s = frac * frac * (3 - 2 * frac);
  return lerpPose(POSES[idx], POSES[next], s);
}

function drawFrame(ctx, W, H, t, opts) {
  opts = opts || {};
  var accent = opts.accent || '#d8d8d8';
  var gridCol = opts.grid || '#141414';
  var bg = opts.bg || '#0a0a0a';

  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  ctx.strokeStyle = gridCol;
  ctx.lineWidth = 1;
  var gs = 44;
  for (var x = 0; x < W; x += gs) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
  }
  for (var y = 0; y < H; y += gs) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
  }

  var numPts = 4;
  for (var i = 0; i < numPts; i++) {
    var phase = i * 1.1;
    var trailLen = 16;
    for (var j = 0; j < trailLen; j++) {
      var tt = t - j * 0.035;
      var px = W * 0.5 + Math.sin(tt * 0.55 + phase) * W * 0.26 * Math.sin(tt * 0.22 + i * 2);
      var py = H * 0.5 + Math.cos(tt * 0.42 + phase * 1.3) * H * 0.28;
      var alpha = (1 - j / trailLen) * 0.18;
      var size = (1 - j / trailLen) * 2.2;
      ctx.fillStyle = 'rgba(200,200,200,' + alpha + ')';
      ctx.beginPath();
      ctx.arc(px, py, Math.max(0.3, size), 0, Math.PI * 2);
      ctx.fill();
    }
  }

  var pose = getPose(t, opts.cycle || 6);
  var sx = W / 2;
  var sy = H / 2;
  var scale = Math.min(W, H) * 0.78;

  ctx.strokeStyle = accent;
  ctx.lineWidth = Math.max(1, W * 0.0016);
  ctx.lineCap = 'round';

  BONES.forEach(function (pair) {
    var a = pose[pair[0]];
    var b = pose[pair[1]];
    ctx.beginPath();
    ctx.moveTo(sx + (a[0] - 0.5) * scale, sy + (a[1] - 0.5) * scale);
    ctx.lineTo(sx + (b[0] - 0.5) * scale, sy + (b[1] - 0.5) * scale);
    ctx.stroke();
  });

  ctx.fillStyle = accent;
  SKELETON.forEach(function (k) {
    var p = pose[k];
    var px = sx + (p[0] - 0.5) * scale;
    var py = sy + (p[1] - 0.5) * scale;
    ctx.beginPath();
    ctx.arc(px, py, Math.max(1.5, W * 0.0035), 0, Math.PI * 2);
    ctx.fill();
  });

  var hp = pose.head;
  ctx.beginPath();
  ctx.arc(sx + (hp[0] - 0.5) * scale, sy + (hp[1] - 0.5) * scale - W * 0.008, W * 0.012, 0, Math.PI * 2);
  ctx.stroke();

  var scanY = ((t * 0.35) % 1) * H;
  ctx.strokeStyle = 'rgba(180,180,180,0.06)';
  ctx.beginPath();
  ctx.moveTo(0, scanY);
  ctx.lineTo(W, scanY);
  ctx.stroke();

  ctx.fillStyle = 'rgba(180,180,180,0.35)';
  ctx.font = '9px monospace';
  ctx.textBaseline = 'top';
  ctx.fillText('REC // ' + fmtTime(t), 14, 14);
  var frame = Math.floor(t * 30);
  ctx.fillText('FRM ' + String(frame).padStart(5, '0'), 14, 28);
  ctx.fillText('ISO // 2026', W - 80, 14);
}

function MotionTerminal(container, opts) {
  opts = opts || {};
  this.el = container;
  this.opts = opts;
  this.duration = opts.duration || 45;
  this.loop = opts.loop !== false;
  this.playing = false;
  this.elapsed = opts.startOffset || 0;
  this.lastTs = 0;
  this.rafId = null;
  this.W = 0;
  this.H = 0;
  this._build();
}

MotionTerminal.prototype._build = function () {
  var self = this;
  var label = this.opts.label || 'STUDY';
  var meta = this.opts.meta || '';

  this.el.innerHTML =
    '<div class="terminal-canvas-wrap">' +
      '<canvas></canvas>' +
      '<div class="terminal-corner tl"></div>' +
      '<div class="terminal-corner tr"></div>' +
      '<div class="terminal-corner bl"></div>' +
      '<div class="terminal-corner br"></div>' +
      '<div class="terminal-overlay' + (this.playing ? ' hidden' : '') + '">' +
        '<button class="terminal-play-large" aria-label="Play">' +
          '<span class="icon-play"></span>' +
        '</button>' +
      '</div>' +
    '</div>' +
    '<div class="terminal-controls">' +
      '<button class="tc-btn tc-play" aria-label="Play"><span class="icon-play"></span></button>' +
      '<div class="tc-progress"><div class="tc-track"><div class="tc-fill"></div></div></div>' +
      '<div class="tc-time">00:00 / ' + fmtTime(this.duration) + '</div>' +
      '<button class="tc-btn tc-fs" aria-label="Fullscreen"><span class="icon-fs"></span></button>' +
    '</div>' +
    (meta ? '<div class="terminal-meta">' +
      '<span class="tag">' + label + '</span>' + meta +
    '</div>' : '');

  this.canvas = $('canvas', this.el);
  this.ctx2d = this.canvas.getContext('2d');
  this.overlay = $('.terminal-overlay', this.el);
  this.bigPlay = $('.terminal-play-large', this.el);
  this.playBtn = $('.tc-play', this.el);
  this.playIcon = this.playBtn.firstChild;
  this.progress = $('.tc-progress', this.el);
  this.fill = $('.tc-fill', this.el);
  this.timeEl = $('.tc-time', this.el);
  this.fsBtn = $('.tc-fs', this.el);

  this.bigPlay.addEventListener('click', function () { self.play(); });
  this.playBtn.addEventListener('click', function () { self.toggle(); });
  this.progress.addEventListener('pointerdown', function (e) { self.seek(e); });
  this.fsBtn.addEventListener('click', function () {
    var wrap = self.canvas.parentNode;
    if (wrap.requestFullscreen) wrap.requestFullscreen();
  });

  this._resize();
  this._onResize = function () { self._resize(); };
  window.addEventListener('resize', this._onResize);

  this._startLoop();
};

MotionTerminal.prototype._resize = function () {
  var rect = this.canvas.getBoundingClientRect();
  if (!rect.width || !rect.height) return;
  var dpr = window.devicePixelRatio || 1;
  this.W = rect.width;
  this.H = rect.height;
  this.canvas.width = Math.round(rect.width * dpr);
  this.canvas.height = Math.round(rect.height * dpr);
  this.ctx2d.setTransform(dpr, 0, 0, dpr, 0, 0);
};

MotionTerminal.prototype._startLoop = function () {
  var self = this;
  this.lastTs = 0;
  function loop(ts) {
    if (!self.lastTs) self.lastTs = ts;
    var dt = Math.min((ts - self.lastTs) / 1000, 0.1);
    self.lastTs = ts;
    if (self.playing) {
      self.elapsed += dt;
      if (self.elapsed >= self.duration) {
        if (self.loop) self.elapsed = 0;
        else { self.elapsed = self.duration; self.pause(); }
      }
      self._renderProgress();
    }
    drawFrame(self.ctx2d, self.W, self.H, self.elapsed, {
      accent: self.opts.accent || '#d8d8d8',
      cycle: self.opts.cycle || 6
    });
    self.rafId = requestAnimationFrame(loop);
  }
  this.rafId = requestAnimationFrame(loop);
};

MotionTerminal.prototype._renderProgress = function () {
  var pct = clamp(this.elapsed / this.duration, 0, 1) * 100;
  this.fill.style.width = pct + '%';
  this.timeEl.textContent = fmtTime(this.elapsed) + ' / ' + fmtTime(this.duration);
};

MotionTerminal.prototype._renderIcon = function () {
  this.playIcon.className = this.playing ? 'icon-pause' : 'icon-play';
  if (this.overlay) this.overlay.classList.toggle('hidden', this.playing);
  this.playBtn.setAttribute('aria-label', this.playing ? 'Pause' : 'Play');
};

MotionTerminal.prototype.toggle = function () {
  if (this.playing) this.pause(); else this.play();
};
MotionTerminal.prototype.play = function () { this.playing = true; this._renderIcon(); };
MotionTerminal.prototype.pause = function () { this.playing = false; this._renderIcon(); };
MotionTerminal.prototype.seek = function (e) {
  var rect = this.progress.getBoundingClientRect();
  var pct = clamp((e.clientX - rect.left) / rect.width, 0, 1);
  this.elapsed = pct * this.duration;
  this._renderProgress();
};
MotionTerminal.prototype.destroy = function () {
  if (this.rafId) { cancelAnimationFrame(this.rafId); this.rafId = null; }
  if (this._onResize) window.removeEventListener('resize', this._onResize);
};

