import express from "express";
import {
  register,
  login,
  updateUserRole,
  deleteUser,
} from "../controllers/auth.controllers.js";

const router = express.Router();

router.post(`/register`, register);
router.post(`/login`, login);
router.patch(`/update-role/:id`, updateUserRole);
router.delete("/delete-user/:id", deleteUser);
export default router;
