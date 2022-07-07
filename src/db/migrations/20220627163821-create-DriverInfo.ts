'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('DriverInfo', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      UserId:{
        type: Sequelize.INTEGER,
        foreignKey: true,
        allowNull: true,
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
     },{
      freezeTableName: true,
     });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('DriverInfo');
  }
};
