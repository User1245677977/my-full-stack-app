// server.js
const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const { connectDB, sequelize } = require('./db');

// Import your routes
const transferRoutes = require('./routes/transfer');
const authRoutes = require('./routes/auth'); // Ensure authRoutes is properly defined and exported
const accountRoutes = require('./routes/account'); // Ensure accountRoutes is properly defined and exported
const updateRoutes = require('./routes/update');
const checkDepositRoutes = require('./routes/checkDeposit'); // Ensure checkDepositRoutes is properly defined and exported

// Import middleware
const { uploadMiddleware } = require('./middleware/uploadMiddleware');
const authMiddleware = require('./middleware/authMiddleware'); // Ensure authMiddleware is properly defined and exported

dotenv.config();

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

// Middleware Route Example (if needed)
app.use('/api/upload-middleware', uploadMiddleware);

// Example route with auth middleware applied
app.use('/some-route', authMiddleware, (req, res) => res.send('Some Route Protected'));

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
