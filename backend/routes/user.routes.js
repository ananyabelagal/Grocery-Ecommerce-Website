import express from "express";
import { registerUser, loginUser, checkAuth, logout } from "../controller/user.controller.js";
import authUser from "../middlewares/authUser.js";

const router = express.Router();

// ===== PUBLIC ROUTES =====
router.post("/register", registerUser);
router.post("/login", loginUser);

// ===== PROTECTED ROUTES =====
router.get("/is-auth", authUser, checkAuth);
router.get("/logout", authUser, logout);

export default router;
