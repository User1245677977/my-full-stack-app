const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config(); 

// Use JAWSDB_URL for production or DATABASE_URL for other environments
const databaseUrl = process.env.JAWSDB_URL || process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error("Error: DATABASE_URL or JAWSDB_URL is not defined. Please check your environment variables.");
  process.exit(1);
}

// Initialize Sequelize with the appropriate connection options
const sequelize = new Sequelize(databaseUrl, {
  dialect: 'mysql',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

// Export the sequelize instance for use in other parts of your application
module.exports = { sequelize };
