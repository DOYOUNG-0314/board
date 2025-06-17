const jwt = require('jsonwebtoken');
const SECRET_KEY = 'mysecretkey';

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: '토큰이 없습니다.' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: '토큰이 유효하지 않습니다.' });
  }
};

module.exports = authenticate;
