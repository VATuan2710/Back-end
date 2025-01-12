import { Router } from "express";
import {
  create,
  getAll,
  getById,
  removeById,
  softRemoveById,
  updateById,
} from "../controllers/categoryController.js";
import { validBodyRequest } from "../middlewares/validBodyRequest.js";
import categorySchema from "../validations/categorySchema .js";

const categoryRoutes = Router();

categoryRoutes.get("/", getAll);
categoryRoutes.get("/:id", getById);
categoryRoutes.post("/", validBodyRequest(categorySchema), create);
categoryRoutes.patch("/:id", validBodyRequest(categorySchema), updateById);
categoryRoutes.patch("/soft-delete/:id", softRemoveById);
categoryRoutes.delete("/:id", removeById);
export default categoryRoutes;
