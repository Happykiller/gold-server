'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Accounts', [{
      label: 'Seed',
      creatorId: 1,
      createdAt: new Date()
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Accounts', {label: 'Seed'}, {});
  }
};
