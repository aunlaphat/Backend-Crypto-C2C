const { Order, Trade, Wallet, sequelize } = require('../models');

exports.createOrder = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { userId, cryptoType, orderType, price, amount } = req.body;

    const newOrder = await Order.create({
      userId,
      cryptoType,
      orderType,
      price,
      amount,
      status: 'pending'
    }, { transaction: t });

    // หาคำสั่งฝั่งตรงข้าม
    const oppositeType = orderType === 'buy' ? 'sell' : 'buy';
    const matchOrder = await Order.findOne({
      where: {
        cryptoType,
        orderType: oppositeType,
        price,
        status: 'pending'
      },
      transaction: t
    });

    if (matchOrder) {
      // อัพเดต status order
      newOrder.status = 'completed';
      matchOrder.status = 'completed';
      await newOrder.save({ transaction: t });
      await matchOrder.save({ transaction: t });

      // สร้าง trade record
      await Trade.create({
        buy_order_id: orderType === 'buy' ? newOrder.id : matchOrder.id,
        sell_order_id: orderType === 'sell' ? newOrder.id : matchOrder.id,
        price,
        amount,
        status: 'completed',
        traded_at: new Date()
      }, { transaction: t });

      // อัพเดท wallet
      const buyerId = orderType === 'buy' ? userId : matchOrder.userId;
      const sellerId = orderType === 'sell' ? userId : matchOrder.userId;

      const buyerWallet = await Wallet.findOne({ where: { userId: buyerId, cryptoType }, transaction: t });
      const sellerWallet = await Wallet.findOne({ where: { userId: sellerId, cryptoType }, transaction: t });

      if (buyerWallet && sellerWallet) {
        sellerWallet.balance -= amount;
        buyerWallet.balance += amount;
        await sellerWallet.save({ transaction: t });
        await buyerWallet.save({ transaction: t });
      }
    }

    await t.commit();
    res.json(newOrder);
  } catch (error) {
    await t.rollback();
    res.status(500).json({ error: error.message });
  }
};

exports.listOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({ where: { status: 'pending' } });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};