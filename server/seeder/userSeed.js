import { User } from "../models/user.js";

export const seedUsers = async () => {
  await User.bulkCreate([
    { name: "John Doe", email: "john@example.com" },
    { name: "Jane Smith", email: "jane@example.com" },
    { name: "Bob Johnson", email: "bob@example.com" },
    { name: "Alice Williams", email: "alice@example.com" },
    { name: "Charlie Brown", email: "charlie@example.com" },
  ]);
};
