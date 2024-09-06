// routes/user.js
const express = require('express');
const bcrypt = require('bcryptjs');
const pool = require('../db'); // Import PostgreSQL pool
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Update user profile
router.put('/profile', protect, async (req, res) => {
  const { name, password, checkImages } = req.body;

  try {
    const userId = req.user.id; // Get the authenticated user's ID from middleware

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

    // Update the user in the PostgreSQL database
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

module.exports = router;
