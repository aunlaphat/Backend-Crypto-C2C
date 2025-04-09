module.exports = (sequelize, DataTypes) => {
    const Wallet = sequelize.define("Wallet", {
      user_id: DataTypes.INTEGER,
      currency: DataTypes.STRING,
      balance: DataTypes.FLOAT,  // ✅ เก็บยอดคงเหลือ
    });
    Wallet.associate = (models) => {
      Wallet.belongsTo(models.User, { foreignKey: "user_id" });
    };
    return Wallet;
  };