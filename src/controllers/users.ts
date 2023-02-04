import bcrypt from "bcrypt";
import UserModel from "../models/users";
import { Response } from "express";
import { ValidatedRequest } from "express-joi-validation";
import { RegisterRequestSchema, LoginRequestSchema } from "../schema/users";
import { generateToken } from "../helpers/generateToken";
import { sendEmail } from "../helpers/sendMail";
import { ramdomNumber } from "../helpers/randomGenerator";

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
  const randomNumber: number = ramdomNumber(6);

  console.log("number", mobile);
  const newUser: newUser = {
    email,
    mobile,
    fullname,
    password: passwordHash,
    role,
    OTP: randomNumber,
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
        html: `<span>here is your OTP <h3>${randomNumber}</h3></span>`,
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
    if (!findUser)
      return res.status(400).json({ message: "Invalid Password or Email!" });

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
