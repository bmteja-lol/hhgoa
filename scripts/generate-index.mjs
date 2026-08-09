import { readdirSync, readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

const publicDir = '.output/public';
const assetsDir = join(publicDir, 'assets');

if (!existsSync(assetsDir)) {
  console.log('Assets directory not found at .output/public — skipping (likely Vercel build).');
  process.exit(0);
}

const files = readdirSync(assetsDir);
const jsFile = files.find(f => f.endsWith('.js') && f.startsWith('index-'));
const cssFile = files.find(f => f.endsWith('.css'));

if (!jsFile) {
  console.error('Could not find index JS bundle.');
  process.exit(1);
}

// Patch: TanStack Start client entry resets basepath to "".
const jsPath = join(assetsDir, jsFile);
let js = readFileSync(jsPath, 'utf-8');

const original = js;
js = js.replace(
  'basepath:``,serializationAdapters',
  'basepath:`/hhgoa`,serializationAdapters'
);

if (js !== original) {
  writeFileSync(jsPath, js);
  console.log(`Patched basepath in ${jsFile}`);
} else {
  console.warn('WARNING: basepath patch pattern not found in bundle!');
}

// Generate index.html
const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Hacker House Goa '26 — House Pass Generator</title>
    <meta name="description" content="Make your collectible Hacker House Goa '26 house pass: screen-print tropical graphics, your photo, name and role." />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@400;700;800;900&family=Instrument+Serif:ital@0;1&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
    ${cssFile ? `<link rel="stylesheet" href="/hhgoa/assets/${cssFile}" />` : ''}
    <script>
      window.$_TSR = { buffer: [], initialized: false, router: { manifest: {} }, h: function() {}, t: new Map() };
    </script>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/hhgoa/assets/${jsFile}"></script>
  </body>
</html>
`;

writeFileSync(join(publicDir, 'index.html'), html);
console.log(`Generated index.html with assets: ${jsFile}${cssFile ? `, ${cssFile}` : ''}`);
