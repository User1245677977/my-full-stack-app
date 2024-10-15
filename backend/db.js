const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();  // Load environment variables from .env

// Use JAWSDB_URL for production or DATABASE_URL for other environments
const databaseUrl = process.env.JAWSDB_URL || process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error("DATABASE_URL or JAWSDB_URL is not defined. Please check your environment variables.");
  process.exit(1);
}

const sequelize = new Sequelize(databaseUrl, {
  dialect: 'mysql',
  logging: false,  // Disable logging for cleaner output
  dialectOptions: {
    ssl: process.env.NODE_ENV === 'production' ? {
      require: true,
      rejectUnauthorized: false,
    } : false,
  },
});

module.exports = { sequelize };
