const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const transferRoute = require('./routes/transfer');
const authRoutes = require('./routes/auth');
const accountRoutes = require('./routes/account');
const userRoutes = require('./routes/user');
const updateRoutes = require('./routes/update');
const checkDepositRoute = require('./routes/checkDeposit');
const { upload } = require('../middleware/uploadMiddleware');
const pool = require('./db'); // importing the pool from db.js for PostgreSQL

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// API Routes
app.use('/api', transferRoute);
app.use('/api/auth', authRoutes);
app.use('/api/accounts', accountRoutes);
app.use('/api/users', userRoutes);
app.use('/api/update', updateRoutes);
app.use('/api/check-deposit', checkDepositRoute);
app.use('/api/upload-middleware', uploadMiddleware);

// Example route to fetch data from PostgreSQL
app.get('/users-pg', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// Root Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
