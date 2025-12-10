import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";


import authRoutes from "./routes/authRoutes.js";
import animalRoutes from "./routes/animalRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";



const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));


app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/animals", animalRoutes);
app.use("/api", uploadRoutes);

app.listen(5000, () => console.log("Server started"));
