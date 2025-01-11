import { Router } from "express";
import productRoutes from "./productRoutes.js";

const routes = Router();

routes.use("/products", productRoutes);

export default routes;
