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
exports.resendVericationCode = exports.verifyEmail = exports.loginAction = exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const users_1 = __importDefault(require("../models/users"));
const generateToken_1 = require("../helpers/generateToken");
const sendMail_1 = require("../helpers/sendMail");
const randomGenerator_1 = require("../helpers/randomGenerator");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, fullname, mobile, role } = req.body;
    const salt = bcrypt_1.default.genSaltSync(10);
    const passwordHash = yield bcrypt_1.default.hashSync(password, salt);
    const generated = (0, randomGenerator_1.randomNumber)(6);
    const newUser = {
        email,
        mobile,
        fullname,
        password: passwordHash,
        role,
        OTP: generated,
        verified: false,
    };
    const findUser = yield users_1.default.findOne({ where: { email } });
    if (findUser)
        return res.status(400).json({ message: "User is already exist" });
    try {
        const user = yield users_1.default.create(newUser);
        if (user) {
            res.status(200).json({ message: `successfull registered ${fullname}` });
            const mailOptions = {
                from: '"Tarlac Agricultural University" <admin@tau.edu.ph>',
                to: email,
                subject: "Email verification code",
                text: "Greetings from Tarlac Agricultural University",
                html: `<span>here is your OTP <h3>${generated}</h3></span>`,
            };
            (0, sendMail_1.sendEmail)(mailOptions);
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
        const checkEmailVerfied = yield users_1.default.findOne({
            where: { verified: true },
        });
        if (!findUser)
            return res.status(400).json({ message: "Invalid Password or Email!" });
        if (!checkEmailVerfied)
            return res.status(400).json({
                message: "This email is not yet verified check your email and see the verification code and verify your email",
            });
        const passwordIsValid = bcrypt_1.default.compareSync(password, findUser.password);
        if (!passwordIsValid)
            return res.status(400).json({ message: "Invalid Password or Email!" });
        if (!findUser.verified) {
            return res
                .status(400)
                .json({ message: "This account is not yet verified!" });
        }
        res.status(200).json({ token: (0, generateToken_1.generateToken)(findUser) });
    }
    catch (error) {
        console.log("error 500", error);
        return res.status(500).json({ message: `Internal server error`, error });
    }
});
exports.loginAction = loginAction;
const verifyEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { verificationCode, email } = req.query;
    try {
        const checkCode = yield users_1.default.findOne({
            where: {
                OTP: verificationCode,
            },
        });
        const checkEmail = yield users_1.default.findOne({
            where: {
                email,
            },
        });
        if (!checkEmail) {
            return res.status(400).json({
                message: "Email cannot be found in our query or this is not registered",
            });
        }
        if (!checkCode) {
            return res
                .status(400)
                .json({ message: "Verification code has been expired or not exist" });
        }
        const data = {
            verified: true,
        };
        const verifyEmail = yield users_1.default.update(data, {
            where: {
                email,
            },
        });
        if (verifyEmail)
            return res
                .status(200)
                .json({ message: `Successfully verified email: ${email}` });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.verifyEmail = verifyEmail;
const resendVericationCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.query;
    try {
        const checkEmail = yield users_1.default.findOne({
            where: {
                email,
            },
        });
        if (!checkEmail) {
            return res.status(400).json({
                message: "Email cannot be found in our query or this is not registered",
            });
        }
        const generated = (0, randomGenerator_1.randomNumber)(6);
        const data = {
            OTP: generated,
        };
        const resendCode = yield users_1.default.update(data, {
            where: {
                email,
            },
        });
        const mailOptions = {
            from: '"Tarlac Agricultural University" <admin@tau.edu.ph>',
            to: email,
            subject: "Resend Email verification code",
            text: "Greetings from Tarlac Agricultural University",
            html: `<span>here is your new OTP <h3>${generated}</h3></span>`,
        };
        (0, sendMail_1.sendEmail)(mailOptions);
        if (resendCode)
            return res.status(200).json({
                message: "Successfully created new email verification code please check your email",
            });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.resendVericationCode = resendVericationCode;
