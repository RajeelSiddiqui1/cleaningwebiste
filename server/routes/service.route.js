import express from "express";
import { isAuthenticated, authorizeRoles } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.middleware.js";
import { 
  fetchServices, 
  fetchServiceById,
  fetchAllServices,
  fetchSepcialServices, 
  createService, 
  editService, 
  deleteService, 
  toggleServiceStatus 
} from "../controllers/serivce.controller.js";

const router = express.Router();

// Public routes
router.get("/", fetchServices);
router.get("/special", fetchSepcialServices);

// Protected routes (Admin only)
router.get("/all", isAuthenticated, authorizeRoles("Admin"), fetchAllServices);
router.post("/", isAuthenticated, authorizeRoles("Admin"), upload.single("image"), createService);
router.put("/:id", isAuthenticated, authorizeRoles("Admin"), upload.single("image"), editService);
router.patch("/:id/toggle", isAuthenticated, authorizeRoles("Admin"), toggleServiceStatus);
router.delete("/:id", isAuthenticated, authorizeRoles("Admin"), deleteService);

// Generic dynamic routes must be placed after static routes (like /all or /special)
router.get("/:id", fetchServiceById);

export default router;