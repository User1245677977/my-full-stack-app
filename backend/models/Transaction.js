const { DataTypes } = require('sequelize');
const { sequelize } = require('../db'); // Use the correct path to `db.js`

// Define the Transaction model
const Transaction = sequelize.define('Transaction', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  accountId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'transactions',
  timestamps: true,
});

module.exports = Transaction;
