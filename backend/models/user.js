const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const { sequelize } = require('../db');

// Define the User model using Sequelize
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  balance: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'customer',
  },
  check_images: {
    type: DataTypes.JSON,  // Use JSON instead of ARRAY for MySQL compatibility
    allowNull: true,
  },
}, {
  tableName: 'users',
  timestamps: true, // Automatically manage createdAt and updatedAt fields
});

// Hook to hash password before saving a new user
User.beforeCreate(async (user) => {
  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    return user;
  } catch (error) {
    throw new Error('Error while hashing password during creation');
  }
});

// Hook to hash password before updating, if changed
User.beforeUpdate(async (user) => {
  if (user.changed('password')) {
    try {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      return user;
    } catch (error) {
      throw new Error('Error while hashing password during update');
    }
  }
});

// Method to compare entered password with stored hashed password
User.prototype.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = User;
