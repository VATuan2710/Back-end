import { Router } from "express";
import { getUserInfo, login, register } from "../controllers/authController.js";
import { validBodyRequest } from "../middlewares/validBodyRequest.js";
import { loginSchema, registerSchema } from "../validations/authSchema.js";
import { authenticateToken } from "../middlewares/verifyUser.js";

const authRoutes = Router();

authRoutes.post("/register", validBodyRequest(registerSchema), register);

authRoutes.post("/login", validBodyRequest(loginSchema), login);
authRoutes.get("/token", authenticateToken, getUserInfo);
export default authRoutes;
