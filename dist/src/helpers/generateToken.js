"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (findUser) => {
    const privateKey = `${process.env.SECRET_TOKEN} `;
    const { id, email, role } = findUser;
    return jsonwebtoken_1.default.sign({ id, email, role }, privateKey, {
        expiresIn: "1h",
    });
};
exports.generateToken = generateToken;
