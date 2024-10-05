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
