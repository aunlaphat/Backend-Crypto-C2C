const express = require("express");
const transactionRouter = express.Router();
const transactionController = require("../controllers/transactionController");

transactionRouter.get("/user/:id", transactionController.getUserTransactions);
transactionRouter.post("/transfer", transactionController.transfer);

module.exports = transactionRouter;