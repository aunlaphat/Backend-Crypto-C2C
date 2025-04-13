module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Transactions', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      fromUserId: { type: Sequelize.INTEGER },
      toUserId: { type: Sequelize.INTEGER },
      transactionType: { type: Sequelize.STRING, allowNull: false }, // deposit / withdraw / buy / sell / transfer-internal / transfer-external
      cryptoType: { type: Sequelize.STRING, allowNull: false },
      amount: { type: Sequelize.FLOAT, allowNull: false },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Transactions');
  }
};
