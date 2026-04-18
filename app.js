const modeButtonClassActive = "flex-shrink-0 lg:flex-none px-4 py-1.5 rounded-full text-sm font-semibold transition-all bg-slate-900 text-white shadow-lg shadow-slate-900/15";
const modeButtonClassInactive = "flex-shrink-0 lg:flex-none px-4 py-1.5 rounded-full text-sm font-medium transition-all text-slate-500 hover:bg-white hover:text-slate-900";

function switchMode(mode) {
  const modes = ['itinerary', 'food', 'shopping'];

  modes.forEach((current) => {
    const isActive = current === mode;
    const btn = document.getElementById(`btn-mode-${current}`);
    const view = document.getElementById(`view-${current}`);
    const navLinks = document.getElementById(`nav-${current}-links`);

    if (btn) {
      btn.className = isActive ? modeButtonClassActive : modeButtonClassInactive;
      btn.setAttribute('aria-pressed', String(isActive));
    }

    if (view) {
      view.classList.toggle('active', isActive);
    }

    if (navLinks) {
      navLinks.classList.toggle('hidden', !isActive);
    }
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.switchMode = switchMode;

document.querySelectorAll('button[data-mode]').forEach((button) => {
  button.addEventListener('click', () => switchMode(button.dataset.mode));
});

document.querySelectorAll('nav a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (!href || !href.startsWith('#')) {
      return;
    }

    e.preventDefault();
    const targetElement = document.getElementById(href.slice(1));
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
