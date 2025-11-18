const fs = require('fs');
const path = require('path');
const readline = require('readline');

const SUBMITTED_URLS_FILE = path.join(__dirname, 'submitted-urls.json');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function main() {
  console.log('\n⚠️  WARNING: This will reset your submission progress!\n');
  console.log('This means:');
  console.log('- All previously submitted URLs will be marked as "not submitted"');
  console.log('- Next run will start from the beginning of the sitemap');
  console.log('- Useful if you want to re-submit URLs to Google\n');

  if (!fs.existsSync(SUBMITTED_URLS_FILE)) {
    console.log('✓ No progress file found. Nothing to reset.');
    rl.close();
    return;
  }

  const data = JSON.parse(fs.readFileSync(SUBMITTED_URLS_FILE, 'utf8'));
  const urlCount = Object.keys(data.urls).length;

  console.log(`Current progress: ${urlCount} URLs previously submitted`);
  console.log(`Last run: ${data.lastRun || 'Never'}\n`);

  const answer = await question('Are you sure you want to reset? (yes/no): ');

  if (answer.toLowerCase() === 'yes') {
    // Create backup
    const backup = path.join(__dirname, `submitted-urls.backup.${Date.now()}.json`);
    fs.copyFileSync(SUBMITTED_URLS_FILE, backup);
    console.log(`\n✓ Backup created: ${path.basename(backup)}`);

    // Reset the file
    const resetData = {
      urls: {},
      lastRun: null
    };
    fs.writeFileSync(SUBMITTED_URLS_FILE, JSON.stringify(resetData, null, 2), 'utf8');

    console.log('✓ Progress reset successfully!');
    console.log('\nNext time you run submit-urls.js, it will start from the beginning.\n');
  } else {
    console.log('\nCancelled. No changes made.\n');
  }

  rl.close();
}

main().catch(error => {
  console.error(`Error: ${error.message}`);
  rl.close();
  process.exit(1);
});
