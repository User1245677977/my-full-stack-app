const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();  // Load environment variables from .env

// Use JAWSDB_URL for production or DATABASE_URL for other environments
const databaseUrl = process.env.JAWSDB_URL || process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error("DATABASE_URL or JAWSDB_URL is not defined. Please check your environment variables.");
  process.exit(1);
}

const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.JAWSDB_URL, {
  dialect: 'mysql',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

module.exports = { sequelize };
