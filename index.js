import express from "express";
import bodyParser from "body-parser";
import colors from "colors";
import cors from "cors";
import "dotenv/config";
import connectDB from "./utils/db.js";

import userRoutes from "./routes/userRoutes.js";

const app = express();
connectDB();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

const BASE_API_PATH = "/api/v1";
app.use(`${BASE_API_PATH}/users/`, userRoutes);

const PORT = process.env.PORT || 9000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.blue.bold
  )
);
