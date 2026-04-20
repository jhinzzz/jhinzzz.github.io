import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const root = process.cwd();

const vendorSources = [
  ['node_modules/@fortawesome/fontawesome-free/css/all.min.css', 'dist/vendor/fontawesome/css/all.min.css'],
  ['node_modules/@fortawesome/fontawesome-free/webfonts', 'dist/vendor/fontawesome/webfonts'],
  ['node_modules/@fortawesome/fontawesome-free/LICENSE.txt', 'dist/vendor/fontawesome/LICENSE.txt'],
];

const siteFiles = ['index.html', 'main.html', 'app.js', 'styles.css', 'theme.css', 'favicon.svg'];
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

const distDir = resolve(root, 'dist');
rmSync(distDir, { recursive: true, force: true });
mkdirSync(distDir, { recursive: true });

for (const [sourceRelative, destinationRelative] of vendorSources) {
  copyEntry(sourceRelative, destinationRelative);
}

for (const file of siteFiles) {
  copyEntry(file, `dist/${file}`);
}

const distIndexPath = resolve(root, 'dist/index.html');
let distIndexHtml = readFileSync(distIndexPath, 'utf8');

const versionedAssets = [
  'styles.css',
  'theme.css',
  'app.js',
  'favicon.svg',
  'vendor/fontawesome/css/all.min.css',
];

for (const asset of versionedAssets) {
  distIndexHtml = distIndexHtml.replaceAll(asset, `${asset}?v=${cacheBuster}`);
}

writeFileSync(distIndexPath, distIndexHtml);
