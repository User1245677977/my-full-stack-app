// routes/checkDeposit.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { uploadMiddleware } = require('../middleware/uploadMiddleware'); // Use the correct named export

// Initial simple route for check deposit
router.post('/', (req, res) => {
  res.send('Check deposit route working!');
});

// Enhanced check deposit route with authentication and file upload
router.post('/upload', protect, uploadMiddleware.single('checkImage'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Assuming `req.user` is populated by the `protect` middleware
    req.user.checkImages = req.user.checkImages || [];
    req.user.checkImages.push(req.file.path);
    await req.user.save();

    res.status(200).json({ message: 'Check deposited successfully', filePath: req.file.path });
  } catch (error) {
    console.error('File upload error:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;
