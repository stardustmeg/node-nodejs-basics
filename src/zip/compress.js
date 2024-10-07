import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';
import { pipeline } from 'node:stream/promises';
import zlib from 'node:zlib';

const MODULE_DIRECTORY = path.dirname(fileURLToPath(import.meta.url));
const FILES_DIR = 'files';
const sourceFile = path.resolve(MODULE_DIRECTORY, FILES_DIR, 'fileToCompress.txt');
const destFile = path.resolve(MODULE_DIRECTORY, FILES_DIR, 'archive.gz');
const ERROR_MESSAGE = 'FS operation failed';

const compress = async () => {
  let readStream, writeStream;
  try {
    readStream = fs.createReadStream(sourceFile);
    writeStream = fs.createWriteStream(destFile);
    const gzip = zlib.createGzip();

    await pipeline(readStream, gzip, writeStream);
    console.log('File compressed successfully');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw new Error(ERROR_MESSAGE);
  } finally {
    readStream?.close();
    writeStream?.close();
  }
};

await compress();
