require('dotenv').config();
import { Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1d";

type RouteHandler = (req: Request, res: Response) => void;

export const register: RouteHandler = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.create({ email, password });
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(400).json({ message: "Registration failed", error });
  }
};

export const login: RouteHandler = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({  })

    res.cookie("token", token, { httpOnly: true });
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(400).json({ message: "Login failed", error });
  }
};

export const logout: RouteHandler = (req: Request, res: Response) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logout successful" });
};