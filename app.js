const express = require("express");
const app = express();
const { sequelize } = require("./models");

// import routes
const orderRoutes = require("./routes/orderRoutes");
const walletRoutes = require('./routes/walletRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

app.use(express.json());

// routes
app.use("/api/orders", orderRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/transactions', transactionRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  await sequelize.sync();
  console.log(`Server running on port ${PORT}`);
});