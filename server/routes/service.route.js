import express from "express";
import { isAuthenticated, authorizeRoles } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.middleware.js";
import { fetchServices, createService, editService, deleteService } from "../controllers/serivce.controller.js";

const router = express.Router();

router.get("/", fetchServices);
router.post("/", isAuthenticated, authorizeRoles("admin"), upload.single("image"), createService);
router.put("/:id", isAuthenticated, authorizeRoles("admin"), upload.single("image"), editService);
router.delete("/:id", isAuthenticated, authorizeRoles("admin"), deleteService);

export default router;