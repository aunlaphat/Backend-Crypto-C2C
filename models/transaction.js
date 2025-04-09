module.exports = (sequelize, DataTypes) => {
    const Transaction = sequelize.define("Transaction", {
      from_user_id: DataTypes.INTEGER,
      to_user_id: DataTypes.INTEGER,
      currency: DataTypes.STRING,
      amount: DataTypes.FLOAT,
      type: DataTypes.STRING,
      tx_hash: DataTypes.STRING,
      created_at: DataTypes.DATE,
    }, {
        timestamps: false,
    });
    Transaction.associate = (models) => {
      Transaction.belongsTo(models.User, { as: "sender", foreignKey: "from_user_id" });
      Transaction.belongsTo(models.User, { as: "receiver", foreignKey: "to_user_id" });
    };
    return Transaction;
  };