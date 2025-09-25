import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import app from "./index.js";

dotenv.config();

const port = Number(process.env.PORT) || 4000;
// const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";


// app.use(
//   cors({
//     origin: "http://localhost:5173", // autoriser ton front
//     methods: ["GET", "POST", "PUT", "DELETE"], // ce que tu autorises
//     credentials: true,
//   })
// );

app.listen(port, () => {
  console.log(`serveur http://localhost:${port}`);
});
