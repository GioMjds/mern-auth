require('dotenv').config();
import express from "express";
import cors from "cors";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db";
import morgan from "morgan";
import authRoutes from './routes/authRoutes';
import { errorHandler } from "middleware/errorMiddleware";

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

const server = http.createServer(app);

connectDB();

app.use('/api/auth', authRoutes);
app.use(errorHandler);

server.listen(process.env.PORT, () => {
    console.log(`Server is running on port http://localhost:${process.env.PORT}`);
});