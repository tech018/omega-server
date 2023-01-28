import databaseConnection from "../../config/db-config";
import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";

// We recommend you declare an interface for the attributes, for stricter typechecking

interface UserModel
  extends Model<
    InferAttributes<UserModel>,
    InferCreationAttributes<UserModel>
  > {
  // Some fields are optional when calling UserModel.create() or UserModel.build()
  id: CreationOptional<number>;
  fullname: string;
  email: string;
  password: string;
  mobile: number;
}

const UserModel = databaseConnection.define<UserModel>("User", {
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
    type: DataTypes.INTEGER,
  },
});

export default UserModel;

// async function doStuff() {
//   const instance = await UserModel.findByPk(1, {
//     rejectOnEmpty: true,
//   });

//   console.log(instance.id);
// }

// async function doStuffWithUserModel() {
//     const newUser = await User.create({
//       name: 'Johnny',
//       preferredName: 'John',
//     });
//     console.log(newUser.id, newUser.name, newUser.preferredName);

//     const foundUser = await User.findOne({ where: { name: 'Johnny' } });
//     if (foundUser === null) return;
//     console.log(foundUser.name);
//   }
