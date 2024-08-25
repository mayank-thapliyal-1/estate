import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authroute from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
const app = express();
const port = 3000;
app.use(cookieParser());
app.use(express.json());
dotenv.config();
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("this is the error " + err);
  });

app.listen(port, (req, res) => {
  console.log(` port ${port} is running now `);
});
app.use("/api/auth", authroute);
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
