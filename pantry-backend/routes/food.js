"use strict";

// routes for food

const jsonschema = require("jsonschema");

const express = require("express");
const { BadRequestError } = require("../expressError");
const { ensureAdmin } = require("../middleware/auth");
const Food = require("../models/food");
const foodNewSchema = require("../schemas/foodNew.json");
const foodUpdateSchema = require("../schemas/foodUpdate.json");

const router = express.Router({ mergeParams: true });

// creates a new food item
// Authorization required: admin
router.post("/", ensureAdmin, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, foodNewSchema);
    if (!validator.valid) {
      const errs = validator.errors.map((e) => e.stack);
      throw new BadRequestError(errs);
    }

    const food = await Food.create(req.body);
    return res.status(201).json({ food });
  } catch (err) {
    return next(err);
  }
});

// Gets all of the food in the database
//  Authorization required: admin
router.get("/", ensureAdmin, async function (req, res, next) {
  try {
    const food = await Food.getAll();
    return res.json({ food });
  } catch (err) {
    return next(err);
  }
});

// gets a food item based on food Id
//  Authorization required: admin
router.get("/:foodId", ensureAdmin, async function (req, res, next) {
  try {
    const food = await Food.get(req.params.foodId);
    return res.json({ food });
  } catch (err) {
    return next(err);
  }
});

// Updates the inventory number of a specific food item
// Authorization required: admin
router.patch("/:foodId", async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, foodUpdateSchema);
    if (!validator.valid) {
      const errs = validator.errors.map((e) => e.stack);
      throw new BadRequestError(errs);
    }

    const food = await Food.updateInventory(
      req.params.foodId,
      req.body.inventory
    );
    return res.status(201).json({ food });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
