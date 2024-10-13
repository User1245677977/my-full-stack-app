const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Use DATABASE_URL for Heroku or PG_URI for local development
const databaseUrl = process.env.DATABASE_URL || process.env.PG_URI;

if (!databaseUrl) {
  console.error("DATABASE_URL or PG_URI is not defined. Please check your environment variables.");
  process.exit(1);
}

// Set up a new Sequelize instance for PostgreSQL
const sequelize = new Sequelize(databaseUrl, {
  dialect: 'postgres', // Ensure you're using the right dialect
  logging: false,
  dialectOptions: {
    ssl: process.env.NODE_ENV === 'production' ? {
      require: true,
      rejectUnauthorized: false,
    } : false,
  },
});

// Connect to the database
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL connected successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error.message);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
