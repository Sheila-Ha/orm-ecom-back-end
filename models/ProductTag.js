const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");
const { INTEGER } = require("sequelize");

class ProductTag extends Model {}

ProductTag.init(
  //Define fields/columns on model
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      reference: {
        model: "product",
        key: "id",
      },
    },
    tag_id: DataTypes.INTEGER,
    reference: {
      model: "tag",
      key: "id",
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "product_tag",
  }
);

module.exports = ProductTag;
