import express from "express";
import { isAuthenticated, authorizeRoles } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.middleware.js";
import {
  getActiveTestimonials,
  getAllTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  toggleTestimonialStatus
} from "../controllers/testimonial.controller.js";

const router = express.Router();

// Public routes
router.get("/", getActiveTestimonials);

// Admin routes
router.get("/all", isAuthenticated, authorizeRoles("Admin"), getAllTestimonials);
router.post("/", isAuthenticated, authorizeRoles("Admin"), upload.single("image"), createTestimonial);
router.put("/:id", isAuthenticated, authorizeRoles("Admin"), upload.single("image"), updateTestimonial);
router.delete("/:id", isAuthenticated, authorizeRoles("Admin"), deleteTestimonial);
router.patch("/:id/toggle", isAuthenticated, authorizeRoles("Admin"), toggleTestimonialStatus);

export default router;
