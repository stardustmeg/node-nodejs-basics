import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ERROR_MESSAGE } from '../constants/errors.js';

const getDirPath = (dirName) => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  return path.join(__dirname, dirName);
};

const remove = async () => {
  const filePath = path.join(getDirPath('files'), 'fileToRemove.txt');
  try {
    await fs.unlink(filePath);
  } catch (err) {
    if (err.code === 'ENOENT') {
      throw new Error(ERROR_MESSAGE);
    }
    throw err;
  }
};

await remove();
