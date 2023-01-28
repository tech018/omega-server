import bcrypt from "bcrypt";
import UserModel from "../models/users";
import { Request, Response } from "express";

interface newUser {
  email: string;
  password: string;
  fullname: string;
  mobile: number;
}

interface hashpassword {
  password: string;
  salt: string;
}

export const createUser = async (req: Request, res: Response) => {
  const { email, password, fullname, mobile } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const passwordHash = await bcrypt.hashSync(password, salt);

  const newUser: newUser = {
    email,
    mobile,
    fullname,
    password: passwordHash,
  };

  try {
    const user = await UserModel.create(newUser);
    if (user) {
      res.status(200).json({ message: `successfull registered ${fullname}` });
    } else {
      res.status(400).json({ message: `unable to register ${fullname}` });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
