module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      fiat_balance_THB: DataTypes.FLOAT,
      fiat_balance_USD: DataTypes.FLOAT,
    });
  
    User.associate = (models) => {
      User.hasMany(models.Wallet);
      User.hasMany(models.Order);
      User.hasMany(models.Transaction, { foreignKey: "from_user_id" });
      User.hasMany(models.Transaction, { foreignKey: "to_user_id" });
    };
  
    return User;
  };