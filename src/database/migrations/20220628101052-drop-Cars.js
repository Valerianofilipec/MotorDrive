'use strict';

module.exports = {
  async down (queryInterface, Sequelize) {
    await queryInterface.createTable('Cars', { 
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
        defaultValue: 'AAA-0000'
    },
    geolocation: {
        type: Sequelize.GEOMETRY('POINT'),
        allowNull: false,
        notEmpty: true,
        //defaultValue: Point(41.1663061,-8.6490692)//coordanates of the company
    },
    available: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        notEmpty: true,
    },
    createdAt:{
        type: Sequelize.DATE,
        allowNull: false
    },
    updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
    },
    driverId: { 
      type: Sequelize.INTEGER,
      defaultValue: null,
      allowNull: true,
      references: {
        model: 'Drivers',
        key: 'id',
        as: 'driverId',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    }
    },
    {
      timestamps: true
    }
    
);
  },

  async up (queryInterface, Sequelize) {
    return await queryInterface.dropTable('Cars');
  }
};
