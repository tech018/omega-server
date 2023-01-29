import jwt from "jsonwebtoken";

export interface generateToken {
  id: number;
  email: string;
  role: string;
  mobile: number;
  fullname: string;
  password: string;
}

export const generateToken = (findUser: generateToken) => {
  const privateKey: string = `${process.env.SECRET_TOKEN} `;
  const { id, email, role } = findUser;
  return jwt.sign({ id, email, role }, privateKey, {
    expiresIn: "1h",
  });
};
