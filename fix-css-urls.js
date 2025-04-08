const fs = require('fs');
const path = require('path');

// Directory to search for CSS files
const stylesDir = path.join(__dirname, 'public', 'styles');

// Function to convert absolute URLs to relative URLs
function convertUrls(cssContent, depth) {
  // The number of ../ needed depends on the depth of the CSS file
  const prefix = '../'.repeat(depth);
  
  // Replace url(/path) with url(../path) or url(../../path) based on depth
  return cssContent.replace(/url\(\s*['"]*\/([^'")]+)['"]*\s*\)/g, function(match, p1) {
    return `url(${prefix}${p1})`;
  });
}

// Function to process a CSS file
function processCssFile(filePath) {
  console.log(`Processing ${filePath}`);
  
  // Read the file
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Calculate the depth relative to public directory
  const relativePath = path.relative(stylesDir, filePath);
  const depth = relativePath.split(path.sep).length;
  
  // Convert URLs
  const updatedContent = convertUrls(content, depth);
  
  // Write the file back if changes were made
  if (content !== updatedContent) {
    fs.writeFileSync(filePath, updatedContent);
    console.log(`Updated ${filePath}`);
  } else {
    console.log(`No changes needed for ${filePath}`);
  }
}

// Function to recursively find all CSS files
function findCssFiles(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      findCssFiles(filePath);
    } else if (file.endsWith('.css')) {
      processCssFile(filePath);
    }
  });
}

// Start processing
console.log('Starting to fix CSS URLs...');
findCssFiles(stylesDir);
console.log('Finished fixing CSS URLs!');
