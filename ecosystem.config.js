module.exports = {
  apps: [
    {
      name: "maestro-backend",
      script: "npm",
      args: "run start:dev",
      cwd: "./maestro-backend",
      watch: true,
      env: { NODE_ENV: "development" }
    },
    {
      name: "maestro-frontend",
      script: "npm",
      args: "run dev",
      cwd: "./maestro-frontend",
      watch: false,
      env: { NODE_ENV: "development" }
    },
    {
      name: "maestro-agents",
      script: "npm",
      args: "run start",
      cwd: "./maestro-agents",
      watch: false,
      env: { NODE_ENV: "development" }
    }
  ]
};
