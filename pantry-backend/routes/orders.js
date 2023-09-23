"use strict";

// routes for orders

const jsonschema = require("jsonschema");

const express = require("express");
const { BadRequestError } = require("../expressError");
const { ensureAdmin } = require("../middleware/auth");
const Order = require("../models/order.js");
const OrderItems = require("../models/orderItems.js");

const router = express.Router({ mergeParams: true });

// Creates a new order. Must input clientId manually in the req.body
// Authorization required: admin
// router.post("/", async function (req, res, next) {
//   try {
//     const order = await Order.create(req.body);
//     return res.status(201).json({ order });
//   } catch (err) {
//     return next(err);
//   }
// });

// Gets all orders
// Can provide search filter in query: dateOrdered or clientId
//  Authorization required: admin
router.get("/", ensureAdmin, async function (req, res, next) {
  //   const q = req.query;
  //   if (q.datePurchased !== undefined) q.datePurhcased;
  try {
    const orders = await Order.getAll();
    return res.json({ orders });
  } catch (err) {
    return next(err);
  }
});

// gets order based on orderId
// Authorization required: Admin
router.get("/:id", ensureAdmin, async function (req, res, next) {
  try {
    const order = await Order.get(req.params.id);
    return res.json({ order });
  } catch (err) {
    return next(err);
  }
});

// deletes an order
// Authorization required
router.delete("/:id", ensureAdmin, async function (req, res, next) {
  try {
    await Order.remove(req.params.id);
    return res.json({ deleted: req.params.id });
  } catch (err) {
    return next(err);
  }
});

// handle adding orderItems to the order
// Authorization required: Admin
router.post("/:id/food/:foodId", ensureAdmin, async function (req, res, next) {
  try {
    const orderItem = await OrderItems.addItems(
      req.params.id,
      req.params.foodId,
      req.body
    );
    return res.status(201).json({ orderItem });
  } catch (err) {
    return next(err);
  }
});

// handle updating orderItems in the client's order
// Authorization required: Admin
router.patch("/:id/food/:foodId", ensureAdmin, async function (req, res, next) {
  try {
    const orderItem = await OrderItems.editItems(
      req.params.id,
      req.params.foodId,
      req.body.quantity
    );
    return res.json({ orderItem });
  } catch (err) {
    return next(err);
  }
});

// handle deleting orderItems from the client order
// Authorization required: Admin
router.delete(
  "/:id/food/:foodId",
  ensureAdmin,
  async function (req, res, next) {
    try {
      await OrderItems.deleteItems(req.params.id, req.params.foodId);
      return res.json({
        deleted: `Food Id ${req.params.foodId} from Client Order ${req.params.id}`,
      });
    } catch (err) {
      return next(err);
    }
  }
);

module.exports = router;
