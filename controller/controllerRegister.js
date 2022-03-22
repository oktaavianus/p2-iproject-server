const { User } = require("../models/index");

class ControllerRegister {
  static async postRegister (req, res, next) {
    try {
      const {email, password, name, address, phoneNumber} = req.body
      const newUser = await User.create({
        email,
        password,
        name,
        address,
        phoneNumber,
        role: "User",
      })
        res.status(201).json({
          id: newUser.id,
          email: newUser.email,
          message: `Success create Customer ${newUser.name}`
        })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = ControllerRegister