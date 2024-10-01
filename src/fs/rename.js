import { access, constants, rename as fsRename } from 'node:fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { ERROR_MESSAGE } from '../constants/errors.js';

const MODULE_DIRECTORY = path.dirname(fileURLToPath(import.meta.url));

const wrongFilenamePath = path.join(MODULE_DIRECTORY, 'files', 'wrongFilename.txt');
const properFilenamePath = path.join(MODULE_DIRECTORY, 'files', 'properFilename.md');

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

const rename = async () => {
  const sourceExists = await fileExists(wrongFilenamePath);
  const destinationExists = await fileExists(properFilenamePath);

  if (!sourceExists || destinationExists) {
    throw new Error(ERROR_MESSAGE);
  }

  await fsRename(wrongFilenamePath, properFilenamePath);
};

await rename();
