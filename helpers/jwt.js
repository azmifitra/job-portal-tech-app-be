const jwt = require('jsonwebtoken');

const signToken = (payload) => {
  return jwt.sign(payload, 'ini_rahasia');
};

const verifyToken = (token) => {
  return jwt.verify(token, 'ini_rahasia');
};

module.exports = { signToken, verifyToken };
