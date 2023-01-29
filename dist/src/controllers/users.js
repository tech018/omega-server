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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginAction = exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const users_1 = __importDefault(require("../models/users"));
const generateToken_1 = require("../helpers/generateToken");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, fullname, mobile, role } = req.body;
    const salt = bcrypt_1.default.genSaltSync(10);
    const passwordHash = yield bcrypt_1.default.hashSync(password, salt);
    const newUser = {
        email,
        mobile,
        fullname,
        password: passwordHash,
        role,
    };
    const findUser = yield users_1.default.findOne({ where: { email } });
    if (findUser)
        return res.status(400).json({ message: "User is already exist" });
    try {
        const user = yield users_1.default.create(newUser);
        if (user) {
            res.status(200).json({ message: `successfull registered ${fullname}` });
        }
        else {
            res.status(400).json({ message: `unable to register ${fullname}` });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.createUser = createUser;
const loginAction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const findUser = yield users_1.default.findOne({ where: { email } });
        if (!findUser)
            return res.status(400).json({ message: "Invalid Password or Email!" });
        const passwordIsValid = bcrypt_1.default.compareSync(password, findUser.password);
        if (!passwordIsValid)
            return res.status(400).json({ message: "Invalid Password or Email!" });
        res.status(200).json({ token: (0, generateToken_1.generateToken)(findUser) });
    }
    catch (error) {
        console.log("error 500", error);
        return res.status(500).json({ message: `Internal server error`, error });
    }
});
exports.loginAction = loginAction;
