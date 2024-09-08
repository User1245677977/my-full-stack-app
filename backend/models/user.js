// Mongoose and MongoDB related functionality
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the Mongoose schema for MongoDB
const userSchema = new mongoose.Schema({
   name: { type: String, required: true },
   email: { type: String, required: true, unique: true },
   password: { type: String, required: true },
   balance: { type: Number, default: 0 },
   role: { type: String, default: 'customer' },
});

// Pre-save hook to hash password before saving
userSchema.pre('save', async function(next) {
   if (!this.isModified('password')) return next();
   const salt = await bcrypt.genSalt(10);
   this.password = await bcrypt.hash(this.password, salt);
   next();
});

// Method to compare entered password with stored hashed password
userSchema.methods.matchPassword = async function(enteredPassword) {
   return await bcrypt.compare(enteredPassword, this.password);
};

// Define and export the Mongoose model
const User = mongoose.model('User', userSchema);

// Express and PostgreSQL related functionality
const express = require('express');
const pool = require('../db'); // Import PostgreSQL pool
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Route to update user profile using PostgreSQL
router.put('/profile', protect, async (req, res) => {
  const { name, password, checkImages } = req.body;

  try {
    const userId = req.user.id; // Get authenticated user's ID from middleware

    // Fetch the user from PostgreSQL
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
    const user = result.rows[0];

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    let updatedName = user.name;
    let updatedPassword = user.password;
    let updatedCheckImages = user.check_images;

    // Update the name if provided
    if (name) {
      updatedName = name;
    }

    // Update the password if provided
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updatedPassword = await bcrypt.hash(password, salt);
    }

    // Update checkImages if provided
    if (checkImages && Array.isArray(checkImages)) {
      updatedCheckImages = checkImages;
    }

    // Update the user in PostgreSQL
    const updateQuery = `
      UPDATE users
      SET name = $1, password = $2, check_images = $3
      WHERE id = $4
      RETURNING id, name, email, balance, role, check_images;
    `;
    const updatedUser = await pool.query(updateQuery, [updatedName, updatedPassword, updatedCheckImages, userId]);

    res.json(updatedUser.rows[0]);
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Export both the Mongoose model and the Express router
module.exports = { User, router };
