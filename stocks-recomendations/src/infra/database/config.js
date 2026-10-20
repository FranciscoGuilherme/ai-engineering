"use strict";

require("dotenv").config();

const database = {
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_NAME,
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  dialect: "postgres",
  logging: false,
};

module.exports = {
  development: database,
  test: database,
  production: database,
};
