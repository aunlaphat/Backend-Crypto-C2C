module.exports = {
    async up(queryInterface, Sequelize) {
      await queryInterface.bulkInsert('Cryptos', [
        { name: 'Bitcoin', symbol: 'BTC', createdAt: new Date(), updatedAt: new Date() },
        { name: 'Ethereum', symbol: 'ETH', createdAt: new Date(), updatedAt: new Date() },
        { name: 'Ripple', symbol: 'XRP', createdAt: new Date(), updatedAt: new Date() },
        { name: 'Dogecoin', symbol: 'DOGE', createdAt: new Date(), updatedAt: new Date() }
      ], {});
    },
  
    async down(queryInterface, Sequelize) {
      await queryInterface.bulkDelete('Cryptos', null, {});
    }
  };