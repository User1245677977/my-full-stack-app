const express = require('express');
const { protect } = require('../middleware/protect'); // Your auth middleware
const { upload } = require('../middleware/uploadMiddleware'); // The multer middleware
const router = express.Router();

// Initial simple route for check deposit (optional if you want to keep it)
router.post('/', (req, res) => {
  res.send('Check deposit route');
});

// Enhanced check deposit route with authentication and file upload
router.post('/check-deposit', protect, upload.single('checkImage'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Store the file path in the user's document
    req.user.checkImages = req.user.checkImages || [];
    req.user.checkImages.push(req.file.path);
    await req.user.save();

    res.status(200).json({ message: 'Check deposited successfully', filePath: req.file.path });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;
