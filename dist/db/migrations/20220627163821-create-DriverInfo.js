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
            yield queryInterface.createTable('DriverInfo', {
                id: {
                    type: Sequelize.INTEGER,
                    autoIncrement: true,
                    allowNull: false,
                    primaryKey: true
                },
                UserId: {
                    type: Sequelize.INTEGER,
                    foreignKey: true,
                    allowNull: true,
                    references: {
                        model: 'User',
                        key: 'id',
                        as: 'userId'
                    },
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE'
                },
                home_location: {
                    type: Sequelize.STRING,
                    allowNull: false,
                    notEmppty: true,
                }
            }, {
                freezeTableName: true,
                timestamps: false,
            });
        });
    },
    down(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.dropTable('DriverInfo');
        });
    }
};
