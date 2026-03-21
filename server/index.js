import express from "express";
import dotenv from "dotenv";
import dbConnect from "./lib/db.js";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.route.js"
import serviceRoute from "./routes/service.route.js"

dotenv.config();

const PORT = process.env.PORT || 5008;

await dbConnect()

const app = express();

app.use(express.json());
app.use(cookieParser())


app.use("/api/auth",authRoute)
app.use("/api/service",serviceRoute)

app.listen(PORT, () => {
  console.log(`server is runing on ${PORT}`);
});
