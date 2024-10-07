import { workerData, parentPort } from 'node:worker_threads';

const nthFibonacci = (n) => (n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2));

const sendResult = () => {
  if (typeof workerData !== 'number') {
    throw new Error('workerData must be a number');
  }

  const result = nthFibonacci(workerData);

  parentPort.postMessage(result);
};

sendResult();
