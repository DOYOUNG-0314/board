const { Sequelize } = require('sequelize');
const authenticate = require('../middleware/auth');

// 네 DB 이름, 유저명, 비밀번호로 수정
const sequelize = new Sequelize('board', 'root', 'rlaehdud123!', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
