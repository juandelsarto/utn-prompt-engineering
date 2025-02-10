import express from "express";
import {
  createOrder,
  deleteOrder,
  getOrder,
  getOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";

const router = express.Router();

// POST /api/orders - Create new order
router.post("/", createOrder);

// GET /api/orders - Get all orders
router.get("/", getOrders);

// GET /api/orders/:id - Get single order
router.get("/:id", getOrder);

// DELETE /api/orders/:id - Delete order
router.delete("/:id", deleteOrder);

// PATCH /api/orders/:id/status - Update order status
router.patch("/:id/status", updateOrderStatus);

export default router;
