const missing: string[] = [];
const envOrDefault = (
  env: string,
  defaultValue = '',
  required = true
): string => {
  if (!process.env[env] && required) { missing.push(env); }
  return process.env[env] || defaultValue;
};

const env = {
  restPort: envOrDefault('REST_PORT'),
  maxBodySize: envOrDefault('MAX_BODY_SIZE')
};

export default env;