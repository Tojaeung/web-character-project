require('dotenv').config();

module.exports = {
  apps: [
    {
      name: 'web-character-project',
      script: './dist/server.js',
      watch: true,
      exec_mode: process.env.NODE_ENV === 'production' ? 'cluster' : 'fork',
      instances: process.env.NODE_ENV === 'production' ? -1 : 1,
      autorestart: process.env.NODE_ENV === 'production',
      max_memory_restart: '512M',
      listen_timeout: 3000,
      kill_timeout: 6000,
      combine_logs: true,
      ignore_watch: ['node_modules'],
    },
  ],
};
