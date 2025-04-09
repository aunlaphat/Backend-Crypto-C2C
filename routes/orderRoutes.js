const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.post("/create", orderController.createOrder);
router.post("/match", orderController.matchOrder);
router.get("/", orderController.getAllOrders);
router.get("/user/:id", orderController.getOrdersByUser);

module.exports = router;