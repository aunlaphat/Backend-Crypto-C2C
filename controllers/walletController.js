const { Wallet, User, Transaction } = require('../models');

exports.getBalance = async (req, res) => {
  try {
    const { userId } = req.params;
    const wallets = await Wallet.findAll({ where: { userId: userId } });
    res.json(wallets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.transferCrypto = async (req, res) => {
  try {
    const { fromUserId, toUserId, cryptoType, amount } = req.body;

    const fromWallet = await Wallet.findOne({ where: { userId: fromUserId, cryptoType: cryptoType } });
    const toWallet = await Wallet.findOne({ where: { userId: toUserId, cryptoType: cryptoType } });

    if (!fromWallet || !toWallet) return res.status(404).json({ message: "Wallet not found" });
    if (fromWallet.balance < amount) return res.status(400).json({ message: "Insufficient balance" });

    fromWallet.balance -= amount;
    toWallet.balance += amount;

    await fromWallet.save();
    await toWallet.save();

    // ✅ บันทึก Transaction
    await Transaction.create({
      fromUserId,
      toUserId,
      transactionType: 'transfer-internal',
      cryptoType,
      amount,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    res.json({ message: 'Transfer successful' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.externalTransfer = async (req, res) => {
  try {
    const { fromUserId, cryptoType, amount, externalAddress } = req.body;

    const fromWallet = await Wallet.findOne({ where: { userId: fromUserId, cryptoType } });
    if (!fromWallet) return res.status(404).json({ message: "Wallet not found" });
    if (fromWallet.balance < amount) return res.status(400).json({ message: "Insufficient balance" });

    fromWallet.balance -= amount;
    await fromWallet.save();

    await Transaction.create({
      fromUserId,
      toUserId: null, // external
      transactionType: 'transfer-external',
      cryptoType,
      amount,
      tx_hash: externalAddress, // ใช้ field นี้เก็บ external address
      createdAt: new Date(),
      updatedAt: new Date()
    });

    res.json({ message: 'External transfer successful' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
