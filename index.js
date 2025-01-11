import express from "express";
import mongoose from "mongoose";
import routes from "./src/routes/index.js";
import connectDB from "./src/config/db.js";
import dotenv from "dotenv";
const app = express();

dotenv.config();
const { PORT } = process.env;
app.use(express.json());

connectDB();

// app.get("/products", async (req, res) => {});

// app.get("/products/:id", async (req, res) => {});

// app.delete("/products/:id", async (req, res) => {});

// app.post("/products", async (req, res) => {});

// app.patch("/products/:id", async (req, res) => {});

app.use("/", routes);

app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
