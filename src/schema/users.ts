import * as Joi from "joi";
import { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";

export interface RegisterRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    fullname: string;
    password: string;
    email: string;
    mobile: number;
    role: string;
  };
}

export interface LoginRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    password: string;
    email: string;
  };
}

export interface VerifyEmailSchema extends ValidatedRequestSchema {
  [ContainerTypes.Query]: {
    verificationCode: number;
    email: string;
  };
}

//joi validation

export const registerUserSchema = Joi.object({
  fullname: Joi.string().required().min(2),
  password: Joi.string().required().min(2),
  email: Joi.string().email().required(),
  mobile: Joi.number().required(),
  role: Joi.string().required(),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required().min(2),
});

export const emailVerifiedSchema = Joi.object({
  verificationCode: Joi.number().required(),
  email: Joi.string().required().email(),
});
