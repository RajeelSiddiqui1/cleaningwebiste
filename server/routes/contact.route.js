import express from "express";
import jwt from "jsonwebtoken";
import { isAuthenticated, authorizeRoles } from "../middleware/auth.middleware.js";
import {
  submitContact,
  getUserContacts,
  getAllContacts,
  updateContactStatus
} from "../controllers/contact.controller.js";

const router = express.Router();


const optionalAuth = (req, res, next) => {
  const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(" ")[1]);
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
      req.user = decoded;
    } catch (err) {
      // ignore empty/bad token, let them submit as guest
    }
  }
  next();
};

// Public/Optional routes
router.post("/", optionalAuth, submitContact);

// Protected user routes
router.get("/user", isAuthenticated, getUserContacts);

// Admin routes
router.get("/all", isAuthenticated, authorizeRoles("Admin"), getAllContacts);
router.patch("/:id/status", isAuthenticated, authorizeRoles("Admin"), updateContactStatus);

export default router;
