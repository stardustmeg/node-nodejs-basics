const parseArgs = () => {
  process.argv.slice(2).reduce((_, curr, index) => {
    if (index % 2 === 0) {
      console.log(`${curr.slice(2)} is ${process.argv[index + 3]}`);
    }
  }, {});
};

parseArgs();
