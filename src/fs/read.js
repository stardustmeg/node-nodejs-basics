import { readFile } from 'node:fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { ERROR_MESSAGE } from '../constants/errors.js';

const MODULE_DIRECTORY = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(MODULE_DIRECTORY, 'files', 'fileToRead.txt');

const read = async () => {
  try {
    const content = await readFile(filePath, 'utf8');
    console.log(content);
  } catch (error) {
    throw new Error(ERROR_MESSAGE);
  }
};

await read();
