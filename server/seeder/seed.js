import { sequelize } from "../db.js";
import { seedUsers } from "./userSeed.js";
import { seedProducts } from "./productSeed.js";

const seed = async () => {
  await sequelize.sync({ force: true });

  await seedUsers();
  await seedProducts();

  console.log("Seeding done");
  process.exit();
};

seed();
