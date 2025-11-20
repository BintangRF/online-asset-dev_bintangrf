import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Product = sequelize.define(
  "Product",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.DECIMAL, allowNull: false },
    category: { type: DataTypes.STRING, allowNull: false },
  },
  { timestamps: true }
);
