"use strict";

//  Routes for clients

const jsonschema = require("jsonschema");

const express = require("express");
const { BadRequestError } = require("../expressError");
const { ensureAdmin } = require("../middleware/auth");
const Client = require("../models/client.js");
const Order = require("../models/order.js");
const clientNewSchema = require("../schemas/clientNew.json");
const clientUpdateSchema = require("../schemas/clientUpdate.json");

const router = express.Router({ mergeParams: true });

// Adds a new client to the database
// Authorization required: admin
router.post("/", async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, clientNewSchema);
    if (!validator.valid) {
      const errs = validator.errors.map((e) => e.stack);
      throw new BadRequestError(errs);
    }

    const client = await Client.create(req.body);
    return res.status(201).json({ client });
  } catch (err) {
    return next(err);
  }
});

// gets all the clients in the database
// Authorization required: admin
router.get("/", async function (req, res, next) {
  // Can search based on lastName, address, or phone
  const q = req.query;

  try {
    const clients = await Client.find(q);
    return res.json({ clients });
  } catch (err) {
    return next(err);
  }
});

// gets a client based on id
router.get("/:id", async function (req, res, next) {
  try {
    const client = await Client.get(req.params.id);
    return res.json({ client });
  } catch (err) {
    return next(err);
  }
});

// Creates a new order for the current client id
router.post("/:id/orders", async function (req, res, next) {
  try {
    const order = await Order.create({ clientId: req.params.id });
    return res.json({ order });
  } catch (err) {
    return next(err);
  }
});

// gets the specific order (based on orderId for the client based on Id
router.get("/:id/orders/:orderId", async function (req, res, next) {
  try {
    const order = await Order.get(req.params.orderId);
    return res.json({ order });
  } catch (err) {
    return next(err);
  }
});

// Corrects data for a client based on clientId
// Data can include : firstName, altFirstName, lastName, altLastName,     address, phone, altPhone, numberAdultsInFamily, numberKidsInFamily,      receiveBenefits, isEligible, race, isHispanic, lastVisit
// Authorization required: admin
router.patch("/:id", async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, clientUpdateSchema);
    if (!validator.valid) {
      const errs = validator.errors.map((e) => e.stack);
      throw new BadRequestError(errs);
    }
    const client = await Client.update(req.params.id, req.body);
    return res.json({ client });
  } catch (err) {
    return next(err);
  }
});

// Deletes a client
// Authorization required
router.delete("/:clientId", async function (req, res, next) {
  try {
    await Client.remove(req.params.clientId);
    return res.json({ deleted: req.params.clientId });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
