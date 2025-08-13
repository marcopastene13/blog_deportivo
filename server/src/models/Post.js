// server/src/models/Post.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Post = sequelize.define('Post', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    odds: {
      type: DataTypes.JSONB, // Array u objeto con cuotas de apuestas
      allowNull: true
    }
  }, {
    tableName: 'posts',
    timestamps: true
  });

  return Post;
};
