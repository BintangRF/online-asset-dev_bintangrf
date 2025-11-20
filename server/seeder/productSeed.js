import { Product } from "../models/product.js";

export const seedProducts = async () => {
  await Product.bulkCreate([
    { name: "Laptop", price: 1000, category: "Electronics" },
    { name: "Phone", price: 500, category: "Electronics" },
    { name: "Tablet", price: 300, category: "Electronics" },
    { name: "Headphones", price: 50, category: "Accessories" },
    { name: "Keyboard", price: 70, category: "Accessories" },
  ]);
};
