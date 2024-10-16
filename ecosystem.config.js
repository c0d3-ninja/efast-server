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
      },
      env_production: {
        'PORT': 5001,
        'NODE_ENV': 'production',
        'JWT_SECRET_MAGIC_TOKEN':'production_magic_token',
        'JWT_SECRET':'production_token',
      },
    },
  ],
  deploy : {
    production : {
      'user' : 'root',
      'host' : ['82.112.234.54'],
      'ref'  : 'origin/master',
      'repo' : 'git@github.com:c0d3-ninja/efast-server.git',
      'path' : '/var/www/efa-server',
      'post-deploy' : 'npm install',
    },
  },

};
