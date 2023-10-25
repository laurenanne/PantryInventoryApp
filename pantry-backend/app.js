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

const morgan = require("morgan");

const app = express();
const options = { origin: "https://stp-pantry.surge.sh", credentials: true };
app.use(cors(options));
app.use(express.json());
app.use(morgan("tiny"));
app.use(authenticateJWT);

app.use("/users", usersRoutes);
app.use("/orders", ordersRoutes);
app.use("/purchases", purchasesRoutes);
app.use("/clients", clientsRoutes);
app.use("/food", foodRoutes);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://stp-pantry.surge.sh");

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Private-Network", true);
  //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
  res.setHeader("Access-Control-Max-Age", 7200);

  next();
});

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
