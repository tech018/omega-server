"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    HOST: `${process.env.HOST}`,
    USER: `${process.env.DB_USERNAME}`,
    PASSWORD: `${process.env.DB_PASSWORD}`,
    DBNAME: `${process.env.DB_NAME}`,
    dialect: `${process.env.DB_DIALECT}`,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
};
exports.default = config;
