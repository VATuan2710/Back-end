import { Router } from "express";
import {
  create,
  getAll,
  getById,
  removeById,
  updateById,
} from "../controllers/productController.js";

const productRoutes = Router();

productRoutes.get("/", getAll);
productRoutes.get("/:id", getById);
productRoutes.post("/", create);
productRoutes.patch("/:id", updateById);
productRoutes.delete("/:id", removeById);

export default productRoutes;
