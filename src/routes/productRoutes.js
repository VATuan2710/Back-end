import { Router } from "express";
import {
  create,
  getAll,
  getById,
  removeById,
  softDeleteById,
  updateById,
} from "../controllers/productController.js";
import { validBodyRequest } from "../middlewares/validBodyRequest.js";
import productSchema from "../validations/productSchema.js";

const productRoutes = Router();

productRoutes.get("/", getAll);
productRoutes.get("/:id", getById);
productRoutes.post("/", validBodyRequest(productSchema), create);
productRoutes.patch("/:id", validBodyRequest(productSchema), updateById);
productRoutes.patch("/soft-delete/:id", softDeleteById);
productRoutes.delete("/:id", removeById);

export default productRoutes;
