
export const envKeys = {
  JWT_SECRET_MAGIC_TOKEN:'JWT_SECRET_MAGIC_TOKEN',
  JWT_SECRET:'JWT_SECRET',
  MONGO_DB_NAME:'MONGO_DB_NAME',
  DOMAIN:'DOMAIN',
  MAIL_HOST:'MAIL_HOST',
  G_LOGIN_CLIENT_ID:'G_LOGIN_CLIENT_ID',
  G_LOGIN_CLIENT_SECRET:'G_LOGIN_CLIENT_SECRET',
  G_LOGIN_OAUTH2_CALLBACK:'G_LOGIN_OAUTH2_CALLBACK',
};

export const getEnvValue = (key) => {
  const nodeEnv = process.env.NODE_ENV;
  if(nodeEnv==='production'){
    return process.env[key+'_PRODUCTION'];
  }
  return process.env[key];
};
