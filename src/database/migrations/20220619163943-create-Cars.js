'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
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
    }
    },
    {
      timestamps: true
    }
    
);
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.dropTable('Cars');
  }
};
