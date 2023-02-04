"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_config_1 = __importDefault(require("../../config/db-config"));
const sequelize_1 = require("sequelize");
const OTPModel = db_config_1.default.define("Otp", {
    id: {
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
    },
    otp: {
        type: sequelize_1.DataTypes.INTEGER(),
        allowNull: false,
    },
    expiresIn: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    mobile: {
        type: sequelize_1.DataTypes.INTEGER(),
        allowNull: false,
    },
});
exports.default = OTPModel;
