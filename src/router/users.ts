import express from "express";
import {
  createValidator,
  ValidatedRequestSchema,
} from "express-joi-validation";
const validator = createValidator();

const router = express.Router();
import { createUser } from "../controllers/users";
import { registerUserSchema } from "../schema/users";

router.route("/register").post(validator.body(registerUserSchema), createUser);

export default router;
