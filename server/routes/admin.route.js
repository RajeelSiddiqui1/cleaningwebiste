import express from "express";
import { isAuthenticated, authorizeRoles } from "../middleware/auth.middleware.js";
import { 
  getDashboardStats, 
  getAllUsers 
} from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/stats", isAuthenticated, authorizeRoles("Admin"), getDashboardStats);
router.get("/users", isAuthenticated, authorizeRoles("Admin"), getAllUsers);

export default router;
