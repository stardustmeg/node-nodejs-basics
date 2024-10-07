import fsPromises from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'url';
import { pipeline } from 'node:stream/promises';
import zlib from 'node:zlib';

const MODULE_DIRECTORY = path.dirname(fileURLToPath(import.meta.url));
const FILES_DIR = 'files';
const sourceFile = path.resolve(MODULE_DIRECTORY, FILES_DIR, 'archive.gz');
const destFile = path.resolve(MODULE_DIRECTORY, FILES_DIR, 'fileToCompress.txt');
const ERROR_MESSAGE = 'FS operation failed';

const decompress = async () => {
  try {
    const srcFh = await fsPromises.open(sourceFile);
    const destFh = await fsPromises.open(destFile, 'w');
    const gunzip = zlib.createGunzip();
    const readStream = srcFh.createReadStream();
    const writeStream = destFh.createWriteStream();

    await pipeline(readStream, gunzip, writeStream);
  } catch {
    throw new Error(ERROR_MESSAGE);
  }
};

await decompress();
