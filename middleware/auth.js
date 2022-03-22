const { readPayload } = require("../helper/jwt");

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    if (!access_token) {
      throw {
        name: "Unauthorized",
        code: 401,
        message: "Access Token Not Found",
      };
    }
    const payload = readPayload(access_token);
    const userLogin = await User.findByPk(payload.id);
    if (!userLogin) {
      throw {
        name: "Unauthorized",
        code: 401,
        message: "Invalid Email or Password",
      };
    }
    req.userCres = {
      id: userLogin.id,
      role: userLogin.role,
      name : userLogin.name
    };
    next();
  } catch (err) {
    next(err)
  }
};

module.exports = {
  authentication
}