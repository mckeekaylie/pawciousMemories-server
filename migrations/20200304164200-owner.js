'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('logs', 'owner', Sequelize.INTEGER)
  }
};
