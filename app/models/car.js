"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Car.init(
    {
      plate: DataTypes.STRING,
      manufacture: DataTypes.STRING,
      model: DataTypes.STRING,
      image: DataTypes.STRING,
      rentPerDay: DataTypes.INTEGER,
      capacity: DataTypes.INTEGER,
      type: DataTypes.STRING,
      year: DataTypes.STRING,
      avaliable: DataTypes.BOOLEAN,
      avaliableAt: DataTypes.DATE,
      createdBy: DataTypes.STRING,
      updatedBy: DataTypes.STRING,
      deletedBy: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Car",
      paranoid: true,
    }
  );
  return Car;
};
