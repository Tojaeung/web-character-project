module.exports = {
  apps: [
    {
      name: 'web-character-project',
      script: './dist/server.js',
      watch: true,
      exec_mode: 'cluster',
      instances: -1,
      autorestart: true,
      max_memory_restart: '512M',
      listen_timeout: 3000,
      kill_timeout: 6000,
      combine_logs: true,
      ignore_watch: ['node_modules'],
    },
  ],
};
