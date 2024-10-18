//db.js

const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error("Error: DATABASE_URL is not defined.");
  process.exit(1);
}

const sequelize = new Sequelize(databaseUrl, {
  dialect: 'postgres', // Ensure 'postgres' is set here
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

module.exports = { sequelize };

