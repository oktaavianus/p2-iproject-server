const { User } = require("../models/index");
const { comparePassword } = require("../helper/bcrypt");
const { createToken } = require("../helper/jwt");

class ControllerLogin {
  static async postLogin(req, res, next) {
    try {
      const {email, password} = req.body
      if(!email) {
        throw{
          name: "Bad Request",
          msg: "Email is required"
        }
      }
      if(!password) {
        throw{
          name: "Bad Request",
          msg: "Password is required"
        }
      }
      const userFind = await User.findOne({
        where: {email}
      })
      if(!userFind || !comparePassword(password, userFind.password)) {
        throw {
          name: "Unauthorized",
          msg: "Invalid email/password"
        }
      }
      const payload = {id: userFind.id}
      const access_token = createToken(payload)
      res.status(200).json({
        access_token,
        id: userFind.id,
        role: userFind.role
      })
    } catch(err) {
      console.log(err);
      next(err)
    }
  }
}

module.exports = ControllerLogin