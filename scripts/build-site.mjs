import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const root = process.cwd();

const vendorSources = [
  ['node_modules/chart.js/dist/chart.umd.min.js', 'vendor/chartjs/chart.umd.min.js'],
  ['node_modules/chart.js/LICENSE.md', 'vendor/chartjs/LICENSE.md'],
  ['node_modules/@fortawesome/fontawesome-free/css/all.min.css', 'vendor/fontawesome/css/all.min.css'],
  ['node_modules/@fortawesome/fontawesome-free/webfonts', 'vendor/fontawesome/webfonts'],
  ['node_modules/@fortawesome/fontawesome-free/LICENSE.txt', 'vendor/fontawesome/LICENSE.txt'],
];

const siteFiles = ['index.html', 'main.html', 'app.js', 'styles.css', 'favicon.svg'];
const cacheBuster = (process.env.GITHUB_SHA || Date.now().toString(36)).slice(0, 8);

function copyEntry(sourceRelative, destinationRelative) {
  const source = resolve(root, sourceRelative);
  const destination = resolve(root, destinationRelative);

  if (!existsSync(source)) {
    throw new Error(`Missing required build input: ${sourceRelative}`);
  }

  mkdirSync(dirname(destination), { recursive: true });
  cpSync(source, destination, { recursive: true });
}

for (const [sourceRelative, destinationRelative] of vendorSources) {
  copyEntry(sourceRelative, destinationRelative);
}

const distDir = resolve(root, 'dist');
rmSync(distDir, { recursive: true, force: true });
mkdirSync(distDir, { recursive: true });

for (const file of siteFiles) {
  copyEntry(file, `dist/${file}`);
}

copyEntry('vendor', 'dist/vendor');

const distIndexPath = resolve(root, 'dist/index.html');
let distIndexHtml = readFileSync(distIndexPath, 'utf8');

const versionedAssets = [
  'styles.css',
  'app.js',
  'favicon.svg',
  'vendor/fontawesome/css/all.min.css',
  'vendor/chartjs/chart.umd.min.js',
];

for (const asset of versionedAssets) {
  distIndexHtml = distIndexHtml.replaceAll(asset, `${asset}?v=${cacheBuster}`);
}

writeFileSync(distIndexPath, distIndexHtml);
