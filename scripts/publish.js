import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { createRequire } from 'module';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Package.json path
const packageJsonPath = path.join(__dirname, '../package.json');

// Create require function for JSON imports
const require = createRequire(import.meta.url);

// Function to update version in package.json using format A.B.C.D
// A: year, B: month, C: day, D: version of the day (starting from 0)
function updateVersion() {
  console.log('Updating version...');

  const packageJson = require(packageJsonPath);
  const now = new Date();

  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();

  // Check if there's an existing version for today to increment the last digit
  const versionRegex = new RegExp(`^${year}\\.${month}\\.${day}\\.(\\d+)$`);
  let versionOfDay = 0;

  if (packageJson.version && versionRegex.test(packageJson.version)) {
    const match = packageJson.version.match(versionRegex);
    versionOfDay = parseInt(match[1]) + 1;
  }

  const newVersion = `${year}.${month}.${day}.${versionOfDay}`;
  packageJson.version = newVersion;

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  console.log(`Version updated to: ${newVersion}`);

  return newVersion;
}

// Main function
async function runPublish() {
  try {
    console.log('Starting version update process...');

    // Step 1: Check for uncommitted changes
    console.log('Checking for uncommitted changes...');
    
    const gitStatusPorcelain = execSync('git status --porcelain').toString().trim();
    if (gitStatusPorcelain) {
      console.error('Error: There are uncommitted changes. Commit or stash them before continuing.');
      process.exit(1);
    }

    // Check for unpushed commits
    const gitStatus = execSync('git status').toString();
    if (gitStatus.includes('Your branch is ahead of')) {
      console.error('Error: There are unpushed commits. Push them before continuing.');
      process.exit(1);
    }

    console.log('No pending changes found.');

    // Step 2: Update version
    const newVersion = updateVersion();

    // Step 3: Commit package.json update
    console.log('Creating commit with new version...');
    execSync(`git add ${packageJsonPath}`);
    execSync(`git commit -m "Update version to ${newVersion}"`);
    
    // Step 4: Create a git tag
    console.log('Creating git tag...');
    execSync(`git tag v${newVersion}`);
    console.log(`Tag v${newVersion} created successfully.`);
    
    return newVersion;
  } catch (error) {
    console.error('Error during process:');
    console.error(error);
    process.exit(1);
  }
}

// Run the process
runPublish();