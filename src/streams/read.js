import { once } from 'node:events';
import fsPromises from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'url';
import { ERROR_MESSAGE } from '../constants/errors.js';

const MODULE_DIRECTORY = path.dirname(fileURLToPath(import.meta.url));
const file = path.resolve(MODULE_DIRECTORY, 'files', 'fileToRead.txt');

const read = async () => {
  try {
    const handle = await fsPromises.open(file);
    const readStream = handle.createReadStream();
    const stream = readStream.pipe(process.stdout);

    await once(stream, 'finish');
  } catch {
    throw new Error(ERROR_MESSAGE);
  }
};

await read();
