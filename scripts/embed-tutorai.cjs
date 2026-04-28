const fs = require('fs');
const path = require('path');
const repoRoot = path.resolve(__dirname, '..');
const inPath = path.join(repoRoot, 'src', 'assets', 'tutorai.png');
const outPath = path.join(repoRoot, 'public', 'assets', 'tutorai-embedded.svg');

const b = fs.readFileSync(inPath).toString('base64');
const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='600' viewBox='0 0 1200 600'><image href="data:image/png;base64,${b}" width='1200' height='600' preserveAspectRatio='xMidYMid slice'/></svg>`;
fs.writeFileSync(outPath, svg);
console.log('created', outPath);
