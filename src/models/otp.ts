import databaseConnection from "../../config/db-config";
import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";

interface OTPModel
  extends Model<InferAttributes<OTPModel>, InferCreationAttributes<OTPModel>> {
  id: CreationOptional<number>;
  otp: string;
  expiresIn: Date;
  email: string;
  mobile: number;
}

const OTPModel = databaseConnection.define<OTPModel>("Otp", {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER.UNSIGNED,
  },
  otp: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  expiresIn: {
    type: "TIMESTAMP",
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },

  mobile: {
    type: DataTypes.INTEGER(),
    allowNull: false,
  },
});

export default OTPModel;
