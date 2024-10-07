import { once } from 'node:events';
import fsPromises from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'url';
import { ERROR_MESSAGE } from '../constants/errors.js';

const MODULE_DIRECTORY = path.dirname(fileURLToPath(import.meta.url));
const file = path.resolve(MODULE_DIRECTORY, 'files', 'fileToWrite.txt');

const write = async () => {
  try {
    const handle = await fsPromises.open(file, 'w');
    const writeStream = handle.createWriteStream();

    process.stdin.pipe(writeStream);

    await once(writeStream, 'finish');
  } catch {
    throw new Error(ERROR_MESSAGE);
  }
};

await write();
