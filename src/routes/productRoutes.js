import { Router } from "express";
import {
  create,
  getAll,
  getById,
  removeById,
  softDeleteById,
  updateById,
} from "../controllers/productController.js";

const productRoutes = Router();

productRoutes.get("/", getAll);
productRoutes.get("/:id", getById);
productRoutes.post("/", create);
productRoutes.patch("/:id", updateById);
productRoutes.patch("/:id/soft-delete", softDeleteById);
productRoutes.delete("/:id", removeById);

export default productRoutes;
