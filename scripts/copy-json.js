const fs = require('fs');
const path = require('path');

// Source and destination paths
const dataDir = path.join(__dirname, '../data');
const destDir = path.join(__dirname, '../dist');

// Function to create destination directory if it doesn't exist
function ensureDirExists(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Function to copy a file
function copyFile(src, dest) {
  try {
    const data = fs.readFileSync(src);
    ensureDirExists(path.dirname(dest));
    fs.writeFileSync(dest, data);
    console.log(`✅ Copied: ${path.basename(src)} to ${dest}`);
  } catch (err) {
    console.error(`❌ Error copying ${src}:`, err);
  }
}

// Copy posts.json from data directory to dist
const postsJsonSrc = path.join(dataDir, 'posts.json');
const postsJsonDest = path.join(destDir, 'posts.json');
copyFile(postsJsonSrc, postsJsonDest);

console.log('📄 JSON files copying complete');