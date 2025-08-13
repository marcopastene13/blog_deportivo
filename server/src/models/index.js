// server/src/models/index.js
const sequelize = require('../config/database');

const UserModel = require('./User');
const PostModel = require('./Post');
const CommentModel = require('./Comment');

// Inicializar modelos con la conexión sequelize
const User = UserModel(sequelize);
const Post = PostModel(sequelize);
const Comment = CommentModel(sequelize);

// Definir relaciones
User.hasMany(Post, { foreignKey: 'userId', onDelete: 'CASCADE' });
Post.belongsTo(User, { foreignKey: 'userId' });

Post.hasMany(Comment, { foreignKey: 'postId', onDelete: 'CASCADE' });
Comment.belongsTo(Post, { foreignKey: 'postId' });

User.hasMany(Comment, { foreignKey: 'userId', onDelete: 'CASCADE' });
Comment.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
  sequelize,
  User,
  Post,
  Comment
};
