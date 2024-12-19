//account.js

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Import the correct models
const User = require('../models/user');
const Transaction = require('../models/Transaction');

// Import middleware
const { protect } = require('../middleware/authMiddleware');
const uploadMiddleware = require('../middleware/uploadMiddleware'); // Ensure only one import statement without curly braces

// Helper function to get withdrawal limit based on account type
const getWithdrawalLimit = (accountType) => {
  switch (accountType) {
    case 'savings':
      return 1000;
    case 'checking':
      return 2000;
    case 'business':
      return 5000;
    default:
      return 0;
  }
};

// Create Account Route
router.post('/create-account', async (req, res) => {
  console.log('Request body:', req.body); // Log the request data
  try {
    const { name, email, password, accountType } = req.body;

    // Validate the required fields
    if (!name || !email || !password || !accountType) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Create a new user
    const newUser = await User.create({
      name,
      email,
      password,
      accountType,
      balance: 0, // Default balance is 0
    });

    res.status(201).json({ message: 'Account created successfully', user: newUser });
  } catch (error) {
    console.error('Error creating account:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Check deposit route
router.post('/check-deposit', protect, uploadMiddleware.single('checkImage'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const filePath = req.file.path;
    res.status(200).json({ message: 'Check deposited successfully', filePath });
  } catch (error) {
    console.error('Error processing check deposit:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});

// Deposit money
router.post('/deposit', protect, async (req, res) => {
  const { amount } = req.body;

  try {
    req.user.balance += amount;
    await req.user.save();

    await Transaction.create({ userId: req.user._id, type: 'deposit', amount });

    res.json({ balance: req.user.balance });
  } catch (error) {
    console.error('Error processing deposit:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Withdraw money
router.post('/withdraw', protect, async (req, res) => {
  const { amount } = req.body;

  try {
    if (req.user.balance < amount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    req.user.balance -= amount;
    await req.user.save();

    await Transaction.create({ userId: req.user._id, type: 'withdraw', amount });

    res.json({ balance: req.user.balance });
  } catch (error) {
    console.error('Error processing withdrawal:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user balance
router.get('/balance', protect, (req, res) => {
  res.json({ balance: req.user.balance });
});

module.exports = router;
