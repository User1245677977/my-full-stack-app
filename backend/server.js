// server.js
const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const { connectDB, sequelize } = require('./db'); // Import connectDB function and Sequelize instance

// Import your routes and middleware
const transferRoutes = require('./routes/transfer'); // Make sure this path and file exist
const authRoutes = require('./routes/auth');
const accountRoutes = require('./routes/account');
const updateRoutes = require('./routes/update');
const { uploadMiddleware } = require('./middleware/uploadMiddleware');
const authMiddleware = require('./middleware/authMiddleware');
const checkDepositRoutes = require('./routes/checkDeposit'); // Ensure this file exists

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
app.use('/api/transfer', transferRoutes); // Fixed: Ensure 'transferRoutes' is defined correctly
app.use('/api/auth', authRoutes);
app.use('/api/accounts', accountRoutes);
app.use('/api/update', updateRoutes);
app.use('/api/check-deposit', checkDepositRoutes);
app.use('/api/upload-middleware', uploadMiddleware);

// Example route with middleware
const someRouteHandler = (req, res) => res.send('Middleware route working!');
app.use('/some-route', authMiddleware, someRouteHandler);

// Example route to fetch data from PostgreSQL using Sequelize
app.get('/users-pg', async (req, res) => {
  try {
    const users = await User.findAll();
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
    await sequelize.sync({ alter: true });
    console.log('Database synced successfully');
  } catch (err) {
    console.error('Error syncing database:', err);
  }
});
