import express from "express";
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
} from "../controllers/order.controllers.js";
import protect from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.post("/", protect, addOrderItems);
router.get("/myorders", protect, getMyOrders);

router.get("/:id", protect, getOrderById);
router.put("/:id/pay", protect, updateOrderToPaid);

export default router;
