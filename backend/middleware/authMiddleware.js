const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Middleware to protect routes (authentication)
const protect = async (req, res, next) => {
   let token;

   if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      try {
         token = req.headers.authorization.split(' ')[1];
         const decoded = jwt.verify(token, process.env.JWT_SECRET);
         req.user = await User.findById(decoded.id).select('-password');

         if (!req.user) {
            return res.status(401).json({ message: 'Not authorized, user not found' });
         }

         next();
      } catch (error) {
         res.status(401).json({ message: 'Not authorized, token failed' });
      }
   } else {
      res.status(401).json({ message: 'Not authorized, no token' });
   }
};

// Middleware to check for specific roles (authorization)
const authorize = (...roles) => {
   return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
         return res.status(403).json({ message: `Role ${req.user.role} is not authorized to access this resource` });
      }
      next();
   };
};

module.exports = { protect, authorize };
 