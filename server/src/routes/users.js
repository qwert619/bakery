import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/Users.js";

const router = express.Router();

router.post("/register", async (req, res) => {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username});

    if (user) {
        res.json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 16);

    const newUser = new UserModel({username,password: hashedPassword,});
    await newUser.save();
    
    res.json({ message: "User registered successfully" });
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username });
    if (!user) {
        return res.json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.json({ message: "Invalid password" });
    }

    const token = jwt.sign({id: user._id}, "secretkey")
    res.json({ token, userID: user._id});
})

export {router as userRouter};

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, "secretkey", (err) => {
            if (err) return res.status(403).json({ message: "Invalid token" });
            next();
        });
    }else {
        res.sendStatus(401).json({ message: "No token provided" });
    }
};