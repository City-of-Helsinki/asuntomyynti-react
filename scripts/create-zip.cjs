const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf-8'));
const zipName = `${packageJson.name}-${packageJson.version}.zip`;
const distPath = path.join(__dirname, '../dist');

try {
  const isWindows = process.platform === 'win32';

  if (isWindows) {
    const psCommand = `Compress-Archive -Path "${path.join(distPath, 'react')}" -DestinationPath "${path.join(distPath, zipName)}" -Force`;
    execSync(`powershell -Command "${psCommand}"`, { stdio: 'inherit' });
  } else {
    execSync(`cd dist && zip -r ${zipName} react`, { stdio: 'inherit', shell: '/bin/bash' });
  }

  const stats = fs.statSync(path.join(distPath, zipName));
  console.log(`✓ Created ${zipName} (${stats.size} bytes)`);
} catch (error) {
  console.error('Error creating zip:', error.message);
  process.exit(1);
}
