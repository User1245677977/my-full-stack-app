// server.js
const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const { connectDB, sequelize } = require('./db'); // Import connectDB function and Sequelize instance

// Import your routes and middleware
console.log('transferRoutes:', transferRoutes);
console.log('authRoutes:', authRoutes);
console.log('accountRoutes:', accountRoutes);
console.log('updateRoutes:', updateRoutes);
console.log('checkDepositRoutes:', checkDepositRoutes);

// Import Sequelize models
const { User, Transaction } = require('./models');

dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the React app build folder
app.use(express.static(path.join(__dirname, '../client/build')));

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// API Routes
app.use('/api/transfer', transferRoutes); // Ensure 'transferRoutes' is defined correctly
app.use('/api/auth', authRoutes); // Ensure 'authRoutes' is defined correctly
app.use('/api/accounts', accountRoutes); // Ensure 'accountRoutes' is defined correctly
app.use('/api/update', updateRoutes); // Ensure 'updateRoutes' is defined correctly
app.use('/api/check-deposit', checkDepositRoutes); // Ensure 'checkDepositRoutes' is defined correctly
app.use('/api/upload-middleware', uploadMiddleware); // Middleware route

// Example route with middleware
const someRouteHandler = (req, res) => res.send('Middleware route working!');
app.use('/some-route', authMiddleware, someRouteHandler); // Added the correct handler function

// Example route to fetch data from PostgreSQL using Sequelize
app.get('/users-pg', async (req, res) => {
  try {
    const users = await User.findAll(); // Use Sequelize to fetch all users
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Catch-all handler to return React app for any other request
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Connect to PostgreSQL using the connectDB function
connectDB();

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);

  // Sync the Sequelize models with the database
  try {
    await sequelize.sync({ alter: true }); // Sync models; use { force: true } to drop & recreate tables
    console.log('Database synced successfully');
  } catch (err) {
    console.error('Error syncing database:', err);
  }
});
