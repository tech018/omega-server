"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_config_1 = __importDefault(require("../../config/db-config"));
const sequelize_1 = require("sequelize");
const UserModel = db_config_1.default.define("Users", {
    id: {
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
    },
    fullname: {
        type: sequelize_1.DataTypes.STRING(255),
    },
    email: {
        type: sequelize_1.DataTypes.STRING(255),
    },
    password: {
        type: sequelize_1.DataTypes.STRING(255),
    },
    mobile: {
        type: sequelize_1.DataTypes.INTEGER,
    },
});
exports.default = UserModel;
