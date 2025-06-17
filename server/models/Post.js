const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Post = sequelize.define('Post', {
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  UserId: { 
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'posts',
  timestamps: true
});

module.exports = Post;
