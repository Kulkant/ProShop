import express from "express";
import protect from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.get("/profile", protect, (req, res) => {
  res.json({
    user: {
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
    },
  });
});

export default router;
