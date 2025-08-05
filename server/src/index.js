import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

// Configure dotenv
dotenv.config();

import { userRouter } from "./routes/users.js";
import { recipesRouter } from "./routes/recipes.js";

const app = express();
const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI;

const __dirname = path.resolve();

const allowedOrigins = [
  "https://bakerypage.onrender.com", // your frontend URL
  "http://localhost:3000"            // for local development
];

app.use(express.json());
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);
app.get("/healthz", (req, res) => res.send("OK"));

mongoose.connect(MONGODB_URI)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))