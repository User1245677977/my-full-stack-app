const apiUrl = process.env.NODE_ENV === 'production'
  ? 'https://your-app-name.herokuapp.com'
  : 'http://localhost:5000';

const express = require('express');
const user = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../db');  // Adjust the path as needed
const router = express.Router(); // Make sure to define router


// Function to generate a random account number
function generateAccountNumber() {
   return Math.floor(1000000000 + Math.random() * 9000000000); // Generates a 10-digit account number
}

// Register a new user
router.post('/register', async (req, res) => {
   const { name, email, password } = req.body;

   try {
      const userExists = await User.findOne({ email });

      if (userExists) {
         return res.status(400).json({ message: 'User already exists' });
      }

      const accountNumber = generateAccountNumber(); // Generate the account number

      const hashedPassword = await bcrypt.hash(password, 12); // Hash password before saving it
      const user = await User.create({ 
         name, 
         email, 
         password: hashedPassword, // Store hashed password
         accountNumber // Store the account number in the user document
      });

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
         expiresIn: '1h',
      });

      res.status(201).json({ token, accountNumber }); // Include the account number in the response
   } catch (error) {
      res.status(500).json({ message: 'Server error' });
   }
});

// Login a user
router.post('/login', async (req, res) => {
   const { email, password } = req.body;

   try {
      const user = await User.findOne({ email });

      if (!user) {
         return res.status(400).json({ message: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password); // Compare password

      if (!isMatch) {
         return res.status(400).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
         expiresIn: '1h',
      });

      res.json({ 
         token, 
         user: { 
            name: user.name, 
            email: user.email, 
            balance: user.balance, 
            role: user.role,
            accountNumber: user.accountNumber // Include account number in the response
         } 
      });
   } catch (error) {
      res.status(500).json({ message: 'Server error' });
   }
});

module.exports = router;
