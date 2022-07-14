'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Car', { 
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      brand: {
          type: Sequelize.STRING,
          notEmpty: true,
          allowNull: false
      },
      model: {
          type: Sequelize.STRING,
          notEmpty: true,
          allowNull: false
      },
      plate_number: {
          type: Sequelize.STRING,
          allowNull: false,
          notEmpty: true,
          unique: true,
      },
      UserId: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        allowNull: true,
        default:null,
        references: {
            model: 'User',
            key: 'id',
            as: 'UserId'
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      },
      longitude:{
        type: Sequelize.DECIMAL,
        defaultValue:41.1663061,
        allowNull: false
      },
      latitude:{
        type: Sequelize.DECIMAL,
        defaultValue:-8.6490692,
        allowNull: false
      },
      createdAt:{
          type: Sequelize.DATE,
          allowNull: false
      },
      updatedAt: {
          type: Sequelize.DATE,
          allowNull: false
      }
      },
      {
        timestamps: true,
        freezeTableName: true,
      }
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Car');
  }
};
