import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import { userRouter } from "./routes/users.js";
import { recipesRouter } from "./routes/recipes.js";

const app = express();
const mongooseClusterMern = "mongodb+srv://ebm619:Ciloshiga314@clustermern.mfu8zym.mongodb.net/clustermern?retryWrites=true&w=majority&appName=ClusterMERN"


app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);

mongoose.connect(mongooseClusterMern)

app.listen(3001, () => console.log("Server started on port 3001"))