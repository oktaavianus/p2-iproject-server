'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HistoryProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      HistoryProduct.belongsTo(models.Product, {foreignKey: "ProductId"})
    }
  }
  HistoryProduct.init({
    ProductId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    updatedBy: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'HistoryProduct',
  });
  return HistoryProduct;
};