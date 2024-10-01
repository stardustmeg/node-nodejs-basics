import fsPromises, { access, constants } from 'node:fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { ERROR_MESSAGE } from '../constants/errors.js';

const MODULE_DIRECTORY = path.dirname(fileURLToPath(import.meta.url));

const wrongFilenamePath = path.join(MODULE_DIRECTORY, 'files', 'wrongFilename.txt');
const properFilenamePath = path.join(MODULE_DIRECTORY, 'files', 'properFilename.md');

const rename = async () => {
  try {
    await access(wrongFilenamePath, constants.F_OK);
    try {
      await access(properFilenamePath, constants.F_OK);
      throw new Error(ERROR_MESSAGE);
    } catch (err) {
      if (err.code === 'ENOENT') {
        await fsPromises.rename(wrongFilenamePath, properFilenamePath);
      } else {
        throw err;
      }
    }
  } catch (err) {
    if (err.code === 'ENOENT') {
      throw new Error(ERROR_MESSAGE);
    } else {
      throw err;
    }
  }
};

await rename();
