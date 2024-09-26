import { writeFile, access, constants } from 'node:fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { ERROR_MESSAGE } from '../constants/errors.js';
import { CONTENT } from '../constants/file_content.js';

const getFilePath = () => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  return path.join(__dirname, 'files', 'fresh.txt');
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

const createFile = async (filePath) => {
  await writeFile(filePath, CONTENT);
};

const create = async () => {
  const filePath = getFilePath();

  try {
    if (await fileExists(filePath)) {
      throw new Error(ERROR_MESSAGE);
    } else {
      await createFile(filePath);
    }
  } catch (err) {
    throw new Error(ERROR_MESSAGE);
  }
};

await create();
