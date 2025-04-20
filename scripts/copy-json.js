// scripts/copy-json.js
const fs = require('fs-extra'); // Use fs-extra for easier directory handling
const path = require('path');

const dataDir = path.join(__dirname, '..', 'data');
const publicDataDir = path.join(__dirname, '..', 'public', 'data'); // Target public/data
const distDataDir = path.join(__dirname, '..', 'dist', 'data'); // Also copy to dist/data if backend needs it there

async function copyJsonFiles() {
    try {
        // Ensure target directories exist
        await fs.ensureDir(publicDataDir);
        await fs.ensureDir(distDataDir);

        // Ensure all references to 'data/posts.json' are correct
        const sourcePostsPath = path.join(dataDir, 'posts.json');
        const publicDestPath = path.join(publicDataDir, 'posts.json');
        const distDestPath = path.join(distDataDir, 'posts.json');

        // Copy posts.json to public/data/posts.json
         if (await fs.pathExists(sourcePostsPath)) {
             await fs.copy(sourcePostsPath, publicDestPath);
             console.log(`✅ Copied: posts.json to ${publicDestPath}`);
         } else {
             console.warn(`Source file not found: ${sourcePostsPath}`);
         }

        // Copy posts.json to dist/data/posts.json (if backend reads from dist)
          if (await fs.pathExists(sourcePostsPath)) {
             await fs.copy(sourcePostsPath, distDestPath);
             console.log(`✅ Copied: posts.json to ${distDestPath}`);
         }

        console.log('📄 JSON files copying complete');
    } catch (err) {
        console.error('❌ Error copying JSON files:', err);
        process.exit(1); 
    }
}

copyJsonFiles();