import "dotenv/config";
import { Sequelize } from "sequelize-typescript";

const sequelize = new Sequelize({
  dialect: "postgres",
  host: process.env["POSTGRES_HOST"],
  port: Number(process.env["POSTGRES_PORT"]),
  database: process.env["POSTGRES_NAME"],
  username: process.env["POSTGRES_USER"],
  password: process.env["POSTGRES_PASSWORD"],
  logging: false,
});

export default sequelize;
