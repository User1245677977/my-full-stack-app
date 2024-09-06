const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();

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

      const user = await User.create({ 
         name, 
         email, 
         password, 
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

      const isMatch = await user.matchPassword(password);

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
