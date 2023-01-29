import express from "express";
import { createValidator } from "express-joi-validation";
const validator = createValidator();
const router = express.Router();

import { createUser, loginAction } from "../controllers/users";
import { loginUserSchema, registerUserSchema } from "../schema/users";

router.route("/").post(validator.body(loginUserSchema), loginAction);
router.route("/register").post(validator.body(registerUserSchema), createUser);

export default router;
