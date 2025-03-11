const fs = require('fs');
const path = require('path');

// Load the combined sources file
const sourcesPath = path.join(__dirname, '/utils/sources/combined_sources.js');
const sourceContent = fs.readFileSync(sourcesPath, 'utf8');

// Extract the data object
const sourceString = sourceContent.replace('export const sources =', '');
const sourcesData = eval(`(${sourceString})`);

// Create countries directory if it doesn't exist
const countriesDir = path.join(__dirname, '/utils/sources/countries');
if (!fs.existsSync(countriesDir)) {
  fs.mkdirSync(countriesDir, { recursive: true });
}

// Export each country to its own file
Object.keys(sourcesData.countries).forEach(country => {
  const countryData = sourcesData.countries[country];
  const countryFilePath = path.join(countriesDir, `${country}.js`);
  
  const fileContent = `// Auto-generated from combined_sources.js
export default ${JSON.stringify(countryData, null, 2)}`;
  
  fs.writeFileSync(countryFilePath, fileContent);
  console.log(`Created ${countryFilePath}`);
});

console.log('Successfully split sources by country');