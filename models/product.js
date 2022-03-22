'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category, {foreignKey: "CategoryId"})
      Product.belongsToMany(models.User, {foreignKey: "ProductId", through: models.Cart})
      Product.hasMany(models.HistoryProduct, {foreignKey: "ProductId"})
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Title is require"
        },
        notNull: {
          msg: "Title is require"
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Description is require"
        },
        notNull: {
          msg: "Description is require"
        }
      }},
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Image Url is require"
        },
        notNull: {
          msg: "Image Url is require"
        }
      }},
    UserId: DataTypes.INTEGER,
    CategoryId: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};