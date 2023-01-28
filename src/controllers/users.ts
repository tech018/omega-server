import bcrypt from "bcrypt";
import UserModel from "../models/users";
import { Response } from "express";
import { ValidatedRequest } from "express-joi-validation";
import { RegisterRequestSchema } from "../schema/users";
interface newUser {
  email: string;
  password: string;
  fullname: string;
  mobile: number;
}

export const createUser = async (
  req: ValidatedRequest<RegisterRequestSchema>,
  res: Response
) => {
  const { email, password, fullname, mobile } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const passwordHash = await bcrypt.hashSync(password, salt);

  const newUser: newUser = {
    email,
    mobile,
    fullname,
    password: passwordHash,
  };

  const findUser = await UserModel.findOne({ where: { email } });
  if (findUser)
    return res.status(400).json({ message: "User is already exist" });
  try {
    const user = await UserModel.create(newUser);
    if (user) {
      res.status(200).json({ message: `successfull registered ${fullname}` });
    } else {
      res.status(400).json({ message: `unable to register ${fullname}` });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log("errors 500", error);
  }
};
