const {Cart, Product, User, HistoryCart} = require('../models/index');

class ControllerCart {
  static async postCart (req, res, next) {
    // console.log('masuk post Cart');
    try {
      const ProductId = req.params.ProductId
      const UserId = req.userCres.id
      const productFound = await Product.findByPk(ProductId)
      if(!productFound) {
        throw {
          name: "Not Found",
          msg: "Product Not Found"
        }
      }
      // console.log(productFound, 'ini product found');
      // console.log(UserId, 'ini user id');
      const userFound = await User.findOne({
        where: {
          id: UserId
        }
      })
      const findCart = await Cart.findOne({
        where:{
            ProductId,
            UserId
        }
      })
      if(!findCart) {
        const cart = await Cart.create({
          UserId,
          ProductId,
          status: "Uncheckout"
        });
        console.log(cart.dataValues.id, 'ini cart id');
        await HistoryCart.create({
          CartId : cart.dataValues.id,
          title: productFound.name,
          description: `Products ${productFound.name} add to Cart`,
          updatedBy: userFound.name
        })
        // console.log(cart.id, 'ini cart id');
        res.status(201).json({
          message: `Product ${productFound.name} has been add to Cart`
        })
      } else {
        throw {
          name: "Bad Request",
          msg: `Product ${productFound.name} aleready add to cart`
        }
      }
      // console.log(Cart);
      // console.log(NewsId, UserId);
    } catch (err) {
      // console.log(err, 'ini errror controller post Cart');
      next(err)
    }
  }

  static async getCartByUserId (req, res, next) {
    // console.log('MASUK BOOKMARK');
    // console.log(req.userCres);
    try {
      // console.log("masuk bookmark pub");
      const UserId = req.userCres.id
      // console.log(UserId);
      let result = await Cart.findAll({
        where : {
          UserId
        },
        include : {
          model: Product
        }
      })
      // console.log(result);
      res.status(200).json(result)
      // console.log(result);
    } catch (err) {
      // console.log(err);
      next(err)
    }
  }

  static async deleteProductFromCart(req, res, next) {
    console.log('masuk delete by id');
    try {
      const id = req.params.ProductId;
      // console.log(req.params, 'ini id');
      let ProductByPk = await Product.findOne({
        where:{
          id
        }
      });
      // console.log(ProductByPk.name, 'ini product by pk');
      if (!ProductByPk) {
        throw {
          name: "Not Found",
          message: "Product not Found",
        };
      } else {
        await Cart.destroy({ where: { id: id } });
        res.status(200).json({
          message: `Product ${ProductByPk.name} remove from your cart`,
        });
      }
    } catch (err) {
      // console.log(err);
      next(err);
    }
  }
  
}
module.exports = ControllerCart