'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
module.exports = {
    up(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.createTable('Car', {
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
                    default: null,
                    references: {
                        model: 'User',
                        key: 'id',
                        as: 'UserId'
                    },
                    onDelete: 'SET NULL',
                    onUpdate: 'CASCADE'
                },
                longitude: {
                    type: Sequelize.DECIMAL,
                    defaultValue: 41.1663061,
                    allowNull: false
                },
                latitude: {
                    type: Sequelize.DECIMAL,
                    defaultValue: -8.6490692,
                    allowNull: false
                },
                createdAt: {
                    type: Sequelize.DATE,
                    allowNull: false
                },
                updatedAt: {
                    type: Sequelize.DATE,
                    allowNull: false
                }
            }, {
                timestamps: true,
                freezeTableName: true,
            });
        });
    },
    down(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.dropTable('Car');
        });
    }
};
