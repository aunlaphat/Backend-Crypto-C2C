const { Order, Trade, User, sequelize } = require("../models");
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');

dayjs.extend(utc);
dayjs.extend(timezone);

// สร้างคำสั่งซื้อ รับข้อมูลจาก req.body ที่ส่งมา, เพิ่มสถานะเริ่มต้นเป็น open, กำหนดเวลาสร้างและอัปเดตเป็นเวลาปที่ทำรายการ
// หลังสร้างจะส่งข้อมูลกลับไปหน้า client ในรูปแบบ JSON ผ่าน res.json(order) ที่กำหนดไว้
exports.createOrder = async (req, res) => {
    const order = await Order.create({ 
        ...req.body, 
        status: "OPEN",
        created_at: dayjs().tz('Asia/Bangkok').format('YYYY-MM-DD HH:mm:ss'),
        updated_at: dayjs().tz('Asia/Bangkok').format('YYYY-MM-DD HH:mm:ss')
     });
    res.json(order); 
};

// ใช้สำหรับจับคู่คำสั่งซื้อ (buyOrder) และคำสั่งขาย (sellOrder) ที่รับมาจาก req.body (ข้อมูลที่ส่งมาจาก client), ใช้ Order.findByPk() เพื่อค้นหาคำสั่งซื้อและขายตาม id ที่ส่งมา
// หาก match สำเร็จจะแจ้งเตือนกลับไปยัง client
exports.matchOrder = async (req, res) => {
    const t = await sequelize.transaction(); // ✅ เริ่ม Transaction

    const { buyOrderId, sellOrderId } = req.body;
    const buyOrder = await Order.findByPk(buyOrderId);
    const sellOrder = await Order.findByPk(sellOrderId);

    try {
        const { buyOrderId, sellOrderId } = req.body;
        const buyOrder = await Order.findByPk(buyOrderId, { transaction: t });
        const sellOrder = await Order.findByPk(sellOrderId, { transaction: t });
    
        if (!buyOrder || !sellOrder || buyOrder.status !== "OPEN" || sellOrder.status !== "OPEN") {
          throw new Error("Invalid or unmatched orders");
        }
    
        await Trade.create({
          buy_order_id: buyOrder.id,
          sell_order_id: sellOrder.id,
          price: sellOrder.price_per_unit,
          amount: Math.min(buyOrder.amount, sellOrder.amount),
          status: "COMPLETED",
          traded_at: new Date()
        }, { transaction: t });
    
        buyOrder.status = "MATCHED";
        sellOrder.status = "MATCHED";
        await buyOrder.save({ transaction: t });
        await sellOrder.save({ transaction: t });
    
        await t.commit(); // ✅ สำเร็จ → commit
        res.json({ message: "Trade matched successfully" });
    
      } catch (error) {
        await t.rollback(); // ❌ ล้มเหลว → ย้อนกลับทั้งหมด
        console.error(error);
        res.status(500).json({ message: "Match failed", error: error.message });
      }
};

exports.getAllOrders = async (req, res) => {
    const orders = await Order.findAll();
    res.json(orders);
};
  
exports.getOrdersByUser = async (req, res) => {
    const { id } = req.params;
    const orders = await Order.findAll({ where: { user_id: id } });
    res.json(orders);
};