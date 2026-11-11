
/* ============================================================
   PAGE: HUB
   ============================================================ */
function renderHub() {
  var app = document.getElementById('app');
  app.innerHTML =
    // [01] SCREENING TERMINAL
    '<section class="section" id="terminal">' +
      '<div class="section-label">[01] // SCREENING TERMINAL</div>' +
      '<div class="terminal" id="hero-terminal"></div>' +
    '</section>' +

    // [02] VOCAL & STEM ARCHIVE
    '<section class="section" id="archive">' +
      '<div class="section-label">[02] // VOCAL & STEM ARCHIVE</div>' +
      '<div class="section-heading">WEB AUDIO ENGINE</div>' +
      '<div class="section-sub">Clean vocal runs, belt drills, and acapella layers. All tracks streamed dry and uncompressed.</div>' +
      '<div class="stem-list" id="hub-stems"></div>' +
      '<div class="stem-dispatch">' +
        '<span class="stem-dispatch-text">Production stems available on request. 24-bit / 48kHz WAV.</span>' +
        '<button class="btn" data-stems>REQUEST STEMS <span class="arrow">&rarr;</span></button>' +
      '</div>' +
    '</section>' +

    // [03] REPERTORY GRID
    '<section class="section" id="repertory">' +
      '<div class="section-label">[03] // REPERTORY & DISCIPLINE GRID</div>' +
      '<div class="rep-grid">' +
        '<div class="rep-cell">' +
          '<div class="rep-num">01.</div>' +
          '<div class="rep-title">Vocal Mechanics</div>' +
          '<div class="rep-desc">Agility exercises, chest / mix resonance drills, and cover stems. Dry-mic captures with zero processing.</div>' +
        '</div>' +
        '<div class="rep-cell">' +
          '<div class="rep-num">02.</div>' +
          '<div class="rep-title">Street Choreography</div>' +
          '<div class="rep-desc">Urban movement studies, isolation takes, and rehearsal timing logs. Continuous single-take captures.</div>' +
        '</div>' +
        '<div class="rep-cell">' +
          '<div class="rep-num">03.</div>' +
          '<div class="rep-title">Visual Direction</div>' +
          '<div class="rep-desc">DaVinci Resolve color palettes, framing ratios, and low-key lighting setups. Applied to motion and performance captures.</div>' +
        '</div>' +
      '</div>' +
    '</section>' +

    // [04] SATELLITE DISPATCH
    '<section class="section" id="dispatch">' +
      '<div class="section-label">[04] // SATELLITE DISPATCH</div>' +
      '<div class="sat-list">' +
        '<a href="https://www.tiktok.com/@leoneigh.unfilter" class="sat-item" data-external="tiktok" target="_blank" rel="noopener noreferrer">' +
          '<span class="sat-badge">[TT]</span>' +
          '<span class="sat-name">TikTok</span>' +
          '<span class="sat-desc">Raw rehearsal clips, micro-drills, and progress snippets.</span>' +
          '<span class="sat-arrow">&rarr;</span>' +
        '</a>' +
        '<a href="https://www.instagram.com/leoneighunfiltered/" class="sat-item" data-external="instagram" target="_blank" rel="noopener noreferrer">' +
          '<span class="sat-badge">[IG]</span>' +
          '<span class="sat-name">Instagram</span>' +
          '<span class="sat-desc">Curated visual catalog, movement stills, and aesthetic moodboards.</span>' +
          '<span class="sat-arrow">&rarr;</span>' +
        '</a>' +
        '<a href="https://www.youtube.com/channel/UCvdi1iA8mTj16d0GA8U1zpQ" class="sat-item" data-external="youtube" target="_blank" rel="noopener noreferrer">' +
          '<span class="sat-badge">[YT]</span>' +
          '<span class="sat-name">YouTube</span>' +
          '<span class="sat-desc">Full-length choreography rehearsals and uncompressed audio archives.</span>' +
          '<span class="sat-arrow">&rarr;</span>' +
        '</a>' +
      '</div>' +
    '</section>' +

    // [05] INQUIRY BRIDGE
    '<section class="section" id="inquiry-bridge">' +
      '<div class="section-label">[05] // ASYNCHRONOUS INQUIRY</div>' +
      '<div class="section-heading">DIRECT COLLABORATION PROTOCOL</div>' +
      '<div class="section-sub">For directors, choreographers, producers, and brands. Administrative friction is zero.</div>' +
      '<ul class="protocol-list">' +
        '<li>Asynchronous communication preferred.</li>' +
        '<li>Stems and vocal tracks delivered in uncompressed 24-bit WAV.</li>' +
        '<li>On-set / rehearsal bookings require a documented creative brief.</li>' +
      '</ul>' +
      '<a href="#/inquiry" class="btn">OPEN DISPATCH FORM <span class="arrow">&rarr;</span></a>' +
      '<div class="ld-bridge">' +
        '<span class="ld-bridge-label">FOR SOFTWARE ARCHITECTURE, CUSTOM AUDIO SYSTEMS, AND WEB INFRASTRUCTURE:</span>' +
        '<a href="https://leoneighdigital.github.io/leoneigh-digital/index.html" class="ld-bridge-link" target="_blank" rel="noopener noreferrer"><span class="bracket">[</span>LD<span class="bracket">]</span> LEONEIGH DIGITAL <span class="arrow">&rarr;</span></a>' +
      '</div>' +
    '</section>';

  // Hero terminal
  var hero = new MotionTerminal(document.getElementById('hero-terminal'), {
    duration: 45,
    label: 'FEATURED CUT',
    meta: '<span class="meta-item">DRILL: <span class="val">45s</span></span>' +
          '<span class="meta-item">SPRINT BPM: <span class="val">104</span></span>' +
          '<span class="meta-item">FOCUS: <span class="val">Hip hinge // weight shifts</span></span>',
    cycle: 6,
    accent: '#7f1d1d'
  });
  registerCleanup(function () { hero.destroy(); });

  // Stem players
  var stemContainer = document.getElementById('hub-stems');
  TRACKS.forEach(function (cfg) {
    var el = document.createElement('div');
    el.className = 'stem-item';
    stemContainer.appendChild(el);
    var p = new StemPlayer(el, cfg);
    registerCleanup(function () { p.destroy(); });
  });

  // Stems modal trigger
  var stemsBtn = app.querySelector('[data-stems]');
  if (stemsBtn) stemsBtn.addEventListener('click', function () { openModal('modal-stems'); });
}
