import express from "express";
import { isAuthenticated, authorizeRoles } from "../middleware/auth.middleware.js";
import { 
  createBooking, 
  getUserBookings, 
  getAllBookings, 
  updateBookingStatus 
} from "../controllers/booking.controller.js";

const router = express.Router();

// User routes
router.post("/", isAuthenticated, createBooking);
router.get("/user", isAuthenticated, getUserBookings);

// Admin routes
router.get("/all", isAuthenticated, authorizeRoles("Admin"), getAllBookings);
router.patch("/:id/status", isAuthenticated, authorizeRoles("Admin"), updateBookingStatus);

export default router;
