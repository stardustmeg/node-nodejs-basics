import { readdir, access, constants } from 'node:fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { ERROR_MESSAGE } from '../constants/errors.js';

const getFilesFolder = () => {
  const MODULE_DIRECTORY = path.dirname(fileURLToPath(import.meta.url));
  return path.join(MODULE_DIRECTORY, 'files');
};

const checkFolderAccess = async (folder) => {
  try {
    await access(folder, constants.R_OK);
  } catch (error) {
    throw new Error(ERROR_MESSAGE);
  }
};

const getFileNames = async (folder) => {
  try {
    return await readdir(folder);
  } catch (error) {
    throw new Error(ERROR_MESSAGE);
  }
};

const list = async () => {
  const filesFolder = getFilesFolder();
  await checkFolderAccess(filesFolder);
  const filenames = await getFileNames(filesFolder);
  console.log(filenames);
};

await list();
