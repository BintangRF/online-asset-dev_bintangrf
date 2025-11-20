import express from "express";
import { User } from "../models/user.js";
import { buildQueryOptions } from "../utils/queryOptions.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const options = buildQueryOptions(req.query, ["name", "email"]);
    const { rows, count } = await User.findAndCountAll(options);

    res.status(200).json({
      data: rows,
      total: count,
      page: Number(req.query.page) || 1,
      limit: Number(req.query.limit) || 10,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, email } = req.body;

    const existed = await User.findOne({ where: { email } });
    if (existed) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const user = await User.create({ name, email });
    res.json({ user, message: "User created successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { name, email } = req.body;
    const { id } = req.params;

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (email && email !== user.email) {
      const existed = await User.findOne({ where: { email } });
      if (existed) {
        return res.status(409).json({ message: "Email already exists" });
      }
    }

    await user.update({ name, email });
    res.status(200).json({ user, message: "User updated successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.destroy();
    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete user" });
  }
});

export default router;
