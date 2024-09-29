// db.js
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Set up a new Sequelize instance for PostgreSQL
const sequelize = new Sequelize(process.env.PG_URI, {
  dialect: 'postgres',
  logging: false, // Disable logging; default: console.log
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL connected successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
