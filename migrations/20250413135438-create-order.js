module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Orders', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      userId: { type: Sequelize.INTEGER, allowNull: false },
      cryptoType: { type: Sequelize.STRING, allowNull: false },
      orderType: { type: Sequelize.STRING, allowNull: false }, // buy / sell
      price: { type: Sequelize.FLOAT, allowNull: false },
      amount: { type: Sequelize.FLOAT, allowNull: false },
      status: { type: Sequelize.STRING, defaultValue: 'pending' }, // pending / completed / cancelled
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Orders');
  }
};
