import { Transform } from 'node:stream';
import os from 'node:os';

const transform = async () => {
  const reverseStream = new Transform({
    transform(chunk, encoding, callback) {
      const reversedChunk = chunk.toString().trimEnd().split('').reverse().join('');
      callback(null, `${reversedChunk}${os.EOL}`);
    },
  });

  try {
    process.stdin.pipe(reverseStream).pipe(process.stdout);
  } catch (err) {
    console.error(`An error occured: ${err}`);
    process.exitCode = 1;
  }
};

transform();
