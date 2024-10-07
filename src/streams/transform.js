import { Transform } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import os from 'node:os';

const createReverseStream = () =>
  new Transform({
    transform(chunk, encoding, callback) {
      const reversedChunk = chunk.toString().trimEnd().split('').reverse().join('');
      callback(null, `${reversedChunk}${os.EOL}`);
    },
  });

const transform = async () => {
  try {
    await pipeline(process.stdin, createReverseStream(), process.stdout);
  } catch (err) {
    console.error(`An error occurred: ${err.message}`);
    process.exitCode = 1;
  }
};

transform();
