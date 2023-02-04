import bcrypt from "bcrypt";
import UserModel from "../models/users";
import { Response } from "express";
import { ValidatedRequest } from "express-joi-validation";
import { RegisterRequestSchema, LoginRequestSchema } from "../schema/users";
import { generateToken } from "../helpers/generateToken";
import { sendEmail } from "../helpers/sendMail";

interface newUser {
  email: string;
  password: string;
  fullname: string;
  mobile: number;
  role: string;
}

export const createUser = async (
  req: ValidatedRequest<RegisterRequestSchema>,
  res: Response
) => {
  const { email, password, fullname, mobile, role } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const passwordHash = await bcrypt.hashSync(password, salt);

  const newUser: newUser = {
    email,
    mobile,
    fullname,
    password: passwordHash,
    role,
  };

  const findUser = await UserModel.findOne({ where: { email } });
  if (findUser)
    return res.status(400).json({ message: "User is already exist" });
  try {
    const user = await UserModel.create(newUser);
    if (user) {
      res.status(200).json({ message: `successfull registered ${fullname}` });
      const mailOptions = {
        from: '"Material Science Division | Industrial Technology Development Institute | DOST" <admin@virtuallabmsd.com>', // sender address
        to: email, // list of receivers
        subject: "Registration Successfull", // Subject line
        text: "Greetings from Material Science Division | Industrial Technology Development Institute | DOST", // plain text body
        html: `<h1>Sample email</h1>`, // html body
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

    res.status(200).json({ token: generateToken(findUser) });
  } catch (error) {
    console.log("error 500", error);
    return res.status(500).json({ message: `Internal server error`, error });
  }
};
