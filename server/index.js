import express from "express";
import dotenv from "dotenv";
import dbConnect from "./lib/db.js";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.route.js"
import serviceRoute from "./routes/service.route.js"
import bookingRoute from "./routes/booking.route.js"
import testimonialRoute from "./routes/testimonial.route.js"
import contactRoute from "./routes/contact.route.js"
import adminRoute from "./routes/admin.route.js"
import cors from "cors"
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 5008;

await dbConnect()

const app = express();

// CORS
app.use(cors({
  origin: ["http://localhost:5173", "http://153.92.209.177:5175", "https://madebydua.com", "https://www.madebydua.com"],
  credentials: true,
}));

app.use(cookieParser());
// Serve uploaded images statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// Body parsers
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use("/api/auth", authRoute);
app.use("/api/service", serviceRoute);
app.use("/api/booking", bookingRoute);
app.use("/api/testimonial", testimonialRoute);
app.use("/api/contact", contactRoute);
app.use("/api/admin", adminRoute);

app.listen(PORT, () => {
  console.log(`server is runing on ${PORT}`);
});
