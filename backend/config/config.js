// config/config.js
module.exports = {
    development: {
      username: process.env.DB_USERNAME || "your_dev_username",
      password: process.env.DB_PASSWORD || "your_dev_password",
      database: process.env.DB_NAME || "development_db",
      host: process.env.DB_HOST || "127.0.0.1",
      dialect: "postgres",
    },
    test: {
      username: process.env.DB_USERNAME || "your_test_username",
      password: process.env.DB_PASSWORD || "your_test_password",
      database: process.env.DB_NAME || "test_db",
      host: process.env.DB_HOST || "127.0.0.1",
      dialect: "postgres",
    },
    production: {
      use_env_variable: JAWSDB_URL,
      dialect: mysql,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false, // This ensures SSL connection for Heroku        
        },
      },
    },
  };
  