import express from "express";
import { Product } from "../models/product.js";
import { buildQueryOptions } from "../utils/queryOptions.js";
import { col, fn, where } from "sequelize";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const options = buildQueryOptions(req.query, ["name", "category"]);
    const { rows, count } = await Product.findAndCountAll(options);

    res.status(200).json({
      data: rows,
      total: count,
      page: options.page,
      limit: options.limit,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, price, category } = req.body;

    const existed = await Product.findOne({
      where: where(fn("LOWER", col("name")), fn("LOWER", name)),
    });

    if (existed) {
      return res.status(409).json({ message: "Product name already exists" });
    }

    const product = await Product.create({ name, price, category });
    res.json({ product, message: "Product created successfully!" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { name, price, category } = req.body;
    const { id } = req.params;

    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (name && name !== product.name) {
      const existed = await Product.findOne({
        where: where(fn("LOWER", col("name")), fn("LOWER", name)),
      });

      if (existed) {
        return res.status(409).json({ message: "Product name already exists" });
      }
    }

    await product.update({ name, price, category });
    res.status(200).json({ product, message: "Product updated successfully!" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    await product.destroy();
    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product" });
  }
});

export default router;
