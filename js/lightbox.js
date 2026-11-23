/* ============================================================
   LIGHTBOX MODAL
   ============================================================ */
(function() {
  var backdrop = document.getElementById('visual-lightbox');
  var imgEl = document.getElementById('lightbox-img');
  var titleEl = document.getElementById('lightbox-title');
  var indexEl = document.getElementById('lightbox-index');
  var btnPrev = document.getElementById('lightbox-prev');
  var btnNext = document.getElementById('lightbox-next');
  var btnClose = document.getElementById('lightbox-close');

  if (!backdrop) return;

  var currentIndex = 0;
  var currentCards = [];

  // Event delegation: works for both Hub page and Visuals page
  document.addEventListener('click', function(e) {
    var card = e.target.closest('.archive-card');
    if (!card) return;

    // Find all visible cards currently in the DOM to allow navigating
    currentCards = Array.prototype.slice.call(document.querySelectorAll('.archive-card'));
    currentIndex = currentCards.indexOf(card);
    
    openLightbox(card);
  });

  function openLightbox(card) {
    var src = card.getAttribute('data-src');
    var title = card.getAttribute('data-title');
    
    imgEl.src = src;
    titleEl.textContent = title;
    updateIndexText();
    
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden'; // Prevent background scroll
  }

  function closeLightbox() {
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  function updateIndexText() {
    var total = currentCards.length;
    var frm = String(currentIndex + 1).padStart(2, '0');
    indexEl.textContent = 'FRM ' + frm + ' OF ' + String(total).padStart(2, '0');
    
    // Disable/enable buttons at ends
    btnPrev.style.opacity = currentIndex === 0 ? '0.3' : '1';
    btnNext.style.opacity = currentIndex === total - 1 ? '0.3' : '1';
  }

  function navigate(dir) {
    if (dir === 'prev' && currentIndex > 0) {
      currentIndex--;
    } else if (dir === 'next' && currentIndex < currentCards.length - 1) {
      currentIndex++;
    } else {
      return;
    }
    
    var nextCard = currentCards[currentIndex];
    imgEl.src = nextCard.getAttribute('data-src');
    titleEl.textContent = nextCard.getAttribute('data-title');
    updateIndexText();
  }

  // Button Listeners
  btnPrev.addEventListener('click', function() { navigate('prev'); });
  btnNext.addEventListener('click', function() { navigate('next'); });
  btnClose.addEventListener('click', closeLightbox);

  // Click outside to close
  backdrop.addEventListener('click', function(e) {
    if (e.target === backdrop) closeLightbox();
  });

  // Keyboard Navigation
  function handleKeydown(e) {
    if (!backdrop.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigate('prev');
    if (e.key === 'ArrowRight') navigate('next');
  }
  document.addEventListener('keydown', handleKeydown);

  // SPA Cleanup: Reset lightbox and remove listeners on route change
  if (typeof registerCleanup === 'function') {
    registerCleanup(function() {
      closeLightbox();
      document.removeEventListener('keydown', handleKeydown);
    });
  }
})();