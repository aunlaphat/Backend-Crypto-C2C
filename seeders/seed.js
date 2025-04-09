const { sequelize, User, Wallet, Order } = require("../models");
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");
dayjs.extend(utc);
dayjs.extend(timezone);


async function seed() {
  await sequelize.sync({ force: true }); // reset database ทุกครั้ง

  // สร้างผู้ใช้ Alice
  const alice = await User.create({
    name: "Alice",
    email: "alice@example.com",
    password: "123456",
    fiat_balance_THB: 50000,
    fiat_balance_USD: 1000,
  });

  const bob = await User.create({
    name: "Bob",
    email: "bob@example.com",
    password: "654321",
    fiat_balance_THB: 30000,
    fiat_balance_USD: 500,
  });

  // สร้างกระเป๋าเหรียญของ Alice
  await Wallet.bulkCreate([
    { user_id: alice.id, currency: "BTC", balance: 1.5 },
    { user_id: alice.id, currency: "ETH", balance: 10 },
  ]);

  // สร้างคำสั่งขายเหรียญ
  await Order.create({
    user_id: alice.id,
    type: "SELL",
    crypto_currency: "BTC",
    price_per_unit: 1200000,
    amount: 0.5,
    status: "OPEN",
    created_at: dayjs().tz('Asia/Bangkok').format('YYYY-MM-DD HH:mm:ss'),
    updated_at: dayjs().tz('Asia/Bangkok').format('YYYY-MM-DD HH:mm:ss')
  });

  console.log("✅ Seed completed!");
}

seed();
