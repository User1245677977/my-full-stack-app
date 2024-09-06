const multer = require('multer');
const path = require('path');

// Set up storage engine
const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, 'uploads/');
   },
   filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
   },
});

// Check file type
const checkFileType = (file, cb) => {
   const filetypes = /jpeg|jpg|png/;
   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
   const mimetype = filetypes.test(file.mimetype);

   if (extname && mimetype) {
      return cb(null, true);
   } else {
      cb('Error: Images Only!');
   }
};

// Initialize upload
const upload = multer({
   storage: storage,
   fileFilter: (req, file, cb) => {
      checkFileType(file, cb);
   },
});

module.exports = upload;
