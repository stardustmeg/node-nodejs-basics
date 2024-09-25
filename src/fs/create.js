import { writeFile, access, constants } from 'node:fs/promises';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, 'files', 'fresh.txt');
const CONTENT = 'I am fresh and young';
const FILE_EXISTS_ERROR_TEXT = 'FS operation failed: file already exists';

const create = async () => {
  try {
    await access(filePath, constants.F_OK);
    console.error(FILE_EXISTS_ERROR_TEXT);
  } catch (err) {
    if (err.code === 'ENOENT') {
      await writeFile(filePath, CONTENT);
    } else {
      console.log(err);
    }
  }
};

await create();
