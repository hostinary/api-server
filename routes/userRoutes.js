import express from "express";
import {
  authenticateUser,
  githubAuth,
} from "../controllers/userControllers.js";
const router = express.Router();

router.route("/auth/github").get(githubAuth);
router.route("/auth/login").get(authenticateUser);

export default router;
