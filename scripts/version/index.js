const fs = require('fs');
const path = require('path');
const packageJsonFilename = path.resolve('package.json');
const json = require(packageJsonFilename);
const devDependencies = json.devDependencies || {};
const peerDependencies = json.peerDependencies || {};
console.log(`${json.name}: Updating peer dependencies`);
for (const key in peerDependencies) {
  if (key in devDependencies) {
    console.log(`  - ${key}: ${peerDependencies[key] || 'none'} => ${devDependencies[key]}`);
    json.peerDependencies[key] = devDependencies[key];
  }
}
fs.writeFileSync(packageJsonFilename, JSON.stringify(json, null, 2), 'utf-8');