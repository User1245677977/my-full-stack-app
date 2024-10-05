module.exports = {
    development: {
      username: process.env.DB_USERNAME || "your_development_db_username",
      password: process.env.DB_PASSWORD || "your_development_db_password",
      database: process.env.DB_NAME || "your_development_db",
      host: process.env.DB_HOST || "127.0.0.1",
      dialect: "postgres",
    },
    test: {
      username: process.env.DB_USERNAME || "your_test_db_username",
      password: process.env.DB_PASSWORD || "your_test_db_password",
      database: process.env.DB_NAME || "your_test_db",
      host: process.env.DB_HOST || "127.0.0.1",
      dialect: "postgres",
    },
    production: {
      use_env_variable: "DATABASE_URL",  // Use Heroku's DATABASE_URL environment variable
      dialect: "postgres",
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    },
  };
  