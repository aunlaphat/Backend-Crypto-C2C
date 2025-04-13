module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define("Transaction", {
    fromUserId: DataTypes.INTEGER,
    toUserId: DataTypes.INTEGER,
    transactionType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cryptoType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
    timestamps: true
  });

  Transaction.associate = function(models) {
    Transaction.belongsTo(models.User, { foreignKey: 'fromUserId', as: 'FromUser' });
    Transaction.belongsTo(models.User, { foreignKey: 'toUserId', as: 'ToUser' });
  };

  return Transaction;
};
