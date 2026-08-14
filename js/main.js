document.addEventListener('DOMContentLoaded', () => {
  // Dyslexia Toggle
  const dyslexiaToggleBtn = document.getElementById('dyslexia-toggle');
  const isDyslexiaMode = localStorage.getItem('dyslexiaMode') === 'true';
  
  if (isDyslexiaMode) {
    document.body.classList.add('dyslexia-mode');
    updateToggleButton(true);
  }

  dyslexiaToggleBtn.addEventListener('click', () => {
    const isCurrentlyActive = document.body.classList.toggle('dyslexia-mode');
    localStorage.setItem('dyslexiaMode', isCurrentlyActive);
    updateToggleButton(isCurrentlyActive);
  });

  function updateToggleButton(isActive) {
    if (isActive) {
      dyslexiaToggleBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
        Standard Mode
      `;
      dyslexiaToggleBtn.setAttribute('aria-pressed', 'true');
    } else {
      dyslexiaToggleBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/><path d="M12 4v1m5.66 1.34-0.7.7m3.04 4.96h-1m-1.34 5.66-.7-0.7m-4.96 3.04v-1m-5.66-1.34 0.7-0.7M4 12H3m1.34-5.66 0.7 0.7"/></svg>
        Dyslexia Mode
      `;
      dyslexiaToggleBtn.setAttribute('aria-pressed', 'false');
    }
  }

  // Scroll Animations (Fade-up)
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal').forEach(element => {
    observer.observe(element);
  });

  // Simple Form Submission
  const contactForm = document.getElementById('booking-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you for your interest! We will be in touch shortly.');
      contactForm.reset();
    });
  }
});
