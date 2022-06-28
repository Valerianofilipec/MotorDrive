'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('DriverInfo', {
      userId:{
        type: Sequelize.INTEGER,
        primaryKey:true,//!?
        allowNull: false,
        notEmppty: true,
        references:{
          model:'User',
          key:'id',
          as: 'userId'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      home_location:{
        type: Sequelize.STRING,
        allowNull: false,
        notEmppty: true,
      }
     });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('DrverInfo');
  }
};
