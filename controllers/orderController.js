const { Order, Trade, User } = require("../models");

exports.createOrder = async (req, res) => {
  const order = await Order.create({ ...req.body, status: "OPEN" });
  res.json(order);
};

exports.matchOrder = async (req, res) => {
  const { buyOrderId, sellOrderId } = req.body;
  const buyOrder = await Order.findByPk(buyOrderId);
  const sellOrder = await Order.findByPk(sellOrderId);

  if (buyOrder && sellOrder && buyOrder.status === "OPEN" && sellOrder.status === "OPEN") {
    await Trade.create({
      buy_order_id: buyOrder.id,
      sell_order_id: sellOrder.id,
      price: sellOrder.price_per_unit,
      amount: Math.min(buyOrder.amount, sellOrder.amount),
      status: "COMPLETED",
      traded_at: new Date()
    });

    buyOrder.status = "MATCHED";
    sellOrder.status = "MATCHED";
    await buyOrder.save();
    await sellOrder.save();

    res.json({ message: "Trade matched successfully" });
  } else {
    res.status(400).json({ message: "Invalid or unmatched orders" });
  }
};