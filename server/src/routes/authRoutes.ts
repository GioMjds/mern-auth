import express from "express";
import { register, login, logout } from "../controllers/authController";
import { protect } from "../middleware/middleware";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/protected", protect, (req, res) => {
  res.status(200).json({ message: "You are authorized" });
});

export default router;