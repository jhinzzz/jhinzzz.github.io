# Tokyo Restaurant Rebalance Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rework the Tokyo itinerary so the user’s desired restaurants are distributed by day, type, and area, while exposing a richer on-page summary for easier planning.

**Architecture:** Keep the site static and data-driven through `index.html`. Update the day cards so the primary meal recommendations match the route, then add a dedicated itinerary restaurant summary section that shows each restaurant’s cuisine, location, route fit, and fallback options. Regenerate `styles.css` from the Tailwind input after editing HTML so all new utilities are compiled.

**Tech Stack:** HTML, Tailwind CSS, static JavaScript, npm scripts

---

### Task 1: Reassign the day-by-day restaurant calls in `index.html`

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Update the Day 1 meal block**

Use Kanda Matsuya as the arrival-day lunch and Taiko Chaya as the night seafood-izakaya dinner.

```html
<p><b>🍱 午：</b><b>Kanda Matsuya</b>（神田老铺荞麦，落地后接秋叶原最顺路）</p>
<p><b>🥩 晚：</b><b>Taiko Chaya</b>（海鲜居酒屋，离浅草桥/马喰町很近）</p>
```

- [ ] **Step 2: Update the Day 3 evening block**

Keep the Harajuku/Shibuya shopping route and swap the dinner anchor to Jojoen Ebisu, with Jomon Roppongi as the lighter alternative.

```html
<p><b>🥩 晚：</b><b>叙々苑 恵比寿ガーデンプレイス店</b>（夜景烧肉主线）/ 备选：<b>Jomon Roppongi</b>（串烧，想加六本木夜生活时再换）</p>
```

- [ ] **Step 3: Update the Day 5 Asakusa/Ginza block**

Use Sushi Edomaru for Asakusa lunch and Sato Yosuke Ginza for the Ginza dinner slot, then list the premium sushi shops as same-area upgrades.

```html
<p><b>🍣 午：</b><b>SUSHI EDOMARU Asakusa</b>（浅草老城顺路的轻松寿司）</p>
<p><b>🍜 晚：</b><b>Sato Yosuke Ginza Inaniwa Udon</b>（银座收尾的稻庭乌冬）/ 升级备选：<b>Ginza Kyūbey Honten</b>、<b>Tsukiji Sushikuro Ginza</b>、<b>蓑寿司</b></p>
```

- [ ] **Step 4: Update the Day 4 fallback note**

Add a short note that `新宿 米新` is only used if the weather plan pivots into a Shinjuku route.

```html
<p>若当天改成新宿逛街版，可把晚餐换成 <b>新宿 米新</b>，但只作为备选，不放主线。</p>
```

### Task 2: Add a richer restaurant allocation section to `index.html`

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Insert a new itinerary section after `#daily` and before `#budget`**

Create a section named `#food-plan` that summarizes the full restaurant distribution by day, cuisine, area, and route fit.

```html
<section id="food-plan" class="py-12 bg-slate-50 border-y border-slate-200">
  <div class="max-w-7xl mx-auto px-4">
    <h2 class="section-header text-2xl font-bold text-slate-900">本次餐厅分配图</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <!-- cards for Day 1, Day 3, Day 5, and backup pool -->
    </div>
  </div>
</section>
```

- [ ] **Step 2: Populate the section with route-aware cards**

Include one card for each main routing cluster:

```html
<div class="info-card p-5">
  <div class="flex items-start justify-between gap-3 mb-3">
    <div>
      <p class="text-xs font-bold text-blue-600">4/29 午餐</p>
      <h3 class="font-black text-slate-900">Kanda Matsuya</h3>
      <p class="text-sm text-slate-600">神田 / Akihabara 轴线 · 荞麦</p>
    </div>
    <span class="px-2 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold">主线</span>
  </div>
  <p class="text-sm text-slate-600">落地后接秋叶原最顺路，先吃一碗热荞麦再开始逛街。</p>
</div>
```

Do the same for Taiko Chaya, Jojoen Ebisu, Sushi Edomaru Asakusa, and Sato Yosuke Ginza. Put Jomon Roppongi, Ginza Kyūbey Honten, Tsukiji Sushikuro Ginza, 蓑寿司, and 新宿 米新 into the backup cards with explicit “替换位” labels.

- [ ] **Step 3: Add cuisine tags**

Add small pill tags so the user can visually see type variety at a glance:

```html
<div class="flex flex-wrap gap-2 text-[11px]">
  <span class="px-2 py-1 rounded-full bg-slate-100 text-slate-700">荞麦</span>
  <span class="px-2 py-1 rounded-full bg-slate-100 text-slate-700">海鲜居酒屋</span>
  <span class="px-2 py-1 rounded-full bg-slate-100 text-slate-700">烧肉夜景</span>
  <span class="px-2 py-1 rounded-full bg-slate-100 text-slate-700">寿司</span>
  <span class="px-2 py-1 rounded-full bg-slate-100 text-slate-700">乌冬</span>
</div>
```

### Task 3: Rebuild and verify the static assets

**Files:**
- Modify: `styles.css`

- [ ] **Step 1: Rebuild Tailwind output**

Run:

```bash
npm run build
```

Expected: `styles.css` is regenerated without errors.

- [ ] **Step 2: Verify the page loads**

Open `index.html` in the browser and confirm:

* The itinerary still switches modes.
* The new `本次餐厅分配图` section renders correctly.
* The Day 1, Day 3, and Day 5 meal text reads naturally.
* No broken HTML tags or clipped cards appear on mobile width.

- [ ] **Step 3: Sanity-check the restaurant split**

Confirm the main route keeps cuisine variety:

* Day 1: soba + seafood izakaya
* Day 3: yakiniku
* Day 5: sushi + udon
* Day 4 fallback: Shinjuku sukiyaki only if the route pivots

