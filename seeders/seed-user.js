'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash('password123', 10);

    await queryInterface.bulkInsert('Users', [
      {
        username: 'testuser1',
        email: 'test1@example.com',
        password: hashedPassword,
        fiat_balance_THB: 10000, 
        fiat_balance_USD: 500,  
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'testuser2',
        email: 'test2@example.com',
        password: hashedPassword,
        fiat_balance_THB: 5000, 
        fiat_balance_USD: 100,  
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
