import * as Joi from "joi";
import {
  ContainerTypes,
  ValidatedRequest,
  ValidatedRequestSchema,
} from "express-joi-validation";

export interface RegisterRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    fullname: string;
    password: string;
    email: string;
    mobile: number;
  };
}

export const registerUserSchema = Joi.object({
  fullname: Joi.string().required().min(2),
  password: Joi.string().required().min(2),
  email: Joi.string().email().required(),
  mobile: Joi.number().required(),
});
