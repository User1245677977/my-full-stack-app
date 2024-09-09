const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect } = require('../middleware/authMiddleware');
const mongoose = require('mongoose');

router.post('/transfer', protect, async (req, res) => {
   const { senderId, recipientId, amount } = req.body;

   // Check for missing or invalid data
   if (!senderId || !recipientId || !amount || amount <= 0) {
      return res.status(400).json({ error: 'Invalid transfer data' });
   }

   // Validate if senderId and recipientId are valid ObjectIds
   if (!mongoose.Types.ObjectId.isValid(senderId) || !mongoose.Types.ObjectId.isValid(recipientId)) {
      return res.status(400).json({ error: 'Invalid sender or recipient ID' });
   }

   try {
      // Fetch sender and recipient
      const sender = await User.findById(senderId);
      const recipient = await User.findById(recipientId);

      // Check if both users exist
      if (!sender || !recipient) {
         return res.status(404).json({ error: 'Sender or recipient not found' });
      }

      // Ensure sender has sufficient balance
      if (sender.balance < amount) {
         return res.status(400).json({ error: 'Insufficient funds' });
      }

      // Perform the transfer
      sender.balance -= amount;
      recipient.balance += amount;

      await sender.save();
      await recipient.save();

      res.status(200).json({ message: 'Transfer successful' });
   } catch (error) {
      res.status(500).json({ error: 'Server error' });
   }
});

module.exports = router;