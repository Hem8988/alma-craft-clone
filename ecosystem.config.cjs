// PM2 process config for the "gssssangla" site.
// Run the app that nitro's node-server build produces (.output/server/index.mjs).
// Start/reload with:  pm2 start ecosystem.config.cjs   |   pm2 reload gssssangla
const path = require("node:path");

module.exports = {
  apps: [
    {
      name: "gssssangla",
      script: path.join(__dirname, ".output", "server", "index.mjs"),
      cwd: __dirname,
      exec_mode: "fork",
      instances: 1,
      autorestart: true,
      max_memory_restart: "500M",
      env: {
        NODE_ENV: "production",
        HOST: "127.0.0.1",
        PORT: 3080,
        NITRO_PORT: 3080,
        NITRO_HOST: "127.0.0.1",
        // PostgreSQL Database Configuration
        PGHOST: "127.0.0.1",
        PGPORT: 5432,
        PGDATABASE: "gsss_db",
        PGUSER: "postgres",
        PGPASSWORD: "Latahemsingh123@",
      },
    },
  ],
};
