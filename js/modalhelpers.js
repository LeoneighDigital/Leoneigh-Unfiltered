/* ============================================================
   MODAL HELPERS
   ============================================================ */
function openModal(id) {
  var el = document.getElementById(id);
  if (el) el.classList.add('open');
}

function closeModal(id) {
  var el = document.getElementById(id);
  if (el) el.classList.remove('open');
}

function openEmailDraft(subject, body) {
  var draftUrl = 'mailto:LeoneighDigital@gmail.com' +
    '?subject=' + encodeURIComponent(subject) +
    '&body=' + encodeURIComponent(body);
  window.location.href = draftUrl;
}

document.addEventListener('click', function (e) {
  var closeBtn = e.target.closest('[data-close-modal]');
  if (closeBtn) {
    var backdrop = closeBtn.closest('.modal-backdrop');
    if (backdrop) backdrop.classList.remove('open');
  }
  if (e.target.classList && e.target.classList.contains('modal-backdrop')) {
    e.target.classList.remove('open');
  }
});

/* Stems form handler */
document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('stems-form');
  var msg = document.getElementById('stems-msg');
  if (!form) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var email = form.querySelector('#stems-email').value.trim();
    if (!email) {
      msg.className = 'form-msg error';
      msg.textContent = 'Email or studio handle required.';
      return;
    }
    var note = form.querySelector('#stems-note').value.trim();
    openEmailDraft(
      '[LU DISPATCH] Stem Request',
      'Email / studio handle: ' + email + '\nProject context: ' + (note || 'Not provided')
    );
    msg.className = 'form-msg success';
    msg.textContent = 'Dispatching draft to your mail client...';
    setTimeout(function () { closeModal('modal-stems'); msg.textContent = ''; }, 1200);
  });
});