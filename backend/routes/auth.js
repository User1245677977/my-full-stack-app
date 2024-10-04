// routes/auth.js

const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Ensure User model path is correct
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../db');  // Adjust this path as needed based on your project structure

// Determine the base API URL for production or local environments
const apiUrl = process.env.NODE_ENV === 'production'
  ? 'https://your-app-name.herokuapp.com'
  : 'http://localhost:5000';

// Function to generate a random account number
function generateAccountNumber() {
  return Math.floor(1000000000 + Math.random() * 9000000000); // Generates a 10-digit account number
}

// Register a new user
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Generate a new account number for the user
    const accountNumber = generateAccountNumber();

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create the new user with a hashed password and account number
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      accountNumber,
      balance: 0,  // Set the initial balance to 0
    });

    // Generate a JWT token for the user
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // Send a response with the token and account number
    res.status(201).json({ token, accountNumber });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login a user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token for the user
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // Send the response with the user data and token
    res.json({
      token,
      user: {
        name: user.name,
        email: user.email,
        balance: user.balance,
        role: user.role,
        accountNumber: user.accountNumber, // Include account number in the response
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
