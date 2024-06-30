import express from "express";
import connectDB from "./config/database";
import dotenv from "dotenv";
import cors from "cors";
import profileRoutes from "./routes/profileRoutes";
import path from "path";
const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api", profileRoutes);

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
