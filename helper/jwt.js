if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const jwt = require('jsonwebtoken');
const keyWord = process.env.KEY

const createToken = (payload) => {
  return jwt.sign(payload, keyWord)
}

const readPayload = (token) => {
  return jwt.verify(token, keyWord)
}

module.exports = {
  createToken,
  readPayload
}