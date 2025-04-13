module.exports = (sequelize, DataTypes) => {
  const Wallet = sequelize.define('Wallet', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cryptoType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    balance: {
      type: DataTypes.FLOAT,
      defaultValue: 0
    }
  }, {
    timestamps: true
  });

  Wallet.associate = function(models) {
    Wallet.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return Wallet;
};
