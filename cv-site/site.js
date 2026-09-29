const printButton = document.querySelector('.print-link');
if (printButton) {
  printButton.hidden = false;
  printButton.addEventListener('click', () => window.print());
}

// Anchor navigation also works when JavaScript is unavailable.
if ('IntersectionObserver' in window) {
  const links = [...document.querySelectorAll('.section-nav a')];
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      for (const link of links) {
        if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      }
    }
  }, { rootMargin: '-5% 0px -65% 0px' });
  document.querySelectorAll('.resume-section').forEach(section => observer.observe(section));
}
