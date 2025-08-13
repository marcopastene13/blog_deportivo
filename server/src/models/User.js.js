// server/src/models/User.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    // ID autoincremental por defecto con Sequelize
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true }
    },
    avatar: {
      type: DataTypes.STRING, // URL o ruta de imagen
      allowNull: true
    },
    role: {
      type: DataTypes.ENUM('admin', 'lector'),
      allowNull: false,
      defaultValue: 'lector'
    }
  }, {
    tableName: 'users',
    timestamps: true
  });

  return User;
};
