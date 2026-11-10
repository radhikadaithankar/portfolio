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

// A sticky sidebar taller than the window would hide its foot; let it scroll
// until the bottom shows, then stick there.
const sidebar = document.querySelector('.sidebar');
if (sidebar) {
  const fit = () => {
    const top = Math.min(24, window.innerHeight - sidebar.offsetHeight - 24);
    sidebar.style.setProperty('--sidebar-top', `${top}px`);
  };
  fit();
  window.addEventListener('resize', fit, { passive: true });
  if ('ResizeObserver' in window) new ResizeObserver(fit).observe(sidebar);
}
