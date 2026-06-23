const fs = require('fs');
const htmlPath = 'index.html';
const cssPath = 'style.css';
const outputPath = 'index-final.html';
const html = fs.readFileSync(htmlPath, 'utf8');
const css = fs.readFileSync(cssPath, 'utf8');
if (!html.includes('<link rel="stylesheet" href="style.css">')) {
  throw new Error('Expected stylesheet link not found in index.html');
}
let out = html.replace('<link rel="stylesheet" href="style.css">', `<style>\n${css}\n</style>`);
const oldScroll = `        // ==================== \n        // Smooth Scrolling for Navigation\n        // ==================== \n\n        document.querySelectorAll('a[href^="#"]').forEach(anchor => {\n            anchor.addEventListener('click', function(e) {\n                const href = this.getAttribute('href');\n                if (href !== '#' && document.querySelector(href)) {\n                    e.preventDefault();\n                }\n            });\n        });\n\n        // ==================== \n        // Intersection Observer for Fade-in Animations`;
const newScroll = `        // ==================== \n        // Smooth Scrolling for Navigation\n        // ==================== \n\n        document.querySelectorAll('a[href^="#"]').forEach(anchor => {\n            anchor.addEventListener('click', function(e) {\n                const href = this.getAttribute('href');\n                const target = href !== '#' ? document.querySelector(href) : null;\n                if (target) {\n                    e.preventDefault();\n                    target.scrollIntoView({ behavior: 'smooth' });\n                    history.replaceState(null, '', href);\n                }\n            });\n        });\n\n        // ==================== \n        // Intersection Observer for Fade-in Animations`;
out = out.replace(oldScroll, newScroll);
if (out === html) {
  console.log('Warning: HTML unchanged after replacement.');
}
fs.writeFileSync(outputPath, out, 'utf8');
console.log('Wrote', outputPath, 'with inline CSS and fixed nav scrolling.');
