const express = require('express');
const app = express();
const port = 3000;

const userRoute = require('./routes/userRoutes');
const walletRoute = require('./routes/walletRoutes');
const orderRoute = require('./routes/orderRoutes');
const transactionRouter = require('./routes/transactionRoutes');

app.use(express.json());

app.use('/users', userRoute);
app.use('/wallets', walletRoute);
app.use('/orders', orderRoute);
app.use('/transactions', transactionRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
