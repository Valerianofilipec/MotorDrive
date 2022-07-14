"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManagerRepository = void 0;
const AppError_1 = require("../../../errors/AppError");
const bcrypt_1 = require("bcrypt");
const User_1 = require("../../../../models/User");
class ManagerRepository {
    create({ name, email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const passwordHash = yield (0, bcrypt_1.hash)(password, 10);
            try {
                const manager = yield User_1.User.create({
                    name,
                    email,
                    password: passwordHash,
                    userType: 'manager'
                });
                return manager;
            }
            catch (error) {
                throw new AppError_1.AppError(error.message, 500);
            }
        });
    }
}
const obj = new ManagerRepository();
exports.ManagerRepository = obj;
