require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const { sequelize } = require('./db');
console.log("Database URL from environment:", process.env.JAWSDB_URL);

// Import routes
const transferRoutes = require('./routes/transfer');
const authRoutes = require('./routes/auth');
const accountRoutes = require('./routes/account');
const updateRoutes = require('./routes/update');
const checkDepositRoutes = require('./routes/checkDeposit');

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the React app build folder
app.use(express.static(path.join(__dirname, '../client/build')));

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// API Routes
app.use('/api/transfer', transferRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/accounts', accountRoutes);
app.use('/api/update', updateRoutes);
app.use('/api/check-deposit', checkDepositRoutes);

// Catch-all handler to return React app for any other request
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);

  // Sync the Sequelize models with the database
  try {
    await sequelize.sync({ alter: true });
    console.log('Database synced successfully');
  } catch (err) {
    console.error('Error syncing database:', err);
  }
});
