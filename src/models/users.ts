import databaseConnection from "../../config/db-config";
import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";

interface UserModel
  extends Model<
    InferAttributes<UserModel>,
    InferCreationAttributes<UserModel>
  > {
  id: CreationOptional<number>;
  fullname: string;
  email: string;
  password: string;
  mobile: number;
  OTP: number;
  role: string;
  verified: boolean;
}

const UserModel = databaseConnection.define<UserModel>("Users", {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER.UNSIGNED,
  },
  fullname: {
    type: DataTypes.STRING(255),
  },
  email: {
    type: DataTypes.STRING(255),
  },
  password: {
    type: DataTypes.STRING(255),
  },
  mobile: {
    type: DataTypes.INTEGER(),
  },
  role: {
    type: DataTypes.STRING(255),
  },
  OTP: {
    type: DataTypes.INTEGER(),
  },
  verified: {
    type: DataTypes.BOOLEAN(),
  },
});

export default UserModel;
