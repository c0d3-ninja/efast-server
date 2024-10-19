module.exports = {
  apps : [
    {
      name: 'efast-server',
      script: './index.mjs',
      watch:true,
      env: {
        'PORT': 5001,
        'NODE_ENV': 'development',
        'JWT_SECRET_MAGIC_TOKEN':'d3v5ecr3t_magic_token',
        'JWT_SECRET':'d3v5ecr3t_token',
        'MONGO_DB_NAME':'efast_dev',
        'DOMAIN':'http://localhost',
        'MAIL_HOST':'srv623447.hstgr.cloud',
      },
      env_production: {
        'PORT': 5001,
        'NODE_ENV': 'production',
        'JWT_SECRET_MAGIC_TOKEN':'production_magic_token',
        'JWT_SECRET':'production_token',
        'MONGO_DB_NAME':'efast_prod',
        'DOMAIN':'https://embedfa.st',
        'MAIL_HOST':'srv623447.hstgr.cloud',
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
