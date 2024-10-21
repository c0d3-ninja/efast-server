module.exports = {
  apps : [
    {
      name: 'efast-server',
      script: './index.mjs',
      watch:true,
      env: {
        'PORT': 5001,
        'NODE_ENV': process.env.NODE_ENV,
        'JWT_SECRET_MAGIC_TOKEN':process.env.JWT_SECRET_MAGIC_TOKEN,
        'JWT_SECRET':process.env.JWT_SECRET,
        'MONGO_DB_NAME':process.env.MONGO_DB_NAME,
        'DOMAIN':process.env.DOMAIN,
        'MAIL_HOST':process.env.MAIL_HOST,
        'G_LOGIN_CLIENT_ID':process.env.G_LOGIN_CLIENT_ID,
        'G_LOGIN_CLIENT_SECRET':process.env.G_LOGIN_CLIENT_SECRET,
      },
      env_production: {
        'PORT': 5001,
        'NODE_ENV': process.env.NODE_ENV_PRODUCTION,
        'JWT_SECRET_MAGIC_TOKEN':process.env.JWT_SECRET_MAGIC_TOKEN_PRODUCTION,
        'JWT_SECRET':process.env.JWT_SECRET_MAGIC_TOKEN,
        'MONGO_DB_NAME':process.env.MONGO_DB_NAME_PRODUCTION,
        'DOMAIN':process.env.DOMAIN_PRODUCTION,
        'MAIL_HOST':process.env.MAIL_HOST_PRODUCTION,
        'G_LOGIN_CLIENT_ID':process.env.G_LOGIN_CLIENT_ID_PRODUCTION,
        'G_LOGIN_CLIENT_SECRET':process.env.G_LOGIN_CLIENT_SECRET_PRODUCTION,
      },
    },
  ],
  deploy : {
    production : {
      'user' : 'root',
      'host' : ['82.112.234.54'],
      'ref'  : 'origin/main',
      'repo' : 'git@github.com:c0d3-ninja/efast-server.git',
      'path' : '/var/www/efast-server',
      key: '~/.ssh/vps',
      'post-deploy' : 'source /root/.nvm/nvm.sh && npm install && npm run prod',
    },
  },

};
