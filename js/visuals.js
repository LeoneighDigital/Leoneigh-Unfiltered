/* ============================================================
   PAGE: VISUALS
   ============================================================ */
function renderVisuals() {
  var app = document.getElementById('app');
  
  // Reusable card generator to keep code clean
  function createCard(src, title, frm, category) {
    return '<div class="archive-card" data-category="' + category + '" data-src="' + src + '" data-title="' + title + '">' +
      '<div class="archive-img-wrap">' +
        '<img src="' + src + '" alt="' + title + '" loading="lazy">' +
        '<div class="archive-reticle tl"></div><div class="archive-reticle tr"></div><div class="archive-reticle bl"></div><div class="archive-reticle br"></div>' +
        '<div class="archive-overlay"><span>FRM // ' + frm + '</span><span>4:5 // RAW GRADE</span></div>' +
      '</div>' +
      '<div class="archive-caption">' + title + '</div>' +
    '</div>';
  }

  var frames = [
    { id: '01', title: 'SARTORIAL // Optical & Silhouette Study 01', cat: 'SARTORIAL' },
    { id: '02', title: 'MOVEMENT // Overhead Line & Kinetic Framing', cat: 'MOVEMENT' },
    { id: '03', title: 'DIRECTION // Three-Quarter Profile & Texture', cat: 'DIRECTION' },
    { id: '04', title: 'SARTORIAL // Optical & Off-Duty Study 02', cat: 'SARTORIAL' },
    { id: '05', title: 'VOCAL LAB // Studio Mood & Direct Gaze', cat: 'DIRECTION' },
    { id: '06', title: 'UNFILTERED // Candid Motion Outtake', cat: 'UNFILTERED' }
  ];

  var cardsHTML = frames.map(function(f) {
    return createCard('assets/archive/entry-001/' + f.id + '.jpeg', f.title, f.id, f.cat);
  }).join('');

  app.innerHTML =
    '<section class="section">' +
      '<div class="section-label">DISCIPLINE: VISUAL DIRECTION & SARTORIAL ARCHIVE // CONTACT SHEETS</div>' +
      '<div class="section-heading">VISUAL & SARTORIAL ARCHIVE</div>' +
      
      '<div class="filter-pills" id="visual-filters">' +
        '<button class="filter-pill active" data-filter="ALL">ALL ENTRIES [06]</button>' +
        '<button class="filter-pill" data-filter="SARTORIAL">SARTORIAL</button>' +
        '<button class="filter-pill" data-filter="DIRECTION">DIRECTION</button>' +
        '<button class="filter-pill" data-filter="UNFILTERED">UNFILTERED</button>' +
      '</div>' +

      '<div class="section-sub" style="margin-top: 24px;">ENTRY 001 // 2026 BASELINE</div>' +
      '<div class="archive-grid" id="visuals-grid">' +
        cardsHTML +
      '</div>' +
    '</section>';

  // Filtering Logic
  var filterBtns = app.querySelectorAll('.filter-pill');
  var cards = app.querySelectorAll('.archive-card');

  filterBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      // Update active state
      filterBtns.forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      
      var filter = btn.getAttribute('data-filter');
      
      cards.forEach(function(card) {
        if (filter === 'ALL' || card.getAttribute('data-category') === filter) {
          card.style.display = 'flex'; // using flex to maintain column layout
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}