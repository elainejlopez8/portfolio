import { config as loadEnv } from 'dotenv';
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

const rootDir = resolve(import.meta.dirname, '..');
const envLocalPath = resolve(rootDir, '.env.local');

if (existsSync(envLocalPath)) {
  loadEnv({ path: envLocalPath });
}

const child = spawn('yarn', ['vercel', 'dev', ...process.argv.slice(2)], {
  cwd: rootDir,
  env: process.env,
  shell: process.platform === 'win32',
  stdio: 'inherit',
});

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});
