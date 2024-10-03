// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const { connectDB, sequelize } = require('./db'); // Import connectDB function and Sequelize instance
const app = express();

// Import your routes and middleware
const transferRoute = require('./routes/transfer');
const authRoutes = require('./routes/auth');
const accountRoutes = require('./routes/account');
const updateRoutes = require('./routes/update');
const checkDeposit = require('./routes/checkDeposit');
const { uploadMiddleware } = require('./middleware/uploadMiddleware');
const authMiddleware = require('./middleware/authMiddleware');

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
app.use('/api/transfer', transferRoute);
app.use('/api/auth', authRoutes);
app.use('/api/accounts', accountRoutes);
app.use('/api/update', updateRoutes);
app.use('/api/check-deposit', checkDepositRoute);
app.use('/api/upload-middleware', uploadMiddleware); // Properly setup middleware route
app.use('/some-route', authMiddleware, someRouteHandler); // Example route with middleware
app.use('/api/check-deposit', checkDepositRoute);

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
