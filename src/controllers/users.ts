import bcrypt from "bcrypt";
import UserModel from "../models/users";
import { Response } from "express";
import { ValidatedRequest } from "express-joi-validation";
import {
  RegisterRequestSchema,
  LoginRequestSchema,
  VerifyEmailSchema,
  resendEmailCodeSchema,
} from "../schema/users";
import { generateToken } from "../helpers/generateToken";
import { sendEmail } from "../helpers/sendMail";
import { randomNumber } from "../helpers/randomGenerator";

interface newUser {
  email: string;
  password: string;
  fullname: string;
  mobile: number;
  role: string;
  OTP: number;
  verified: boolean;
}

export const createUser = async (
  req: ValidatedRequest<RegisterRequestSchema>,
  res: Response
) => {
  const { email, password, fullname, mobile, role } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const passwordHash = await bcrypt.hashSync(password, salt);
  const generated = randomNumber(6);

  const newUser: newUser = {
    email,
    mobile,
    fullname,
    password: passwordHash,
    role,
    OTP: generated,
    verified: false,
  };

  const findUser = await UserModel.findOne({ where: { email } });
  if (findUser)
    return res.status(400).json({ message: "User is already exist" });
  try {
    const user = await UserModel.create(newUser);

    if (user) {
      res.status(200).json({ message: `successfull registered ${fullname}` });

      const mailOptions = {
        from: '"Tarlac Agricultural University" <admin@tau.edu.ph>',
        to: email,
        subject: "Email verification code",
        text: "Greetings from Tarlac Agricultural University",
        html: `<span>here is your OTP <h3>${generated}</h3></span>`,
      };

      sendEmail(mailOptions);
    } else {
      res.status(400).json({ message: `unable to register ${fullname}` });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const loginAction = async (
  req: ValidatedRequest<LoginRequestSchema>,
  res: Response
) => {
  const { email, password } = req.body;
  try {
    const findUser = await UserModel.findOne({ where: { email } });
    const checkEmailVerfied = await UserModel.findOne({
      where: { verified: true },
    });
    if (!findUser)
      return res.status(400).json({ message: "Invalid Password or Email!" });
    if (!checkEmailVerfied)
      return res.status(400).json({
        message:
          "This email is not yet verified check your email and see the verification code and verify your email",
      });
    const passwordIsValid = bcrypt.compareSync(password, findUser.password);

    if (!passwordIsValid)
      return res.status(400).json({ message: "Invalid Password or Email!" });
    if (!findUser.verified) {
      return res
        .status(400)
        .json({ message: "This account is not yet verified!" });
    }
    res.status(200).json({ token: generateToken(findUser) });
  } catch (error) {
    console.log("error 500", error);
    return res.status(500).json({ message: `Internal server error`, error });
  }
};

export const verifyEmail = async (
  req: ValidatedRequest<VerifyEmailSchema>,
  res: Response
) => {
  const { verificationCode, email } = req.query;

  try {
    const checkCode = await UserModel.findOne({
      where: {
        OTP: verificationCode,
      },
    });

    const checkEmail = await UserModel.findOne({
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

    const data: object = {
      verified: true,
    };
    const verifyEmail = await UserModel.update(data, {
      where: {
        email,
      },
    });

    if (verifyEmail)
      return res
        .status(200)
        .json({ message: `Successfully verified email: ${email}` });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const resendVericationCode = async (
  req: ValidatedRequest<resendEmailCodeSchema>,
  res: Response
) => {
  const { email } = req.query;
  try {
    const checkEmail = await UserModel.findOne({
      where: {
        email,
      },
    });

    if (!checkEmail) {
      return res.status(400).json({
        message: "Email cannot be found in our query or this is not registered",
      });
    }

    const generated = randomNumber(6);
    const data: object = {
      OTP: generated,
    };

    const resendCode = await UserModel.update(data, {
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

    sendEmail(mailOptions);
    if (resendCode)
      return res.status(200).json({
        message:
          "Successfully created new email verification code please check your email",
      });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
