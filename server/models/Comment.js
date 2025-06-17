const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Comment = sequelize.define('Comment', {
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  PostId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'comments',
  timestamps: true
});

module.exports = Comment;
