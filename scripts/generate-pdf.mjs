import { existsSync, createReadStream } from 'node:fs';
import { createRequire } from 'node:module';
import { createServer } from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const source = path.join(dist, 'cv', 'index.html');
const output = path.join(dist, 'cv.pdf');

if (!existsSync(source)) {
  console.error('dist/cv/index.html not found. Run `npm run build` first.');
  process.exit(1);
}

const candidates = [
  process.env.CHROME_PATH,
  '/usr/bin/google-chrome',
  '/usr/bin/google-chrome-stable',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
].filter(Boolean);

let executablePath = candidates.find((p) => existsSync(p));

let launch = null;
if (executablePath) {
  const puppeteer = require('puppeteer-core');
  launch = () =>
    puppeteer.launch({
      executablePath,
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
} else {
  try {
    const puppeteer = require('puppeteer');
    executablePath = puppeteer.executablePath();
    launch = () => puppeteer.launch({ headless: true });
  } catch {
    console.error('No Chrome/Chromium found. Install puppeteer-core or set CHROME_PATH.');
    process.exit(1);
  }
}

const MIME = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.pdf': 'application/pdf',
};

const server = createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  let file = path.join(dist, decodeURIComponent(url.pathname));
  if (file.endsWith('/')) file = path.join(file, 'index.html');
  if (!file.startsWith(dist)) {
    res.writeHead(403);
    res.end();
    return;
  }
  if (!existsSync(file) || !file.startsWith(dist)) {
    res.writeHead(404);
    res.end('Not Found');
    return;
  }
  res.writeHead(200, {
    'Content-Type': MIME[path.extname(file)] || 'application/octet-stream',
  });
  createReadStream(file).pipe(res);
});

await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const port = server.address().port;

const browser = await launch();
try {
  const page = await browser.newPage();
  await page.goto(`http://127.0.0.1:${port}/cv/`, { waitUntil: 'networkidle0' });
  await page.emulateMediaType('print');
  await page.pdf({
    path: output,
    printBackground: true,
    preferCSSPageSize: true,
  });
  console.log(`Generated ${output}`);
} finally {
  await browser.close();
  server.close();
}
