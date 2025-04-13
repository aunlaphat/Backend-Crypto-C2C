module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    fiat_balance_THB: {
      type: DataTypes.FLOAT,
      defaultValue: 0
    },
    fiat_balance_USD: {
      type: DataTypes.FLOAT,
      defaultValue: 0
    }
  }, {
    timestamps: true
  });

  User.associate = function(models) {
    User.hasMany(models.Wallet, { foreignKey: 'userId' });
    User.hasMany(models.Order, { foreignKey: 'userId' });
    User.hasMany(models.Transaction, { foreignKey: 'fromUserId', as: 'TransactionsFrom' });
    User.hasMany(models.Transaction, { foreignKey: 'toUserId', as: 'TransactionsTo' });
  };

  return User;
};
