# GitHub Pages 发布说明

This project is a static site. The page content stays in `index.html`; the old `main.html` file only redirects to `index.html`.

## What changed for Pages

- External CDN dependencies were removed from runtime.
- Chart.js and Font Awesome are now copied into `vendor/`.
- `npm run build` creates a publishable `dist/` folder.

## Publish flow

1. Push the repository to GitHub.
2. Enable GitHub Pages with the GitHub Actions source.
3. Let `.github/workflows/pages.yml` build and deploy `dist/`.

## Local build

```bash
npm install
npm run build
```

The build keeps the site content intact and only changes delivery and packaging.
