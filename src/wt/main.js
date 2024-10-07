import path from 'node:path';
import { fileURLToPath } from 'url';
import { Worker } from 'node:worker_threads';
import os from 'node:os';

const MODULE_DIRECTORY = path.dirname(fileURLToPath(import.meta.url));
const WORKER_PATH = path.resolve(MODULE_DIRECTORY, 'worker.js');
const STARTING_NUMBER = 10;

const Status = {
  ERROR: 'error',
  OK: 'resolved',
};

const createWorker = (workerData) => {
  return new Promise((resolve) => {
    const worker = new Worker(WORKER_PATH, { workerData });

    worker.on('message', resolve);
    worker.on('error', () => resolve(null));
    worker.on('messageerror', () => resolve(null));
  });
};

const mapResultToStatus = (result) => ({
  status: result !== null ? Status.OK : Status.ERROR,
  data: result,
});

const performCalculations = async () => {
  const numCores = os.availableParallelism();
  const workerPromises = Array.from({ length: numCores }, (_, i) => createWorker(STARTING_NUMBER + i));

  const results = await Promise.all(workerPromises);
  console.log(results.map(mapResultToStatus));
};

await performCalculations();
