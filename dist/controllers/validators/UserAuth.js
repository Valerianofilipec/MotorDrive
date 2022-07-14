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
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const User_1 = require("../../models/User");
exports.default = {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            //check if user with email exists (! refatorar esta palhaçada, pois está fazendo duas buscas em tabelas diferentes)
            const user = yield User_1.User.findOne({ where: { email }, attributes: ['id', 'name', 'email', 'password', 'userType'] });
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            // check if password is correct
            const passwordMatch = yield (0, bcrypt_1.compare)(password, user.password);
            if (!passwordMatch) {
                return res.status(406).json({ error: 'Email or Password incorrect' });
            }
            // genarate token
            try {
                const token = (0, jsonwebtoken_1.sign)({ user: {
                        id: user.id,
                        email: user.email,
                        userType: user.userType
                    } }, "4602bcc8edfaf52d4bf84330f90e6e1d", {
                    expiresIn: '1h',
                });
                return res.status(200).json({ user: {
                        id: user.id,
                        email: user.email,
                        userType: user.userType,
                    }, token });
            }
            catch (error) {
                return res.status(500).json({ error: 'error Generate a token' });
            }
        });
    }
};
