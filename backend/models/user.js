// Sequelize and PostgreSQL related functionality
const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();
const { sequelize } = require('../db');

// Define the Sequelize model for PostgreSQL
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  balance: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'customer',
  },
  check_images: {
    type: DataTypes.ARRAY(DataTypes.STRING), // Array of strings for storing check images
    defaultValue: [],
  },
}, {
  tableName: 'users', // Explicit table name, optional
  timestamps: true,   // Auto-manage createdAt and updatedAt fields
});

// Sequelize hook to hash password before saving
User.beforeCreate(async (user) => {
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});

User.beforeUpdate(async (user) => {
  if (user.changed('password')) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }
});

// Method to compare entered password with stored hashed password
User.prototype.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Route to update user profile using Sequelize
router.put('/profile', protect, async (req, res) => {
  const { name, password, checkImages } = req.body;

  try {
    const userId = req.user.id; // Get authenticated user's ID from middleware

    // Fetch the user from PostgreSQL using Sequelize
    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user's details if new values are provided
    if (name) user.name = name;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }
    if (checkImages && Array.isArray(checkImages)) user.check_images = checkImages;

    // Save the updated user using Sequelize's `update` method
    await user.save();

    // Return the updated user details
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      balance: user.balance,
      role: user.role,
      check_images: user.check_images,
    });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Export both the Sequelize model and the Express router
module.exports = { User, router };
