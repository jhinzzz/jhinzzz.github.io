const modeButtonClassActive = "flex-shrink-0 lg:flex-none px-4 py-1.5 rounded-full text-sm font-semibold transition-all bg-slate-900 text-white shadow-lg shadow-slate-900/15";
const modeButtonClassInactive = "flex-shrink-0 lg:flex-none px-4 py-1.5 rounded-full text-sm font-medium transition-all text-slate-500 hover:bg-white hover:text-slate-900";
const modeAnchors = {
  itinerary: "#packing",
  food: "#food-michelin",
  shopping: "#shop-electronics",
};

function switchMode(mode) {
  const modes = ['itinerary', 'food', 'shopping'];

  modes.forEach((current) => {
    const isActive = current === mode;
    const btn = document.getElementById(`btn-mode-${current}`);

    if (btn) {
      btn.className = isActive ? modeButtonClassActive : modeButtonClassInactive;
      btn.setAttribute('aria-pressed', String(isActive));
    }
  });

  const targetSelector = modeAnchors[mode] || "#packing";
  const targetElement = document.querySelector(targetSelector);
  if (targetElement) {
    const top = window.scrollY + targetElement.getBoundingClientRect().top - 92;
    window.history.replaceState(null, "", targetSelector);
    window.scrollTo({ top, behavior: 'smooth' });
  }
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
      window.history.replaceState(null, "", href);
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
