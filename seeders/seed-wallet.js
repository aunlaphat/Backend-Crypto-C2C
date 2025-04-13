module.exports = {
    async up(queryInterface, Sequelize) {
      await queryInterface.bulkInsert('Wallets', [
        { userId: 1, cryptoType: 'BTC', balance: 2, createdAt: new Date(), updatedAt: new Date() },
        { userId: 2, cryptoType: 'BTC', balance: 1, createdAt: new Date(), updatedAt: new Date() },
        { userId: 1, cryptoType: 'ETH', balance: 5, createdAt: new Date(), updatedAt: new Date() },
        { userId: 2, cryptoType: 'ETH', balance: 3, createdAt: new Date(), updatedAt: new Date() }
      ], {});
    },
  
    async down(queryInterface, Sequelize) {
      await queryInterface.bulkDelete('Wallets', null, {});
    }
  };
  