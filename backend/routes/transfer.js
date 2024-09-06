// routes/transfer.js
const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Assuming you have a User model
const authMiddleware = require('../middleware/auth'); // Assuming you have an auth middleware

router.post('/transfer', authMiddleware, async (req, res) => {
    const { senderId, recipientId, amount } = req.body;

    if (!senderId || !recipientId || !amount || amount <= 0) {
        return res.status(400).json({ error: 'Invalid transfer data' });
    }

    try {
        // Fetch sender and recipient
        const sender = await User.findById(senderId);
        const recipient = await User.findById(recipientId);

        if (!sender || !recipient) {
            return res.status(404).json({ error: 'Sender or recipient not found' });
        }

        if (sender.balance < amount) {
            return res.status(400).json({ error: 'Insufficient funds' });
        }

        // Perform the transfer
        sender.balance -= amount;
        recipient.balance += amount;

        // Save the updated users
        await sender.save();
        await recipient.save();

        res.json({ message: 'Transfer successful', sender, recipient });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
