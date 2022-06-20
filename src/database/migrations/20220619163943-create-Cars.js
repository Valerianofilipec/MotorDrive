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
        unique: true
    },
    geolocation: {
        type: Sequelize.GEOMETRY('POINT'),
        allowNull: false,
        notEmpty: true
        //defaultValue: (41.1663061, -8.6490692) //coordanates of the company
    },
    available: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true, //it must be associated to a driver, when created!
    },
    createAt:{
        type: Sequelize.DATE,
        allowNull: false
    },
    updateAt: {
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
