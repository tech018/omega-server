import { Dialect, Sequelize } from "sequelize";
import config from "./config";

const dbDriver = config.dialect as Dialect;

const databaseConnection = new Sequelize(
  config.DBNAME,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: dbDriver,
  }
);

export default databaseConnection;
