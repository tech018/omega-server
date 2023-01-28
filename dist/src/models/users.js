"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_config_1 = __importDefault(require("../../config/db-config"));
const sequelize_1 = require("sequelize");
const UserModel = db_config_1.default.define("User", {
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
// async function doStuff() {
//   const instance = await UserModel.findByPk(1, {
//     rejectOnEmpty: true,
//   });
//   console.log(instance.id);
// }
// async function doStuffWithUserModel() {
//     const newUser = await User.create({
//       name: 'Johnny',
//       preferredName: 'John',
//     });
//     console.log(newUser.id, newUser.name, newUser.preferredName);
//     const foundUser = await User.findOne({ where: { name: 'Johnny' } });
//     if (foundUser === null) return;
//     console.log(foundUser.name);
//   }
