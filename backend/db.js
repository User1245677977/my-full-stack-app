//db.js

const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config(); 

const databaseUrl = process.env.JAWSDB_URL || process.env.DATABASE_URL;


if (!databaseUrl) {
  console.error("Error: DATABASE_URL or JAWSDB_URL is not defined.");
  process.exit(1);
}

const sequelize = new Sequelize(databaseUrl, {
  dialect: 'mysql',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

module.exports = { sequelize };
