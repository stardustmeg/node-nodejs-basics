import { readdir, access, constants } from 'node:fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { ERROR_MESSAGE } from '../constants/errors.js';

const MODULE_DIRECTORY = path.dirname(fileURLToPath(import.meta.url));
const filesFolder = path.join(MODULE_DIRECTORY, 'files');

const list = async () => {
  try {
    await access(filesFolder, constants.R_OK);
    const filenames = await readdir(filesFolder);
    console.log(filenames);
  } catch (error) {
    throw new Error(ERROR_MESSAGE);
  }
};

await list();
