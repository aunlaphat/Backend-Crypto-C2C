module.exports = (sequelize, DataTypes) => {
    const Crypto = sequelize.define('Crypto', {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      symbol: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      timestamps: true
    });
  
    return Crypto;
  };
  