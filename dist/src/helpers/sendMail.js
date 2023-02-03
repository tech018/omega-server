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
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const googleapis_1 = require("googleapis");
const sendEmail = (mailOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const oAuth2Client = new googleapis_1.google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.GOOGLE_REDIRECT_URI);
    oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });
    const accessToken = yield oAuth2Client.getAccessToken();
    const transport = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: `${process.env.SENDER_EMAIL}`,
            clientId: `${process.env.CLIENT_ID}`,
            clientSecret: `${process.env.CLIENT_SECRET}`,
            refreshToken: `${process.env.REFRESH_TOKEN}`,
            accessToken: `${accessToken}`,
        },
    });
    yield transport.sendMail(mailOptions, (error) => {
        if (error) {
            return console.log(error);
        }
        else {
            console.log("email was send successfully");
        }
    });
});
exports.sendEmail = sendEmail;
