import { Router } from "express";
import {
  getAllMattresses,
  addMattress,
  getMattressById,
  updateMattress,
  deleteMattress
} from "../controllers/mattresController.js";

const mattressRoutes = Router();

// Obtener todos los colchones
mattressRoutes.get("/", getAllMattresses);

// Crear un colchón
mattressRoutes.post("/", addMattress);

// Obtener un colchón por ID
mattressRoutes.get("/:id", getMattressById);

// Actualizar un colchón
mattressRoutes.put("/:id", updateMattress);

// Eliminar un colchón
mattressRoutes.delete("/:id", deleteMattress);

export { mattressRoutes };
