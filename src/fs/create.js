import { writeFile, access, constants } from 'node:fs/promises';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { errors } from '../constants/errors.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, 'files', 'fresh.txt');

const CONTENT = 'I am fresh and young';

const create = async () => {
  try {
    await access(filePath, constants.F_OK);
    console.error(errors.FILE_EXISTS);
  } catch (err) {
    if (err.code === 'ENOENT') {
      await writeFile(filePath, CONTENT);
    } else {
      console.log(err);
    }
  }
};

await create();
