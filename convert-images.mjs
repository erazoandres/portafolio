import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const dir = './public/assets';
const files = fs.readdirSync(dir);

console.log('Installing sharp...');
execSync('npm i sharp', { stdio: 'inherit' });

import('sharp').then(({ default: sharp }) => {
  console.log('Converting images to WebP...');
  const promises = files.map(async (file) => {
    if (file.match(/\.(png|jpg|jpeg)$/i)) {
      const inputPath = path.join(dir, file);
      const ext = path.extname(file);
      const outputPath = path.join(dir, file.replace(ext, '.webp'));
      
      console.log(`Converting ${file}...`);
      await sharp(inputPath)
        .webp({ quality: 80 })
        .toFile(outputPath);
      
      console.log(`Converted ${file} to ${path.basename(outputPath)}`);
    }
  });

  Promise.all(promises).then(() => {
    console.log('All images converted!');
  }).catch(err => {
    console.error('Error converting images:', err);
  });
}).catch(err => {
  console.error('Error importing sharp:', err);
});
