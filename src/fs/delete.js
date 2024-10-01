import { unlink, access, constants } from 'node:fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { ERROR_MESSAGE } from '../constants/errors.js';

const getFilePath = (fileName) => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  return path.join(__dirname, 'files', fileName);
};

const fileExists = async (filePath) => {
  try {
    await access(filePath, constants.F_OK);
    return true;
  } catch (err) {
    if (err.code === 'ENOENT') {
      return false;
    }
    throw err;
  }
};

const remove = async () => {
  const filePath = getFilePath('fileToRemove.txt');

  if (!(await fileExists(filePath))) {
    throw new Error(ERROR_MESSAGE);
  }

  await unlink(filePath);
};

await remove();
