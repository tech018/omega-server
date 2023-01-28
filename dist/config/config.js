"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    HOST: `${process.env.HOST}`,
    USER: `${process.env.USER}`,
    PASSWORD: `${process.env.PASSWORD}`,
    DBNAME: `${process.env.DBNAME}`,
    dialect: `${process.env.DIALECT}`,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
};
exports.default = config;
