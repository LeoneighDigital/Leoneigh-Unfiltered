
/* ============================================================
   MODAL HELPERS
   ============================================================ */
function openModal(id) {
  var el = document.getElementById(id);
  if (el) el.classList.add('open');
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
    msg.className = 'form-msg success';
    msg.textContent = 'Stem dispatch request received. Check your inbox.';
    form.reset();
  });
});