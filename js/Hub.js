/* ============================================================
   PAGE: HUB
   ============================================================ */
function renderHub() {
  var app = document.getElementById('app');
  app.innerHTML =
    // [00] SYSTEM INITIALIZATION
    '<section class="section section-hero" id="system-init">' +
      '<div class="section-label">[00] // SYSTEM INITIALIZATION</div>' +
      '<div class="hero">' +
        '<div class="hero-status">' +
          '<span>SYS.INIT // LEONEIGH UNFILTERED</span>' +
          '<span class="sep">&middot;</span>' +
          '<span>EST. 2026</span>' +
          '<span class="sep">&middot;</span>' +
          '<span>PRETORIA / GAUTENG [UTC+2]</span>' +
        '</div>' +
        '<h1 class="hero-title">' +
          '<span class="hero-title-main">LEONEIGH UNFILTERED</span>' +
          '<span class="hero-title-sub">// CREATIVE LABORATORY</span>' +
        '</h1>' +
        '<p class="hero-manifesto">Multidisciplinary creative laboratory documenting vocal mechanics, street choreography, sonic production, and sartorial direction. Built in public&mdash;uncompressed, process-first, zero commercial filler.</p>' +
        '<div class="hero-actions">' +
          '<a href="#screening-terminal" class="btn-primary" data-scroll="screening-terminal">ENTER ARCHIVE &darr;</a>' +
          '<a href="#/channels" class="btn-ghost">SATELLITE CHANNELS &rarr;</a>' +
        '</div>' +
      '</div>' +
    '</section>' +

    // [01] SCREENING TERMINAL
    '<section class="section" id="screening-terminal">' +
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

    // [03] REPERTORY GRID (4 COLUMNS)
    '<section class="section" id="repertory">' +
      '<div class="section-label">[03] // REPERTORY & DISCIPLINE GRID</div>' +
      '<div class="rep-grid">' +
        '<div class="rep-cell">' +
          '<div class="rep-num">01.</div>' +
          '<div class="rep-title">Vocal Mechanics</div>' +
          '<div class="rep-desc">Agility exercises, chest / mix resonance drills, and dry-mic cover stems. Captured with zero processing.</div>' +
        '</div>' +
        '<div class="rep-cell">' +
          '<div class="rep-num">02.</div>' +
          '<div class="rep-title">Street Choreography</div>' +
          '<div class="rep-desc">Urban movement studies, isolation takes, and rehearsal timing logs. Continuous single-take captures.</div>' +
        '</div>' +
        '<div class="rep-cell">' +
          '<div class="rep-num">03.</div>' +
          '<div class="rep-title">Visual &amp; Sonic Direction</div>' +
          '<div class="rep-desc">DaVinci Resolve color palettes (deep blue, purple, dark red), low-key lighting setups, and original Sonic Lab production loops.</div>' +
        '</div>' +
        '<div class="rep-cell">' +
          '<div class="rep-num">04.</div>' +
          '<div class="rep-title">Sartorial Archive</div>' +
          '<div class="rep-desc">Silhouette studies, thrift flips, custom graphic apparel, and monochrome/deep-palette capsule lookbooks. Wearable kinetic architecture.</div>' +
        '</div>' +
      '</div>' +
    '</section>' +

    // [03.5] VISUAL & SARTORIAL ARCHIVE (NEW)
    '<section class="section" id="visual-archive">' +
      '<div class="section-label">[03.5] // VISUAL & SARTORIAL ARCHIVE</div>' +
      '<div class="section-heading">ENTRY 001 // CONTACT SHEET</div>' +
      '<div class="section-sub">BATCH: 2026.01 // LOC: PRETORIA, ZA // FRAMES: 06 // GRADE: COOL SLATE ARCHIVE</div>' +
      '<div class="archive-grid">' +
        
        // Frame 01
        '<div class="archive-card" data-src="assets/archive/entry-001/01.jpg" data-title="SARTORIAL // Optical & Silhouette Study 01">' +
          '<div class="archive-img-wrap">' +
            '<img src="assets/archive/entry-001/01.jpg" alt="Optical & Silhouette Study 01" loading="lazy">' +
            '<div class="archive-reticle tl"></div><div class="archive-reticle tr"></div><div class="archive-reticle bl"></div><div class="archive-reticle br"></div>' +
            '<div class="archive-overlay"><span>FRM // 01</span><span>4:5 // RAW GRADE</span></div>' +
          '</div>' +
          '<div class="archive-caption">SARTORIAL // Optical & Silhouette Study 01</div>' +
        '</div>' +

        // Frame 02
        '<div class="archive-card" data-src="assets/archive/entry-001/02.jpg" data-title="MOVEMENT // Overhead Line & Kinetic Framing">' +
          '<div class="archive-img-wrap">' +
            '<img src="assets/archive/entry-001/02.jpg" alt="Overhead Line & Kinetic Framing" loading="lazy">' +
            '<div class="archive-reticle tl"></div><div class="archive-reticle tr"></div><div class="archive-reticle bl"></div><div class="archive-reticle br"></div>' +
            '<div class="archive-overlay"><span>FRM // 02</span><span>4:5 // RAW GRADE</span></div>' +
          '</div>' +
          '<div class="archive-caption">MOVEMENT // Overhead Line & Kinetic Framing</div>' +
        '</div>' +

        // Frame 03
        '<div class="archive-card" data-src="assets/archive/entry-001/03.jpg" data-title="DIRECTION // Three-Quarter Profile & Texture">' +
          '<div class="archive-img-wrap">' +
            '<img src="assets/archive/entry-001/03.jpg" alt="Three-Quarter Profile & Texture" loading="lazy">' +
            '<div class="archive-reticle tl"></div><div class="archive-reticle tr"></div><div class="archive-reticle bl"></div><div class="archive-reticle br"></div>' +
            '<div class="archive-overlay"><span>FRM // 03</span><span>4:5 // RAW GRADE</span></div>' +
          '</div>' +
          '<div class="archive-caption">DIRECTION // Three-Quarter Profile & Texture</div>' +
        '</div>' +

        // Frame 04
        '<div class="archive-card" data-src="assets/archive/entry-001/04.jpg" data-title="SARTORIAL // Optical & Off-Duty Study 02">' +
          '<div class="archive-img-wrap">' +
            '<img src="assets/archive/entry-001/04.jpg" alt="Optical & Off-Duty Study 02" loading="lazy">' +
            '<div class="archive-reticle tl"></div><div class="archive-reticle tr"></div><div class="archive-reticle bl"></div><div class="archive-reticle br"></div>' +
            '<div class="archive-overlay"><span>FRM // 04</span><span>4:5 // RAW GRADE</span></div>' +
          '</div>' +
          '<div class="archive-caption">SARTORIAL // Optical & Off-Duty Study 02</div>' +
        '</div>' +

        // Frame 05
        '<div class="archive-card" data-src="assets/archive/entry-001/05.jpg" data-title="VOCAL LAB // Studio Mood & Direct Gaze">' +
          '<div class="archive-img-wrap">' +
            '<img src="assets/archive/entry-001/05.jpg" alt="Studio Mood & Direct Gaze" loading="lazy">' +
            '<div class="archive-reticle tl"></div><div class="archive-reticle tr"></div><div class="archive-reticle bl"></div><div class="archive-reticle br"></div>' +
            '<div class="archive-overlay"><span>FRM // 05</span><span>4:5 // RAW GRADE</span></div>' +
          '</div>' +
          '<div class="archive-caption">VOCAL LAB // Studio Mood & Direct Gaze</div>' +
        '</div>' +

        // Frame 06
        '<div class="archive-card" data-src="assets/archive/entry-001/06.jpg" data-title="UNFILTERED // Candid Motion Outtake">' +
          '<div class="archive-img-wrap">' +
            '<img src="assets/archive/entry-001/06.jpg" alt="Candid Motion Outtake" loading="lazy">' +
            '<div class="archive-reticle tl"></div><div class="archive-reticle tr"></div><div class="archive-reticle bl"></div><div class="archive-reticle br"></div>' +
            '<div class="archive-overlay"><span>FRM // 06</span><span>4:5 // RAW GRADE</span></div>' +
          '</div>' +
          '<div class="archive-caption">UNFILTERED // Candid Motion Outtake</div>' +
        '</div>' +

      '</div>' +
      '<div class="archive-action">' +
        '<a href="#/visuals" class="btn">OPEN FULL VISUAL ARCHIVE <span class="arrow">&rarr;</span></a>' +
      '</div>' +
    '</section>' +

    // [04] SATELLITE DISPATCH (compact — full directory lives on #/channels)
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
      '<div class="sat-foot">' +
        '<a href="#/channels" class="sat-more">OPEN FULL DIRECTORY <span class="arrow">&rarr;</span></a>' +
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
      '<a href="#/inquiry" class="btn">INITIATE INQUIRY // DISPATCH <span class="arrow">&rarr;</span></a>' +
      '<div class="ld-bridge">' +
        '<span class="ld-bridge-label">FOR SOFTWARE ARCHITECTURE, CUSTOM AUDIO SYSTEMS, AND WEB INFRASTRUCTURE:</span>' +
        '<a href="https://leoneighdigital.github.io/leoneigh-digital/" target="_blank" rel="noopener noreferrer" class="ld-bridge-link"><span class="bracket">[</span>LD<span class="bracket">]</span> LEONEIGH DIGITAL &mdash; Systems &amp; Infrastructure <span class="arrow">&#8599;</span></a>' +
      '</div>' +
    '</section>';

  // Hero terminal
  var hero = new MotionTerminal(document.getElementById('hero-terminal'), {
    duration: 45,
    label: 'FEATURED CUT',
    meta:
      '<span class="meta-item">LOC: <span class="val">PRETORIA, ZA</span></span>' +
      '<span class="meta-item">LOOK: <span class="val">ARCHIVE 01</span></span>' +
      '<span class="meta-item">DRILL: <span class="val">45s</span></span>' +
      '<span class="meta-item">SPRINT BPM: <span class="val">104</span></span>' +
      '<span class="meta-item">STATUS: <span class="val">OPERATIONAL</span></span>',
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