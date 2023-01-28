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
router.route("/register").post(validator.body(users_2.registerUserSchema), users_1.createUser);
exports.default = router;
