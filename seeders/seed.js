const { User } = require("../models");

async function seed() {
  await User.create({
    name: "User",
    email: "user@example.com",
    password: "123456",
    fiat_balance_THB: 50000,
    fiat_balance_USD: 1000,
  });

  console.log("Seeding completed.");
}

seed();