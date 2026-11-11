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
        '<div class="form-field">' +
          '<div class="form-field-label">EMAIL PREVIEW</div>' +
          '<pre class="form-preview" id="inquiry-preview" aria-label="Inquiry email preview"></pre>' +
        '</div>' +
        '<a class="form-submit" id="inquiry-mail" href="mailto:LeoneighDigital@gmail.com">SEND INQUIRY &rarr;</a>' +
        '<div class="form-msg" id="inquiry-msg" aria-live="polite"></div>' +
      '</form>' +
    '</section>' +
    '<section class="section">' +
      '<div class="section-label">SISTER STUDIO BRIDGE</div>' +
      '<div class="ld-bridge">' +
        '<span class="ld-bridge-label">LOOKING FOR SOFTWARE ARCHITECTURE OR CLIENT VAULTS?</span>' +
        '<a href="https://leoneighdigital.github.io/leoneigh-digital/" class="ld-bridge-link"><span class="bracket">[</span>LD<span class="bracket">]</span> LEONEIGH DIGITAL &mdash; Fixed retainers for commercial production houses <span class="arrow">&rarr;</span></a>' +
      '</div>' +
    '</section>';

  var form = document.getElementById('inquiry-form');
  var msg = document.getElementById('inquiry-msg');
  var preview = document.getElementById('inquiry-preview');
  var mailLink = document.getElementById('inquiry-mail');

  function buildRequest() {
    var name = form.querySelector('#f-name').value.trim() || '—';
    var type = form.querySelector('#f-type').value || '—';
    var specs = form.querySelector('#f-specs').value.trim() || '—';
    var subject = 'Creative inquiry: ' + type;
    var body = [
      'Hello Leoneigh Unfiltered,',
      '',
      'I would like to discuss a creative project.',
      '',
      'PROJECT',
      'Name / studio / handle: ' + name,
      'Project type: ' + type,
      'Timeline & specifications: ' + specs,
      '',
      'Thank you,',
      name === '—' ? '' : name
    ].join('\n');

    return { subject: subject, body: body };
  }

  function refreshPreview() {
    var request = buildRequest();
    preview.textContent = request.subject + '\n\n' + request.body;
    mailLink.href = 'mailto:LeoneighDigital@gmail.com?subject=' +
      encodeURIComponent(request.subject) + '&body=' +
      encodeURIComponent(request.body);
  }

  if (form) {
    form.querySelectorAll('input, select, textarea').forEach(function (field) {
      field.addEventListener('input', refreshPreview);
      field.addEventListener('change', refreshPreview);
    });

    mailLink.addEventListener('click', function (e) {
      var name = form.querySelector('#f-name').value.trim();
      var type = form.querySelector('#f-type').value;
      var specs = form.querySelector('#f-specs').value.trim();
      if (!name || !type || !specs) {
        e.preventDefault();
        msg.className = 'form-msg error';
        msg.textContent = 'Complete all fields before opening your email draft.';
        form.querySelector(!name ? '#f-name' : !type ? '#f-type' : '#f-specs').focus();
        return;
      }
      refreshPreview();
      msg.textContent = '';
    });

    refreshPreview();
  }
}
