module.exports = {
    development: {
      username: process.env.DB_USERNAME || "u4bb6kc55uoc3u",
      password: process.env.DB_PASSWORD || "pcc43e3e003bf6ce161b5d2a19778636c9cc5e6516ca7feef25e4038cb0e132b5",
      database: process.env.DB_NAME || "d86erc9h2oqika",
      host: process.env.DB_HOST || "127.0.0.1",
      dialect: "postgres",
    },
    test: {
        username: process.env.DB_USERNAME || "u4bb6kc55uoc3u",
        password: process.env.DB_PASSWORD || "pcc43e3e003bf6ce161b5d2a19778636c9cc5e6516ca7feef25e4038cb0e132b5",
        database: process.env.DB_NAME || "d86erc9h2oqika",
        host: process.env.DB_HOST || "127.0.0.1",
        dialect: "postgres",
      },
    production: {
      use_env_variable: "DATABASE_URL", // Tells Sequelize to use the DATABASE_URL environment variable set by Heroku
      dialect: "postgres",
    },
  };
  