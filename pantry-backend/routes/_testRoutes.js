"use strict";

const db = require("../db.js");
const Client = require("../models/client");
const Food = require("../models/food");
const Order = require("../models/order");
const OrderItems = require("../models/orderItems");
const Purchase = require("../models/purchase");
const PurchaseItems = require("../models/purchaseItems");
const User = require("../models/user");
const moment = require("moment");
const { createToken } = require("../helpers/tokens");

const testFoodIds = [];
const testOrderIds = [];
const testPurchaseIds = [];
const testClientIds = [];

let date = moment();
let currentDate = date.format("YYYY-MM-DD");

async function commonBeforeAll() {
  await db.query("DELETE FROM users");
  await db.query("DELETE FROM food");
  await db.query("DELETE FROM clients");
  await db.query("DELETE FROM orders");
  await db.query("DELETE FROM purchases");

  await User.register({
    username: "u1",
    firstName: "U1F",
    lastName: "U1L",
    email: "user1@user.com",
    password: "password1",
    isAdmin: true,
  });
  await User.register({
    username: "u2",
    firstName: "U2F",
    lastName: "U2L",
    email: "user2@user.com",
    password: "password2",
    isAdmin: false,
  });

  let client1 = await Client.create({
    firstName: "ClientFirst",
    altFirstName: "",
    lastName: "ClientLast",
    altLastName: "",
    address: "256 Main Street Brooklyn, NY 10000",
    phone: "000-000-0000",
    altPhone: "",
    numberAdultsInFamily: 2,
    numberKidsInFamily: 0,
    receiveBenefits: "No",
    isEligible: true,
    race: "white",
    isHispanic: "Prefer not to say",
    createDate: "09-18-23",
    lastVisit: null,
  });

  testClientIds[0] = client1.clientId;

  let food1 = await Food.create({
    name: "Peas",
    inventory: 20,
  });

  testFoodIds[0] = food1.foodId;

  let food2 = await Food.create({
    name: "Cheese",
    inventory: 34,
  });

  testFoodIds[1] = food2.foodId;

  testOrderIds[0] = (
    await Order.create({ clientId: client1.clientId })
  ).orderId;
  testOrderIds[1] = (
    await Order.create({ clientId: client1.clientId })
  ).orderId;

  await OrderItems.addItems(testOrderIds[0], testFoodIds[0], { quantity: 3 });
  await OrderItems.addItems(testOrderIds[0], testFoodIds[1], { quantity: 10 });

  testPurchaseIds[0] = (await Purchase.create({ date: "09-18-23" })).purchaseId;
  testPurchaseIds[1] = (await Purchase.create({ date: "08-10-23" })).purchaseId;

  await PurchaseItems.addItems(testPurchaseIds[0], testFoodIds[0], {
    quantity: 40,
    pricePerUnit: 3.55,
  });
  await PurchaseItems.addItems(testPurchaseIds[0], testFoodIds[1], {
    quantity: 30,
    pricePerUnit: 2.65,
  });
}

async function commonBeforeEach() {
  await db.query("BEGIN");
}

async function commonAfterEach() {
  await db.query("ROLLBACK");
}

async function commonAfterAll() {
  await db.end();
}

const u1Token = createToken({ username: "u1", isAdmin: true });
const u2Token = createToken({ username: "u2", isAdmin: false });

module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testClientIds,
  testFoodIds,
  testOrderIds,
  testPurchaseIds,
  u1Token,
  u2Token,
};
