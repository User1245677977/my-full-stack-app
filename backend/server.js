const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path'); // Import path module
const transferRoute = require('./routes/transfer');
const authRoutes = require('./routes/auth');
const accountRoutes = require('./routes/account');
const userRoutes = require('./routes/user'); // Import the user routes
const updateRoutes = require('./routes/update');
const checkDepositRoute = require('./routes/checkDeposit'); // Import check-deposit route
const { upload } = require('../middleware/uploadMiddleware');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// API Routes
app.use('/api', transferRoute);
app.use('/api/auth', authRoutes); // Make sure to add other routes if needed
app.use('/api/accounts', accountRoutes);
app.use('/api/users', userRoutes); // Use the user routes
app.use('/api/update', updateRoutes);
app.use('/api/check-deposit', checkDepositRoute); // Use check-deposit route
app.use('/api/upload-middleware', uploadMiddleware);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Root Route
app.get('/', (req, res) => {
   res.send('API is running...');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
