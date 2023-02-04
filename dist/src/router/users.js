"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_joi_validation_1 = require("express-joi-validation");
const validator = (0, express_joi_validation_1.createValidator)();
const router = express_1.default.Router();
const users_1 = require("../controllers/users");
const users_2 = require("../schema/users");
router.route("/").post(validator.body(users_2.loginUserSchema), users_1.loginAction);
router.route("/register").post(validator.body(users_2.registerUserSchema), users_1.createUser);
router
    .route("/verifyEmail")
    .post(validator.query(users_2.emailVerifiedSchema), users_1.verifyEmail);
router
    .route("/resendcode")
    .post(validator.query(users_2.resendCodeSchema), users_1.resendVericationCode);
exports.default = router;
