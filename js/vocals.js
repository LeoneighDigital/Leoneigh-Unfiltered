/* ============================================================
   PAGE: VOCALS
   ============================================================ */
function renderVocals() {
  var app = document.getElementById('app');
  app.innerHTML =
    '<section class="section">' +
      '<div class="section-label">DISCIPLINE: VOCAL MECHANICS // STEM DISTRIBUTION</div>' +
      '<div class="section-heading">THE SONIC ARCHIVE & STEM LAB</div>' +
      '<div class="tag-row">' +
        '<span class="tag">REGISTER: CONTEMPORARY BELT / MIX</span>' +
        '<span class="tag">AGILITY & RUNS</span>' +
        '<span class="tag">DRY MIC // ZERO REVERB</span>' +
      '</div>' +
      '<div class="stem-list" id="vocals-stems"></div>' +
      '<div class="stem-dispatch">' +
        '<span class="stem-dispatch-text">Request 24-bit / 48kHz WAV stems for production and remixes.</span>' +
        '<button class="btn" data-stems>REQUEST STEMS <span class="arrow">&rarr;</span></button>' +
      '</div>' +
    '</section>' +
    '<section class="section">' +
      '<div class="section-label">SESSION METADATA</div>' +
      '<div class="section-sub">All tracks captured through a condenser cardioid microphone into a clean gain stage. No processing applied to the dry feed.</div>' +
      '<div class="rule"></div>' +
      '<div class="section-sub" style="font-size:10px; color:var(--tx-d);">MIC: Condenser Cardioid // INTERFACE: Clean Gain Stage<br>KEY: Eb Minor // RANGE: G3 - C5 // BPM: 112</div>' +
    '</section>';

  var stemContainer = document.getElementById('vocals-stems');
  TRACKS.forEach(function (cfg) {
    var el = document.createElement('div');
    el.className = 'stem-item';
    stemContainer.appendChild(el);
    var p = new StemPlayer(el, cfg);
    registerCleanup(function () { p.destroy(); });
  });

  var stemsBtn = app.querySelector('[data-stems]');
  if (stemsBtn) stemsBtn.addEventListener('click', function () { openModal('modal-stems'); });
}
