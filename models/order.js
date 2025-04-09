module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define("Order", {
      type: DataTypes.STRING,
      crypto_currency: DataTypes.STRING,
      price_per_unit: DataTypes.FLOAT,
      amount: DataTypes.FLOAT,
      status: DataTypes.STRING,
      created_at: DataTypes.STRING,  // ✅ เพิ่มของเราเอง
      updated_at: DataTypes.STRING
    }, {
        timestamps: false  // ❌ ไม่ใช้ createdAt / updatedAt แบบ auto
    });
    Order.associate = (models) => {
      Order.belongsTo(models.User, { foreignKey: 'user_id' });
    };
    return Order;
  };