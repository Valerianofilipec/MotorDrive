'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.createTable('Geolocation', { 
      id: {
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true,
        allowNull: false,
      },
      CarId: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        allowNull: true,
        references: {
            model: 'Car',
            key: 'id',
            as: 'CarId'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    longitude:{
      type:Sequelize.DECIMAL,
      allowNull: false,
      defaultValue: 41.1663061,
    },
    latitude:{
      type:Sequelize.DECIMAL,
      allowNull: false,
      defaultValue: -8.6490692,
    }
    },{
      freezeTableName: true,
      timestamps:false,
    });

  },

  async down (queryInterface, Sequelize) {

    await queryInterface.dropTable('Geolocation');

  }
};
