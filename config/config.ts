interface POOL {
  max: number;
  min: number;
  acquire: number;
  idle: number;
}
export interface config {
  HOST: string;
  USER: string;
  PASSWORD: string;
  DBNAME: string;
  dialect: string;
  pool: POOL;
}
const config: config = {
  HOST: `${process.env.HOST}`,
  USER: `${process.env.DB_USERNAME}`,
  PASSWORD: `${process.env.DB_PASSWORD}`,
  DBNAME: `${process.env.DB_NAME}`,
  dialect: `${process.env.DB_DIALECT}`,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

export default config;
