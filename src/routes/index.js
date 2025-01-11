import { Router } from "express";
import productRoutes from "./productRoutes.js";
import authRoutes from "./authRoutes.js";
import categoryRoutes from "./categoryRoutes.js";

const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/products", productRoutes);
routes.use("/categories", categoryRoutes);

// /auth/register
// /auth/login

export default routes;
