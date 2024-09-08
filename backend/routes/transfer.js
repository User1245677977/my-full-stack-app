const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Assuming you have a User model
const authMiddleware = require('../middleware/auth'); // Assuming you have an auth middleware
const mongoose = require('mongoose'); // To validate ObjectIds

router.post('/transfer', authMiddleware, async (req, res) => {
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

        // Save the updated users
        await sender.save();
        await recipient.save();

        // Return success response with updated balances
        res.json({ message: 'Transfer successful', senderBalance: sender.balance, recipientBalance: recipient.balance });
    } catch (error) {
        console.error('Transfer error:', error);
        res.status(500).json({ error: 'Server error during transfer' });
    }
});

module.exports = router;
