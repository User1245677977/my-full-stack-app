// db.js
const { Pool } = require('pg');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Create a new pool instance, using the connection string from the environment variables
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Connect to the PostgreSQL database and log success or error
pool.connect((err) => {
  if (err) {
    console.error('Error connecting to PostgreSQL', err);
  } else {
    console.log('Connected to PostgreSQL');
  }
});

// Export the pool instance for use in other parts of the application
module.exports = pool;
