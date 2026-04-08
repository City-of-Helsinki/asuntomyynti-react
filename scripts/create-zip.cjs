const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const resolveFirstExistingPath = (paths) => paths.find((candidate) => fs.existsSync(candidate));

const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf-8'));
const unsafeZipName = `${packageJson.name}-${packageJson.version}.zip`;
const zipName = unsafeZipName.replace(/[^a-zA-Z0-9._-]/g, '_');
const distPath = path.join(__dirname, '../dist');

try {
  const isWindows = process.platform === 'win32';
  const reactPath = path.join(distPath, 'react');
  const destinationPath = path.join(distPath, zipName);

  if (isWindows) {
    const systemRoot = process.env.SystemRoot || 'C:\\Windows';
    const powershellPath = path.join(systemRoot, 'System32', 'WindowsPowerShell', 'v1.0', 'powershell.exe');
    const escapedReactPath = reactPath.replace(/'/g, "''");
    const escapedDestinationPath = destinationPath.replace(/'/g, "''");
    const psCommand = `Compress-Archive -Path '${escapedReactPath}' -DestinationPath '${escapedDestinationPath}' -Force`;
    execFileSync(powershellPath, ['-NoProfile', '-NonInteractive', '-Command', psCommand], {
      stdio: 'inherit',
    });
  } else {
    const zipPath = resolveFirstExistingPath(['/usr/bin/zip', '/bin/zip']);
    if (!zipPath) {
      throw new Error('zip executable was not found in /usr/bin/zip or /bin/zip');
    }
    execFileSync(zipPath, ['-r', zipName, 'react'], { stdio: 'inherit', cwd: distPath });
  }

  const stats = fs.statSync(destinationPath);
  console.log(`✓ Created ${zipName} (${stats.size} bytes)`);
} catch (error) {
  console.error('Error creating zip:', error.message);
  process.exit(1);
}
