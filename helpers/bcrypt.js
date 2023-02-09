const bcrypt = require('bcryptjs');

function hashPassword(password) {
  let salt = bcrypt.genSaltSync(8);
  let hash = bcrypt.hashSync(password, salt);

  return hash;
}

function comparePassword(password, hashPassword) {
  let comparePass = bcrypt.compareSync(password, hashPassword);

  return comparePass;
}

module.exports = { hashPassword, comparePassword };
