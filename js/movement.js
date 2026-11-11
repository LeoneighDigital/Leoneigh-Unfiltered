/* ============================================================
   PAGE: MOVEMENT
   ============================================================ */
function renderMovement() {
  var app = document.getElementById('app');
  app.innerHTML =
    '<section class="section">' +
      '<div class="section-label">DISCIPLINE: URBAN & STREET CHOREOGRAPHY // PHYSICAL MECHANICS</div>' +
      '<div class="section-heading">CHOREOGRAPHY & MOTION STUDIES</div>' +
      '<div class="tag-row">' +
        '<span class="tag">INDEX: 2026 REPERTORY</span>' +
        '<span class="tag">ISOLATIONS, GROOVES & FOOTWORK</span>' +
      '</div>' +
      '<div class="motion-grid">' +
        '<div class="motion-cell" id="motion-1"></div>' +
        '<div class="motion-cell" id="motion-2"></div>' +
        '<div class="motion-cell wide" id="motion-3"></div>' +
      '</div>' +
    '</section>' +
    '<section class="section">' +
      '<div class="section-label">REHEARSAL LOG / PERFORMANCE NOTES</div>' +
      '<div class="motion-log">' +
        '<div class="log-line"><span class="log-key">STUDY 01</span><span class="log-val">CHOREO CREDIT: Self / Original // DRILL DURATION: 45s // SPRINT BPM: 104</span></div>' +
        '<div class="log-line"><span class="log-key">STUDY 02</span><span class="log-val">FOCUS: Hip hinge, sharp head stops, clean weight shifts</span></div>' +
        '<div class="log-line"><span class="log-key">STUDY 03</span><span class="log-val">Full choreography routine // single continuous take // unedited</span></div>' +
      '</div>' +
    '</section>';

  var studies = [
    {
      id: 'motion-1',
      label: 'STUDY 01',
      meta: '<span class="meta-item">DRILL: <span class="val">45s</span></span><span class="meta-item">SPRINT BPM: <span class="val">104</span></span>',
      cycle: 4.2,
      accent: '#d8d8d8',
      duration: 45
    },
    {
      id: 'motion-2',
      label: 'STUDY 02',
      meta: '<span class="meta-item">DRILL: <span class="val">45s</span></span><span class="meta-item">FOCUS: <span class="val">Floor transitions</span></span>',
      cycle: 5.5,
      accent: '#c8c8c8',
      duration: 45
    },
    {
      id: 'motion-3',
      label: 'STUDY 03',
      meta: '<span class="meta-item">FULL ROUTINE: <span class="val">Single take // unedited</span></span><span class="meta-item">SPRINT BPM: <span class="val">104</span></span>',
      cycle: 7.2,
      accent: '#e0e0e0',
      duration: 90
    }
  ];

  studies.forEach(function (s) {
    var el = document.getElementById(s.id);
    if (!el) return;
    var t = new MotionTerminal(el, {
      duration: s.duration,
      label: s.label,
      meta: s.meta,
      cycle: s.cycle,
      accent: s.accent
    });
    registerCleanup(function () { t.destroy(); });
  });
}
