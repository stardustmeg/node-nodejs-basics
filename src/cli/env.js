const parseEnv = () => {
  const envVariables = Object.keys(process.env)
    .filter((key) => key.startsWith('RSS_'))
    .map((key) => `${key}=${process.env[key]}`)
    .join('; ');

  console.log(envVariables);
};

parseEnv();
