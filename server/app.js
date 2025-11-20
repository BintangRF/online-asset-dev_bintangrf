import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sequelize } from "./db.js";
import userRoutes from "./routes/users.js";
import productRoutes from "./routes/products.js";

dotenv.config();
const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("API is running");
});

sequelize.sync().then(() => {
  console.log("Database connected and synced");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
