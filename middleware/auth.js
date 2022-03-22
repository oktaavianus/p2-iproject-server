const { readPayload } = require("../helper/jwt");
const { User, Product } = require("../models/index");

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    if (!access_token) {
      throw {
        name: "Bad Request",
        msg: "Access Token Not Found",
      };
    }
    const payload = readPayload(access_token);
    const userLogin = await User.findByPk(payload.id);
    if (!userLogin) {
      throw {
        name: "Bad Request",
        msg: "Invalid Email or Password",
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

const authorization = async (req, res, next) => {
  try {
    const id = req.params.ProductId;
    // console.log(id, 'ini id');
    // console.log(req.userCres, 'ini user cres');
    const UserId = req.userCres.id;
    const foundProduct = await Product.findByPk(id);
    // console.log(foundProduct, 'ini found product');
    if(!foundProduct) {
      throw{
        name: "Not Found",
        msg: "Product not found"
      }
    }

    if (UserId !== foundProduct.UserId) {
      throw {
        name: "Forbidden",
        msg: "Cannot access",
      };
    }
    next();
  } catch (err) {
    // console.log(err);
    next(err)
  }
};

const authorizationAdmin = async (req, res, next) => {
  try {
    const ProductId = req.params.ProductId;
    const role = req.userCres.role;
    // console.log(role, 'ini role user cres');
    if (role === "Admin") {
      const foundProduct = await Product.findOne({
        where: {
          id: ProductId,
        },
      });

      if (!foundProduct) {
        throw {
          name: "Not Found",
          msg: "Product not found",
        };
      }
    } else {
      throw {
        name: "Forbidden",
        msg: "Cannot access",
      };
    }
    next();
  } catch (err) {
    // console.log(err, 'ini error authZ admin');
    next(err)
  }
};

module.exports = {
  authentication,
  authorization,
  authorizationAdmin
}