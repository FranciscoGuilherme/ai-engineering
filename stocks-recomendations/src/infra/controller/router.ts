import express from "express";
import UserController from "./user.controller";

const router = express.Router();
const userController = new UserController();

router.get("/users", userController.getAllUsers);

export default router;
