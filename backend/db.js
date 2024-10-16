//db.js

const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

// Use the DATABASE_URL in production
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error('Error: DATABASE_URL is not defined.');
  process.exit(1);
}

const sequelize = new Sequelize(databaseUrl, {
  dialect: 'mysql',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Disable SSL verification for remote MySQL connections
    },
  },
});

module.exports = { sequelize };
