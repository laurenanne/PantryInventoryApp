"use strict";

// routes for purchases

const jsonschema = require("jsonschema");

const express = require("express");
const { BadRequestError } = require("../expressError");
const { ensureAdmin } = require("../middleware/auth");
const Purchase = require("../models/purchase");
const PurchaseItems = require("../models/purchaseItems");
const purchaseNewSchema = require("../schemas/purchaseNew.json");
const router = express.Router({ mergeParams: true });

// creates a new purchase
// Authorization required: admin
router.post("/", ensureAdmin, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, purchaseNewSchema);
    if (!validator.valid) {
      const errs = validator.errors.map((e) => e.stack);
      throw new BadRequestError(errs);
    }

    const purchase = await Purchase.create(req.body);
    return res.status(201).json({ purchase });
  } catch (err) {
    return next(err);
  }
});

// gets all purchases in the database
//  Authorization required: admin
router.get("/", ensureAdmin, async function (req, res, next) {
  try {
    const purchases = await Purchase.getAll();
    return res.json({ purchases });
  } catch (err) {
    return next(err);
  }
});

// gets a purchase based on id
// Authorization required: Admin
router.get("/:id", ensureAdmin, async function (req, res, next) {
  try {
    const purchase = await Purchase.get(req.params.id);
    return res.json({ purchase });
  } catch (err) {
    return next(err);
  }
});

// updates a purchase
// Data can include: { date }
// Authorization required: admin
router.patch("/:id", ensureAdmin, async function (req, res, next) {
  try {
    const purchase = await Purchase.update(req.params.id, req.body.date);
    return res.json({ purchase });
  } catch (err) {
    return next(err);
  }
});

// handle adding purchaseItems to the purchase
// Authorization required: Admin
router.post("/:id/food/:foodId", ensureAdmin, async function (req, res, next) {
  try {
    const purchaseItem = await PurchaseItems.addItems(
      req.params.id,
      req.params.foodId,
      req.body
    );
    return res.status(201).json({ purchaseItem });
  } catch (err) {
    return next(err);
  }
});

// handle updating purchaseItems in the purchase order
// Authorization required: Admin
router.patch("/:id/food/:foodId", ensureAdmin, async function (req, res, next) {
  try {
    const purchaseItem = await PurchaseItems.editItems(
      req.params.id,
      req.params.foodId,
      req.body
    );
    return res.json({ purchaseItem });
  } catch (err) {
    return next(err);
  }
});

// handle deleting purchaseItems from the purchase
// Authorization required: Admin
router.delete(
  "/:id/food/:foodId",
  ensureAdmin,
  async function (req, res, next) {
    try {
      await PurchaseItems.deleteItems(req.params.id, req.params.foodId);
      return res.json({
        deleted: `Food Id ${req.params.foodId} from Purchase Order ${req.params.id}`,
      });
    } catch (err) {
      return next(err);
    }
  }
);

module.exports = router;
