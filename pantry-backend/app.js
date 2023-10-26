"use strict";

// Express app for pantry

const express = require("express");
const cors = require("cors");

const { NotFoundError } = require("./expressError");

const { authenticateJWT } = require("./middleware/auth");
const usersRoutes = require("./routes/users");
const ordersRoutes = require("./routes/orders");
const purchasesRoutes = require("./routes/purchases");
const clientsRoutes = require("./routes/clients");
const foodRoutes = require("./routes/food");

const app = express();
const options = {
  origin: [
    "https://stp-pantry.surge.sh",
    "http://stp-pantry.surge.sh",
    "http://localhost:3000",
  ],
  credentials: true,
};
app.use(cors(options));
app.use(express.json());
app.use(authenticateJWT);

app.use("/users", usersRoutes);
app.use("/orders", ordersRoutes);
app.use("/purchases", purchasesRoutes);
app.use("/clients", clientsRoutes);
app.use("/food", foodRoutes);

// Handles 404 errors
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

// Generic error handler; anything unhandled goes here.
app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;
