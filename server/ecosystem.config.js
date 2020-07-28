module.exports = {
  apps: [
    {
      name: 'casino',
      script: './index.js',
      instances: 1,
      autorestart: true,
      watch: true,
      ignore_watch: ['node_modules'],
      watch_options: {
        followSymlinks: false,
      },
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
