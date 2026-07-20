module.exports = {
  apps: [
    {
      name: "maestro-backend",
      script: "node_modules/@nestjs/cli/bin/nest.js",
      args: "start --watch",
      cwd: "./maestro-backend",
      watch: true,
      env: { 
        NODE_ENV: "development",
        DATABASE_URL: "postgresql://maestro_app_user:app_secret_123@localhost:5432/maestro?schema=public",
        REDIS_URL: "redis://localhost:6379",
        QDRANT_URL: "http://localhost:6333"
      }
    },
    {
      name: "maestro-frontend",
      script: "node_modules/next/dist/bin/next",
      args: "dev",
      cwd: "./maestro-frontend",
      watch: false,
      env: { NODE_ENV: "development" }
    },
    {
      name: "maestro-agents",
      script: "node_modules/ts-node/dist/bin.js",
      args: "src/main.ts",
      cwd: "./maestro-agents",
      watch: false,
      env: { NODE_ENV: "development" }
    }
  ]
};
