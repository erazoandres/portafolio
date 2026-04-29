const fs = require('fs');
const path = require('path');

function readFileSafe(p) {
  try { return fs.readFileSync(p, 'utf8'); } catch (e) { return null; }
}

function checkMeta(html) {
  const res = {};
  res.title = /<title>.*<\/title>/i.test(html);
  res.description = /<meta\s+name=["']description["']\s+content=["'][^"']+["']\s*\/>/i.test(html);
  res.canonical = /<link\s+rel=["']canonical["']\s+href=/i.test(html);
  res.og = /property=["']og:/i.test(html);
  return res;
}

function findImages(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter(f => /\.(png|jpg|jpeg|webp|svg)$/i.test(f)).map(f => path.join(dir,f));
}

function hasWebpVariant(imgPath, publicDir) {
  const name = path.basename(imgPath, path.extname(imgPath));
  const webp = path.join(publicDir, name + '.webp');
  return fs.existsSync(webp);
}

function checkDeps(pkg) {
  const deps = Object.assign({}, pkg.dependencies || {}, pkg.devDependencies || {});
  return { sharp: !!deps.sharp };
}

function run() {
  const repoRoot = path.resolve(__dirname, '..', '..');
  const indexHtml = readFileSafe(path.join(repoRoot, 'index.html')) || '';
  const srcIndex = readFileSafe(path.join(repoRoot, 'src', 'index.html')) || '';
  const html = indexHtml || srcIndex;

  const report = { meta: {}, images: [], deps: {}, notes: [] };
  report.meta = checkMeta(html);

  const publicAssets = path.join(repoRoot, 'public', 'assets');
  const srcAssets = path.join(repoRoot, 'src', 'assets');

  const images = findImages(publicAssets).concat(findImages(srcAssets));
  report.images = images.map(i => ({ path: i, hasWebp: hasWebpVariant(i, publicAssets) }));

  const pkgPath = path.join(repoRoot, 'package.json');
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  report.deps = checkDeps(pkg);
  if (report.deps.sharp) report.notes.push('Dependency "sharp" detected — native module; ensure CI has build tools.');

  // Detect large embedded SVG in public
  const embedded = readFileSafe(path.join(publicAssets, 'tutorai-embedded.svg'));
  if (embedded) {
    const kb = Buffer.byteLength(embedded, 'utf8')/1024;
    report.notes.push(`public/assets/tutorai-embedded.svg size: ${kb.toFixed(1)} KB`);
    if (kb > 50) report.notes.push('Embedded SVG is large — consider serving optimized raster or SVG external file.');
  }

  // write report
  const outDir = path.join(repoRoot, 'tools', 'seo-checker');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'report.json'), JSON.stringify(report, null, 2));
  console.log('SEO Checker report written to tools/seo-checker/report.json');
  console.log(JSON.stringify(report, null, 2));
}

if (require.main === module) run();

module.exports = { run };
