"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_config_1 = __importDefault(require("../../config/db-config"));
db_config_1.default
    .authenticate()
    .then(() => {
    console.log("connection was established");
})
    .catch((error) => {
    console.log("there was an error in establishing connection", error);
});
let sequelize = db_config_1.default;
const Users = (sequelize, DataTypes) => , {};
