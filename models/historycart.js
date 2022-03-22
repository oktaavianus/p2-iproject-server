'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HistoryCart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      HistoryCart.belongsTo(models.Cart, {foreignKey: "CartId"})
    }
  }
  HistoryCart.init({
    CartId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    updatedBy: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'HistoryCart',
  });
  return HistoryCart;
};