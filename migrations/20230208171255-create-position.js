'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Positions', {
      id: {
        allowNull: false,
        type: Sequelize.STRING,
        primaryKey: true,
      },
      type: {
        type: Sequelize.STRING,
      },
      url: {
        type: Sequelize.STRING,
      },
      created_at: {
        type: Sequelize.STRING,
      },
      company: {
        type: Sequelize.STRING,
      },
      company_url: {
        type: Sequelize.STRING,
      },
      location: {
        type: Sequelize.STRING,
      },
      title: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      how_to_apply: {
        type: Sequelize.TEXT,
      },
      company_logo: {
        type: Sequelize.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Positions');
  },
};
