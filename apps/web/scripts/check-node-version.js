#!/usr/bin/env node

const requiredVersion = '20.11.0';
const currentVersion = process.version;
const currentMajor = parseInt(currentVersion.split('v')[1].split('.')[0]);
const requiredMajor = parseInt(requiredVersion.split('.')[0]);

if (currentMajor < requiredMajor) {
  console.error('\x1b[31m❌ Node.js version error\x1b[0m');
  console.error(`Current: ${currentVersion}`);
  console.error(`Required: >=${requiredVersion}`);
  console.error('\x1b[33m💡 Please run: nvm use\x1b[0m');
  console.error('\x1b[33m   Or install Node.js 20+ from: https://nodejs.org\x1b[0m');
  console.error('\x1b[36m📖 Read more: https://github.com/nvm-sh/nvm\x1b[0m');
  process.exit(1);
}

console.log('\x1b[32m✅ Node.js version OK\x1b[0m');
console.log(`Current: ${currentVersion}`); 