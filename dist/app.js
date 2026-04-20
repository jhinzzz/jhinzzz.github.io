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
    const view = document.getElementById(`view-${current}`);
    const navLinks = document.getElementById(`nav-${current}-links`);

    if (btn) {
      btn.className = isActive ? modeButtonClassActive : modeButtonClassInactive;
      btn.setAttribute('aria-pressed', String(isActive));
    }

    if (view) {
      if (isActive) {
        view.classList.add('active');
      } else {
        view.classList.remove('active');
      }
    }

    if (navLinks) {
      if (isActive) {
        navLinks.classList.remove('hidden');
      } else {
        navLinks.classList.add('hidden');
      }
    }
  });

  const targetSelector = modeAnchors[mode] || "#packing";
  requestAnimationFrame(() => {
    const targetElement = document.querySelector(targetSelector);
    if (targetElement) {
      const top = window.scrollY + targetElement.getBoundingClientRect().top - 92;
      window.history.replaceState(null, "", targetSelector);
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
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

function copyPlaceName(name, onCopied) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(name).then(onCopied).catch(() => {
      fallbackCopy(name);
      onCopied();
    });
  } else {
    fallbackCopy(name);
    onCopied();
  }
}

function fallbackCopy(text) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.cssText = 'position:fixed;left:-9999px';
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand('copy');
  } catch (_) {}
  document.body.removeChild(ta);
}

function buildMapUrl(name) {
  return 'https://www.google.com/maps/search/' + encodeURIComponent(name + ' Tokyo');
}

document.querySelectorAll('.spot-chip, .packing-chip').forEach((chip) => {
  const name = chip.textContent.trim();
  if (!name) return;

  chip.setAttribute('role', 'button');
  chip.setAttribute('tabindex', '0');
  chip.style.cursor = 'pointer';
  chip.title = name;

  const mapBtn = document.createElement('a');
  mapBtn.href = buildMapUrl(name);
  mapBtn.target = '_blank';
  mapBtn.rel = 'noopener noreferrer';
  mapBtn.className = 'spot-chip__map';
  mapBtn.innerHTML = '<i class="fa-solid fa-location-dot"></i>';
  mapBtn.title = 'Google Maps';
  mapBtn.addEventListener('click', (e) => e.stopPropagation());
  chip.appendChild(mapBtn);

  chip.addEventListener('click', () => {
    copyPlaceName(name, () => {
      chip.classList.add('spot-chip--copied');
      setTimeout(() => chip.classList.remove('spot-chip--copied'), 1200);
    });
  });

  chip.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      chip.click();
    }
  });
});

(function enhanceInlinePlaces() {
  const labelEndPattern = /[：:]\s*$/;
  const numberedPattern = /^\d+\.?$/;
  const pureTimePattern = /^\d{1,2}[:：]\d{2}[^A-Za-z\u4e00-\u9fff]*$/;
  const shortLabelKeywords = /^(早|午|晚|早餐|午餐|晚餐|清早|上午|下午|傍晚|夜|中午|关东煮插位|串烧替换|备选晚餐|晚餐主线|夜景升级|路线判断|晚餐备选|晚餐升级|晚餐替换|关东煮正餐|午餐主线|起退金额|包装限制|液体托运|海关限额|入境缓冲|航班|预计到达酒店|预订渠道|倒推时间线|备选|机场 → 市区|三越百货 95折|Japan Duty Free)/;
  const instructionVerbs = /^(购买|出发|搭乘|返回|乘|转去|漫步|打卡|进园|团方|先在|建议|落地|如果|带|免签)/;

  function shouldEnhance(text) {
    if (!text) return false;
    if (text.length < 2 || text.length > 50) return false;
    if (labelEndPattern.test(text)) return false;
    if (numberedPattern.test(text)) return false;
    if (pureTimePattern.test(text)) return false;
    if (shortLabelKeywords.test(text)) return false;
    if (instructionVerbs.test(text)) return false;
    if (/^\d/.test(text) && /\d.*(出发|搭乘|集合|出关|到达|前)/.test(text)) return false;
    return true;
  }

  const scopes = document.querySelectorAll('#view-itinerary, #view-food, #view-shopping');
  scopes.forEach((scope) => {
    scope.querySelectorAll('b').forEach((bEl) => {
      if (bEl.dataset.placeEnhanced === '1') return;
      if (bEl.querySelector('i')) return;
      if (bEl.closest('.spot-chip, .packing-chip, .spot-inline')) return;

      const text = bEl.textContent.trim();
      if (!shouldEnhance(text)) return;

      bEl.dataset.placeEnhanced = '1';
      bEl.classList.add('spot-inline');
      bEl.setAttribute('role', 'button');
      bEl.setAttribute('tabindex', '0');
      bEl.title = '点击复制名称 · 点击地图图标打开 Google Maps';

      const mapBtn = document.createElement('a');
      mapBtn.href = buildMapUrl(text);
      mapBtn.target = '_blank';
      mapBtn.rel = 'noopener noreferrer';
      mapBtn.className = 'spot-inline__map';
      mapBtn.innerHTML = '<i class="fa-solid fa-location-dot"></i>';
      mapBtn.title = 'Google Maps';
      mapBtn.addEventListener('click', (e) => e.stopPropagation());
      bEl.appendChild(mapBtn);

      bEl.addEventListener('click', (e) => {
        if (e.target.closest('.spot-inline__map')) return;
        copyPlaceName(text, () => {
          bEl.classList.add('spot-inline--copied');
          setTimeout(() => bEl.classList.remove('spot-inline--copied'), 1200);
        });
      });

      bEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          bEl.click();
        }
      });
    });
  });
})();
