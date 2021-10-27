require('dotenv').config();

module.exports = {
  apps: [{
    name: "api",
    script: "src/main.js",
    watch: true,
    env_local: {
      "NODE_ENV": "local",
      "API_DESCRIPTION": "Estás ejecutando tu API en modo desarrollador.",
      "PORT": process.env.PORT,
      "DB_HOST": process.env.DB_HOST,
      "DB_USERNAME": process.env.DB_USERNAME,
      "DB_PASSWORD": process.env.DB_PASSWORD,
      "DB_NAME": process.env.DB_NAME,
      "DB_PORT": process.env.DB_PORT,
      "REDIS_ENDPOINT": process.env.REDIS_ENDPOINT,
      "JWT_PASS": process.env.JWT_PASS
    },
    env_production: {
      "NODE_ENV": "production",
      "API_DESCRIPTION": "Estás ejecutando tu API en producción. ¡¡Ten cuidado!!",
      "PORT": process.env.PORT,
      "DB_HOST": process.env.DB_HOST,
      "DB_USERNAME": process.env.DB_USERNAME,
      "DB_PASSWORD": process.env.DB_PASSWORD,
      "DB_NAME": process.env.DB_NAME,
      "DB_PORT": process.env.DB_PORT,
      "REDIS_ENDPOINT": process.env.REDIS_ENDPOINT,
      "JWT_PASS": process.env.JWT_PASS
    }
  }]
};
