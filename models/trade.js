module.exports = (sequelize, DataTypes) => {
    const Trade = sequelize.define("Trade", {
      price: DataTypes.FLOAT,
      amount: DataTypes.FLOAT,
      status: DataTypes.STRING,
      traded_at: DataTypes.DATE,
    });
    Trade.associate = (models) => {
      Trade.belongsTo(models.Order, { as: "buy_order", foreignKey: "buy_order_id" });
      Trade.belongsTo(models.Order, { as: "sell_order", foreignKey: "sell_order_id" });
    };
    return Trade;
  };