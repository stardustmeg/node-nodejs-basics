import { spawn } from 'node:child_process';
import { pipeline } from 'node:stream/promises';
import path from 'node:path';
import { fileURLToPath } from 'url';

const MODULE_DIRECTORY = path.dirname(fileURLToPath(import.meta.url));
const scriptPath = path.resolve(MODULE_DIRECTORY, 'files', 'script.js');
const COMMAND = 'node';

const spawnChildProcess = async (args) => {
  const child = spawn(COMMAND, [scriptPath, ...args], {
    stdio: ['pipe', 'pipe', 'inherit'],
  });

  const stdin = pipeline(process.stdin, child.stdin).catch(() => {});
  const stdout = pipeline(child.stdout, process.stdout).catch(() => {});

  try {
    await new Promise((resolve, reject) => {
      child.on('close', (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`Child process exited with code ${code}`));
        }
      });
    });
  } catch (err) {
    console.error(`An error occurred: ${err}`);
    process.exitCode = 1;
  } finally {
    process.stdin.pause();
    await Promise.all([stdin, stdout]);
  }
};

spawnChildProcess(['the', 'answer', 'to', 'everything', 'is', 42]);
