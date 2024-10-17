//config.js

module.exports = {
  development: {
    username: process.env.DB_USERNAME || 'your_postgres_username',
    password: process.env.DB_PASSWORD || 'your_postgres_password',
    database: process.env.DB_NAME || 'your_postgres_database',
    host: process.env.DB_HOST || 'your_postgres_host',
    dialect: 'postgres',
  },
  test: {
    username: process.env.DB_USERNAME || 'your_postgres_username',
    password: process.env.DB_PASSWORD || 'your_postgres_password',
    database: process.env.DB_NAME || 'your_postgres_database',
    host: process.env.DB_HOST || 'your_postgres_host',
    dialect: 'postgres',
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',  // Change this to 'postgres'
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
