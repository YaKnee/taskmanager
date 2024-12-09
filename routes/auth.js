import express from "express";
import { login, register } from "../controllers/authController.js";
import { validateCredentials } from "../middlewares/validateCredentials.js";

export const authRouter = express.Router();

authRouter.post("/login", validateCredentials, login);
authRouter.post("/register", validateCredentials, register)