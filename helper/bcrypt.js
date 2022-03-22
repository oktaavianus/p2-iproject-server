const bcrypt = require('bcrypt');

const hashPassword = (plaintext) => {
  return bcrypt.hashSync(plaintext, 10);
}

const comparePassword = (password, hash) => {
  return bcrypt.compareSync(password, hash)
}

module.exports = {
  hashPassword,
  comparePassword
}