// configure dotenv
require("dotenv").config({ path: "./config/.env" });

const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

const errorMiddleware = require("./middleware/error");

// require userRoutes
const userRoutes = require("./routes/userRoutes");

// connect database
require("./config/database").connectdatabase();

// config express body parser
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: process.env.FRONTEND_URL }));

app.use("/api/v1/user", userRoutes);

// Middleware for handling errors
app.use(errorMiddleware);

app.listen(
  process.env.PORT,
  console.log(`Listening on port ${process.env.PORT}`)
);

/**
 * const instance = axios.create({
  baseURL: "http://localhost:8080/",
  withCredentials: true,
});
 */
