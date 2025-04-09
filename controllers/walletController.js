const { Wallet } = require("../models");

exports.getWalletByUserId = async (req, res) => {
  const { id } = req.params;
  const wallets = await Wallet.findAll({ where: { user_id: id } });
  res.json(wallets);
};
