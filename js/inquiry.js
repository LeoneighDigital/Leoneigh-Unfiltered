/* ============================================================
   PAGE: INQUIRY
   ============================================================ */
function renderInquiry() {
  var app = document.getElementById('app');
  app.innerHTML =
    '<section class="section">' +
      '<div class="section-label">CREATIVE DISPATCH & STUDIO BRIDGE</div>' +
      '<div class="section-heading">COLLABORATION PROTOCOL</div>' +
      '<div class="section-sub">For choreographers, producers, directors, and brands. Serious inbound only.</div>' +
      '<ul class="protocol-list">' +
        '<li>Asynchronous communication preferred.</li>' +
        '<li>Stems and vocal tracks delivered in uncompressed 24-bit WAV.</li>' +
        '<li>On-set / rehearsal bookings require a documented creative brief.</li>' +
      '</ul>' +
    '</section>' +
    '<section class="section">' +
      '<div class="section-label">ASYNCHRONOUS BOOKING FORM</div>' +
      '<div class="section-heading">DISPATCH</div>' +
      '<div class="section-sub">All fields reviewed within 48 hours. No automated replies.</div>' +
      '<form class="form" id="inquiry-form" novalidate>' +
        '<div class="form-field">' +
          '<label for="f-name">[01] NAME / STUDIO OR ARTIST HANDLE</label>' +
          '<input type="text" id="f-name" name="name" placeholder="Name / Studio / Handle" required autocomplete="name">' +
        '</div>' +
        '<div class="form-field">' +
          '<label for="f-type">[02] PROJECT TYPE</label>' +
          '<select id="f-type" name="type" required>' +
            '<option value="" disabled selected>Select project type</option>' +
            '<option value="Vocal Session">Vocal Session</option>' +
            '<option value="Choreo Collaboration">Choreo Collaboration</option>' +
            '<option value="Visual Feature">Visual Feature</option>' +
          '</select>' +
        '</div>' +
        '<div class="form-field">' +
          '<label for="f-specs">[03] TIMELINE & SPECIFICATIONS</label>' +
          '<textarea id="f-specs" name="specs" placeholder="Timeline, deliverables, creative brief summary" required></textarea>' +
        '</div>' +
        '<button type="submit" class="form-submit">SUBMIT INQUIRY &rarr;</button>' +
        '<div class="form-msg" id="inquiry-msg"></div>' +
      '</form>' +
    '</section>' +
    '<section class="section">' +
      '<div class="section-label">SISTER STUDIO BRIDGE</div>' +
      '<div class="ld-bridge">' +
        '<span class="ld-bridge-label">LOOKING FOR SOFTWARE ARCHITECTURE OR CLIENT VAULTS?</span>' +
        '<a href="https://leoneighdigital.github.io/leoneigh-digital/index.html" class="ld-bridge-link" data-ld-link><span class="bracket">[</span>LD<span class="bracket">]</span> LEONEIGH DIGITAL &mdash; Fixed retainers for commercial production houses <span class="arrow">&rarr;</span></a>' +
      '</div>' +
    '</section>';

  var form = document.getElementById('inquiry-form');
  var msg = document.getElementById('inquiry-msg');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.querySelector('#f-name').value.trim();
      var type = form.querySelector('#f-type').value;
      var specs = form.querySelector('#f-specs').value.trim();
      if (!name || !type || !specs) {
        msg.className = 'form-msg error';
        msg.textContent = 'All fields are required for dispatch.';
        return;
      }
      msg.className = 'form-msg success';
      msg.textContent = 'Inquiry received. Protocol response within 48 hours.';
      form.reset();
    });
  }

  var ldLink = app.querySelector('[data-ld-link]');
  if (ldLink) {
    ldLink.addEventListener('click', function (e) {
      e.preventDefault();
      msg.className = 'form-msg';
      msg.textContent = 'Redirecting to Leoneigh Digital...';
    });
  }
}
