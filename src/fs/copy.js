import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ERROR_MESSAGE } from '../constants/errors.js';

const getDirPath = (dirName) => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  return path.join(__dirname, dirName);
};

const copyItem = async (source, destination) => {
  const stats = await fs.stat(source);
  if (stats.isDirectory()) {
    await fs.mkdir(destination);
    const files = await fs.readdir(source);
    await Promise.all(files.map((file) => copyItem(path.join(source, file), path.join(destination, file))));
  } else {
    await fs.copyFile(source, destination);
  }
};

const copy = async () => {
  const sourceDir = getDirPath('files');
  const destinationDir = getDirPath('files_copy');

  try {
    await fs.access(sourceDir);
    await copyItem(sourceDir, destinationDir);
  } catch (err) {
    if (err.code === 'ENOENT' || err.code === 'EEXIST') {
      throw new Error(ERROR_MESSAGE);
    }
    throw err;
  }
};

await copy();
