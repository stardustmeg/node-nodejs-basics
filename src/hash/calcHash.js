import { createReadStream } from 'fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { createHash } from 'crypto';

const __dirname = dirname(fileURLToPath(import.meta.url));
const filesFolderName = 'files';
const file = join(__dirname, filesFolderName, 'fileToCalculateHashFor.txt');

const calculateHash = async () => {
  const hash = createHash('sha256');
  const readStream = createReadStream(file);

  readStream.on('data', (chunk) => {
    hash.update(chunk);
  });

  readStream.on('end', () => {
    const hex = hash.digest('hex');
    console.log(hex);
  });
};

await calculateHash();
