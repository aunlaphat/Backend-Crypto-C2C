const express = require("express");
const walletRouter = express.Router();
const walletController = require("../controllers/walletController");

walletRouter.get("/:id", walletController.getWalletByUserId);
module.exports = walletRouter;