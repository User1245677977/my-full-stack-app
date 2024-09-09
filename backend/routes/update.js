// routes/user.js
const express = require('express');
const User = require('../models/user');
const { protect } = require('../middleware/authMiddleware');
const bcrypt = require('bcryptjs');
const router = express.Router();

// Update user profile
router.put('/profile', protect, async (req, res) => {
   const { name, password } = req.body;

   try {
      const user = await User.findById(req.user._id);

      if (!user) {
         return res.status(404).json({ message: 'User not found' });
      }

      if (name) {
         user.name = name;
      }

      if (password) {
         const salt = await bcrypt.genSalt(10);
         user.password = await bcrypt.hash(password, salt);
      }

      const updatedUser = await user.save();

      res.json({
         _id: updatedUser._id,
         name: updatedUser.name,
         email: updatedUser.email,
         balance: updatedUser.balance,
         role: updatedUser.role,
      });
   } catch (error) {
      res.status(500).json({ message: 'Server error' });
   }
});

module.exports = router;
