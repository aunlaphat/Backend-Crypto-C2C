const { sequelize, Wallet, Transaction } = require("../models");
const { Op } = require("sequelize");
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");
dayjs.extend(utc);
dayjs.extend(timezone);

exports.getUserTransactions = async (req, res) => {
    const { id } = req.params;
    const txs = await Transaction.findAll({
      where: {
        [Op.or]: [
          { from_user_id: id },
          { to_user_id: id }
        ]
      },
      order: [["created_at", "DESC"]]
    });
  
    res.json(txs);
};
  

exports.transfer = async (req, res) => {
    const t = await sequelize.transaction(); // ✅ เริ่ม Transaction

    try {
        const { from_user_id, to_user_id, currency, amount, type, tx_hash } = req.body;

        // 1. ตรวจสอบกระเป๋าผู้ส่ง
        const senderWallet = await Wallet.findOne({ where: { user_id: from_user_id, currency }, transaction: t });
        if (!senderWallet || senderWallet.balance < amount) {
        throw new Error("Insufficient funds");
        }

        // 2. หักยอดผู้ส่ง
        senderWallet.balance -= amount;
        await senderWallet.save({ transaction: t });

        // 3. เติมยอดผู้รับ
        let receiverWallet = await Wallet.findOne({ where: { user_id: to_user_id, currency }, transaction: t });

        if (!receiverWallet) {
          // ✅ ถ้าไม่มี → สร้างกระเป๋าพร้อมยอดเริ่มต้น
          receiverWallet = await Wallet.create({
            user_id: to_user_id,
            currency,
            balance: amount
          }, { transaction: t });
        } else {
          // ✅ ถ้ามี → เติมยอด
          receiverWallet.balance += amount;
          await receiverWallet.save({ transaction: t });
        }

        // 4. สร้าง record การโอน
        await Transaction.create({
            from_user_id,
            to_user_id,
            currency,
            amount,
            type,
            tx_hash: tx_hash || null,
            created_at: dayjs().tz("Asia/Bangkok").format("YYYY-MM-DD HH:mm:ss")
        }, { transaction: t });
    
        // ✅ สำเร็จ → commit
        await t.commit();
        res.json({ message: "Transfer success" });

    } catch (error) {
        await t.rollback(); // ❌ เกิด error → rollback
        console.error(error);
        res.status(500).json({ message: "Transfer failed", error: error.message });
    }
  };