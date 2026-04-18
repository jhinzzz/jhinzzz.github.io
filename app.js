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

const budgetChart = document.getElementById('budgetChart');
if (budgetChart && window.Chart) {
  const ctx = budgetChart.getContext('2d');
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['住宿', '交通', '餐饮', '游玩', '购物', '备用'],
      datasets: [
        {
          data: [4750, 2259, 13750, 2620, 44000, 6000],
          backgroundColor: ['#64748B', '#94A3B8', '#F59E0B', '#10B981', '#3B82F6', '#475569'],
          borderWidth: 2,
          borderColor: '#1E293B',
          hoverOffset: 6,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
          labels: {
            boxWidth: 10,
            usePointStyle: true,
            color: '#94A3B8',
            font: { size: 11 },
          },
        },
      },
      cutout: '70%',
      animation: {
        animateScale: true,
      },
    },
  });
}
