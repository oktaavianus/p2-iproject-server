const { Product, Category, User, HistoryProduct} = require("../models/index");
const { Op } = require('sequelize');

class ControllerProduct {
  static async getAllProducts(req, res, next) {
    try {
      let {CategoryId, title, page, size} = req.query
      const getPagination = (page, size) => {
        const limit = size ? +size : 8;
        const offset = page ? (page - 1) * limit : 0;
        return { limit, offset };
      };

      const getPagingData = (data, page, limit) => {
        const { count: totalItems, rows: product } = data;
        const currentPage = page ? +page : 1;
        const totalPages = Math.ceil(totalItems / limit);
        return { totalItems, product, totalPages, currentPage };
      };

      const { limit, offset } = getPagination(page, size);
      let where = {};
      title ? (where.title = { [Op.iLike]: `%${title}%` }) : {};
      CategoryId ? (where.CategoryId = CategoryId) : {};
      where.status = "Active";

      let result = await Product.findAndCountAll({
        where: where,
        limit,
        offset,
        order: [["id", "ASC"]],
        include: [
          {
            model: User,
            attributes: ["name"],
          },
          {
            model: Category,
            attributes: ["name"],
          },
        ],
      });
      let products = getPagingData(result, page, limit);
      res.status(200).json(products);
    } catch (err) {
      next(err);
    }
  }

  static async postProducts(req, res, next) {
    // console.log('masuk post');
    try {
      const { name, description, imgUrl, CategoryId } = req.body;
      const {id} = req.userCres
      let userFound = await User.findOne({
        where: {
          id
        }
      })
      // console.log(userFound,'ini user found');
      let result = await Product.create({
        name,
        description,
        imgUrl,
        UserId: id,
        CategoryId,
        status : "Active"
      });
      if(result) {
          let history = await HistoryProduct.create({
          ProductId : result.id,
          title: result.name,
          description: `Products ${result.name} created`,
          updatedBy: userFound.name
        })
        res.status(201).json({
          message: `Success create products ${result.name}`,
          products: result,
          history: history
        });
      }
      // console.log(result);
    } catch (err) {
      // console.log(err, 'ini log error post products');
      next(err);
    }
  }

  static async getProductById(req, res, next) {
    const id = req.params.ProductId;
    try {
      let result = await Product.findOne({
        where: {
          id
        },
        include:[ 
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Category,
          attributes: ["name"],
        }
      ]
      });
      if (!result) {
        throw {
          name: "Not Found",
          msg: "Product not Found",
        };
      } else {
        res.status(200).json({Product: result});
      }
    } catch (err) {
      next(err);
    }
  }

  static async putProductById(req, res, next) {
    try {
      const id = req.params.ProductId
      // console.log(ProductId, 'ini id product');
      // console.log(id, 'ini id user')
      let userFound = await User.findOne({
        where: {
          id: req.userCres.id
        }
      })
      let productFound = await Product.findOne({
        where: {
          id
        }
      });
      if (!productFound) {
        throw {
          name: "Not Found",
          msg: "Product not Found",
        };
      } else {
        const { name, description, imgUrl, CategoryId } = req.body;
        let result = await Product.update(
          { name, description, imgUrl, UserId: req.userCres.id, CategoryId },
          {
            where: {
              id: id,
            },
          }
        );
        if(result) {
          await HistoryProduct.create({
            ProductId : id,
            title: productFound.name,
            description: `Products ${productFound.name} updated`,
            updatedBy: userFound.name
          })
        }
        res.status(200).json({ message: `Product ${productFound.name} has been updated`});
      }
    } catch(err) {
      console.log(err, 'ini error waktu update product');
      next(err)
    }
  }

  static async patchProduct(req, res, next) {
    // console.log('masuk patch');
    try {
      const id = req.params.ProductId
      // console.log(id);
      console.log(req.userCres.id, 'ini user cres');
      let foundProduct = await Product.findByPk(id)
      let userFound = await User.findOne({
        where: {
          id: req.userCres.id
        }
      })
      if(!foundProduct) {
        throw {
          name: "Not Found",
          msg: "News not found",
        };
      } else {
        const { status } = req.body
        let result = await Product.update(
          { status },
          {
            where: {
              id: id,
            },
          }
        );
        await HistoryProduct.create({
          ProductId : id,
          title: foundProduct.name,
          description: `Status for product id ${id} has been updated from ${foundProduct.status} into ${status}`,
          updatedBy: userFound.name
        })
        // console.log(status, 6666);
        res.status(200).json({ message: `Status for product id ${id} has been updated from ${foundProduct.status} into ${status}`});
      }
    } catch(err) {
      console.log(err, 'ini error patch');
      next(err)
    }
  }

  static async deleteNewsById(req, res, next) {
    // console.log('masuk delete by id');
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
        await Product.destroy({ where: { id: id } });
        res.status(200).json({
          message: `Product ${ProductByPk.name} success to delete`,
        });
      }
    } catch (err) {
      // console.log(err);
      next(err);
    }
  }
  
}
module.exports = ControllerProduct