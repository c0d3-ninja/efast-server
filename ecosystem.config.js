module.exports = {
  apps : [
    {
      name: 'efast-server',
      script: './index.mjs',
      watch:true,
      env: {
        'PORT': 5001,
        'NODE_ENV': 'development',
        'JWT_SUPERNOVA_MAGIC_TOKEN':'d3v5ecr3t_magic_token',
        'JWT_SUPERNOVA':'d3v5ecr3t_token',
        'MONGO_DB_NAME':'efast_dev',
        'DOMAIN':'http://localhost',
        'MAIL_HOST':'srv623447.hstgr.cloud',
        'G_LOGIN_CLIENT_ID':'532346363316-tmhf8n8c1i209hob2587ats1rob51247.apps.googleusercontent.com',
        'G_LOGIN_CLIENT_SUPERNOVA':'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',
      },
      env_production: {
        'PORT': 5001,
        'NODE_ENV': 'production',
        'JWT_SUPERNOVA_MAGIC_TOKEN':'production_magic_token',
        'JWT_SUPERNOVA':'production_token',
        'MONGO_DB_NAME':'efast_prod',
        'DOMAIN':'https://embedfa.st',
        'MAIL_HOST':'srv623447.hstgr.cloud',
        'G_LOGIN_CLIENT_ID':'532346363316-tmhf8n8c1i209hob2587ats1rob51247.apps.googleusercontent.com',
        'G_LOGIN_CLIENT_SUPERNOVA':'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',
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
