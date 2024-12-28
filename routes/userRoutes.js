import express from "express";
import { authenticateUser } from "../controllers/userControllers.js";
const router = express.Router();

router.route("/auth/login").get(authenticateUser);

export default router;
