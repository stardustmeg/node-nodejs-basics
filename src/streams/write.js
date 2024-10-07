import { pipeline } from 'node:stream/promises';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';
import { ERROR_MESSAGE } from '../constants/errors.js';

const MODULE_DIRECTORY = path.dirname(fileURLToPath(import.meta.url));
const file = path.resolve(MODULE_DIRECTORY, 'files', 'fileToWrite.txt');

const write = async () => {
  try {
    const writeStream = fs.createWriteStream(file);

    process.on('SIGINT', () => {
      console.log('\nProcess interrupted. Closing the write stream.');
      writeStream.end();
      process.exit(0);
    });

    await pipeline(process.stdin, writeStream);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw new Error(ERROR_MESSAGE);
  }
};

await write();
