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