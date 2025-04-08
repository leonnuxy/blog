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
  
  try {
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
  } catch (error) {
    console.error(`Error processing ${filePath}: ${error.message}`);
  }
}

// Function to recursively find all CSS files
function findCssFiles(dir) {
  if (!fs.existsSync(dir)) {
    console.warn(`Warning: Directory does not exist: ${dir}`);
    return;
  }
  
  try {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      
      try {
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
          findCssFiles(filePath);
        } else if (file.endsWith('.css')) {
          processCssFile(filePath);
        }
      } catch (error) {
        console.error(`Error accessing ${filePath}: ${error.message}`);
      }
    });
  } catch (error) {
    console.error(`Error reading directory ${dir}: ${error.message}`);
  }
}

// Start processing
console.log('Starting to fix CSS URLs...');

// Check if the styles directory exists
if (fs.existsSync(stylesDir)) {
  findCssFiles(stylesDir);
  console.log('Finished fixing CSS URLs!');
} else {
  console.error(`Error: Styles directory not found at ${stylesDir}`);
  console.log('Please check your project structure. The script expects CSS files to be in:');
  console.log(stylesDir);
  
  // Ask user if they want to provide a custom path
  console.log('\nIf your CSS files are in a different location, you can modify the script');
  console.log('Change the "stylesDir" variable to point to your actual CSS directory');
}
