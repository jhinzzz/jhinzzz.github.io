# Tokyo Guide Layout Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rework the existing Tokyo travel guide into a mixed editorial layout that reads well on iPhone and desktop while preserving every piece of content.

**Architecture:** Keep the current three-mode experience, but change the page shell into a calmer reading surface with a full-bleed hero, stronger section hierarchy, and more consistent spacing. Preserve the existing content blocks and interaction model, but make the itinerary view feel like a long-form guide and the food/shopping views feel like secondary chapters rather than separate apps.

**Tech Stack:** Static HTML, Tailwind CSS output in `styles.css`, lightweight DOM scripting in `app.js`, Chart.js for the budget chart.

---

### Task 1: Build the editorial shell and hero

**Files:**
- Modify: `index.html`
- Modify: `styles.css`
- Modify: `app.js`

- [ ] **Step 1: Restructure the top of the page into a hero-led reading surface**

Use the existing itinerary hero content, but give it a full-width editorial treatment with a stronger visual anchor, narrower text column, and a more deliberate hierarchy:

```html
<header class="hero-surface">
  <div class="hero-surface__inner">
    <p class="eyebrow">TOKYO GUIDE / 6 DAYS 5 NIGHTS</p>
    <h1>東京六天五晚松弛感行程</h1>
    <p class="hero-surface__lede">4月29日 - 5月4日 · 深度浪漫体验版</p>
  </div>
</header>
```

- [ ] **Step 2: Add page-level layout classes**

Define shell classes in `styles.css` for the body background, sticky nav, hero, and the main reading column. The main content should feel like one continuous article, not a stack of unrelated cards.

- [ ] **Step 3: Keep navigation behavior unchanged**

Leave the three-mode switching and anchor scrolling in `app.js` intact, but make sure the active mode styling still updates after the layout rewrite.

- [ ] **Step 4: Verify the hero at mobile and desktop widths**

Run:

```bash
npm run build:css
```

Expected: `styles.css` updates successfully and the hero still renders with the correct hierarchy.

### Task 2: Recompose the itinerary, budget, food, and shopping sections

**Files:**
- Modify: `index.html`
- Modify: `styles.css`
- Modify: `app.js`

- [ ] **Step 1: Turn the itinerary into a reading flow**

Keep all itinerary content, but organize it so each section has one job:
- Preparation becomes a two-column comparison at desktop and a stacked list on mobile.
- Daily route becomes a vertical timeline with consistent day rails and clearer spacing between time blocks.
- Budget becomes a summary area with the chart and table balanced side by side.

- [ ] **Step 2: Make food and shopping feel like secondary chapters**

Preserve every restaurant and shopping recommendation, but reduce the visual noise:
- Use softer surfaces and more whitespace.
- Give each subsection a short title band and a dense content body.
- Keep the mode navigation, but make it feel like chapter switching rather than app switching.

- [ ] **Step 3: Keep the Gemini app link as the floating action**

Leave the bottom-right Gemini link in place, but ensure it visually competes less with the reading experience than the old AI widget.

- [ ] **Step 4: Verify content completeness**

Check that all original itinerary, food, shopping, budget, and emergency content still exists in the rewritten HTML.

### Task 3: Tune responsive spacing and finish with browser verification

**Files:**
- Modify: `index.html`
- Modify: `styles.css`
- Modify: `app.js`

- [ ] **Step 1: Tighten mobile spacing**

Make sure iPhone widths keep:
- readable hero line lengths
- comfortable section padding
- non-overlapping mode nav and floating Gemini link

- [ ] **Step 2: Expand desktop rhythm**

Add wider gutters, stronger max-width behavior, and more horizontal breathing room so the guide reads like a polished editorial page on larger screens.

- [ ] **Step 3: Run browser checks**

Run:

```bash
npm run build:css
```

Then open the site locally and verify:
- desktop layout is balanced
- iPhone layout is single-column and readable
- console shows no errors or warnings

- [ ] **Step 4: Final pass**

Confirm the page still opens from `index.html`, the old `main.html` redirect still works, and no content was removed during the redesign.
