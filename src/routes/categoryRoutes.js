import { Router } from "express";
import {
  create,
  getAll,
  getById,
  removeById,
  softRemoveById,
  updateById,
} from "../controllers/categoryController.js";

const categoryRoutes = Router();

categoryRoutes.get("/", getAll);
categoryRoutes.get("/:id", getById);
categoryRoutes.post("/", create);
categoryRoutes.patch("/:id", updateById);
categoryRoutes.patch("/soft-delete/:id", softRemoveById);
categoryRoutes.delete("/:id", removeById);
export default categoryRoutes;
