const { DataTypes } = require('sequelize');
const sequelize = require('./database'); // Import the Sequelize instance

const Transaction = sequelize.define('Transaction', {
  userId: {
    type: DataTypes.INTEGER, // Use INTEGER to reference the User ID
    allowNull: false,
    references: {
      model: 'Users', // Name of the table you're referencing
      key: 'id',      // Primary key of the referenced table
    },
  },
  type: {
    type: DataTypes.ENUM('deposit', 'withdraw'), // Enum for deposit and withdraw
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT, // Store as float or decimal based on your requirements
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW, // Default to the current date and time
  },
}, {
  tableName: 'transactions', // Explicit table name, optional
  timestamps: true,         // Auto-manage createdAt and updatedAt fields
});

module.exports = Transaction;
