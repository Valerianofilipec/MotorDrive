"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverInfo = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const User_1 = require("./User");
let DriverInfo = class DriverInfo extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => User_1.User, 'UserId'),
    __metadata("design:type", User_1.User)
], DriverInfo.prototype, "User", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => User_1.User),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true }),
    __metadata("design:type", Number)
], DriverInfo.prototype, "UserId", void 0);
__decorate([
    sequelize_typescript_1.NotEmpty,
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false }),
    __metadata("design:type", String)
], DriverInfo.prototype, "home_location", void 0);
DriverInfo = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'DriverInfo',
        timestamps: false,
        freezeTableName: true,
    })
], DriverInfo);
exports.DriverInfo = DriverInfo;
