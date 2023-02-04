import express from "express";
import { createValidator } from "express-joi-validation";
const validator = createValidator();
const router = express.Router();

import { createUser, loginAction, verifyEmail } from "../controllers/users";
import {
  emailVerifiedSchema,
  loginUserSchema,
  registerUserSchema,
} from "../schema/users";

router.route("/").post(validator.body(loginUserSchema), loginAction);
router.route("/register").post(validator.body(registerUserSchema), createUser);
router
  .route("/verifyEmail")
  .post(validator.query(emailVerifiedSchema), verifyEmail);

export default router;
