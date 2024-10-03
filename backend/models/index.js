// backend/models/index.js
const User = require('./user'); // Adjust the path if your User model file name is different
const Transaction = require('./Transaction'); // Adjust the path if your Transaction model file name is different

// Export the models
module.exports = {
  User,
  Transaction,
};
