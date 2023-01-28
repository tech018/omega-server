"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("./config"));
const dbDriver = config_1.default.dialect;
const databaseConnection = new sequelize_1.Sequelize(config_1.default.DBNAME, config_1.default.USER, config_1.default.PASSWORD, {
    host: config_1.default.HOST,
    dialect: dbDriver,
});
exports.default = databaseConnection;
