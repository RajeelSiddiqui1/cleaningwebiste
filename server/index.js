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
  origin: function (origin, callback) {
    const allowedOrigins = [
      "http://localhost:5173",
      "http://localhost:5174", 
      "http://153.92.209.177:8081",
      "http://153.92.209.177:80",
      "http://153.92.209.177"
    ];
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
}));

// Handle preflight requests explicitly
app.options('*', cors());

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
