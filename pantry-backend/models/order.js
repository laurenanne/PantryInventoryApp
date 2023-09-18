"use strict";

const db = require("../db");
const moment = require("moment");
const { NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");
let date = moment();
console.log(date);
let currentDate = date.format("YYYY-MM-DD");

class Order {
  // creates a new order in orders
  static async create(data) {
    const result = await db.query(
      `INSERT INTO orders (client_id, date)
      VALUES($1, $2)
      RETURNING order_id AS "orderId", client_id AS "clientId", date`,
      [data.clientId, currentDate]
    );

    let order = result.rows[0];

    return order;
  }

  // gets all orders
  static async getAll() {
    const result = await db.query(
      `SELECT order_id AS "orderId",
              client_id AS "clientId",
              date
        FROM orders
        ORDER BY date`
    );
    return result.rows;
  }

  // get an order based on orderId
  static async get(orderId) {
    const result = await db.query(
      `SELECT o.order_id, o.client_id, o.date, f.food_id, f.name, oi.quantity
      FROM orders AS o
      LEFT JOIN order_items AS oi
      ON o.order_id = oi.order_id
      LEFT JOIN food as f ON oi.food_id = f.food_id
        WHERE o.order_id = $1`,
      [orderId]
    );

    if (!result.rows[0]) throw new NotFoundError(`No order: ${orderId}`);

    let { order_id, client_id, date } = result.rows[0];
    let food = result.rows.map((r) => {
      const container = {};

      container.food_id = r.food_id;
      container.name = r.name;
      container.quantity = r.quantity;

      return container;
    });

    return { order_id, client_id, date, food };
  }

  // delete an order from the database
  static async remove(id) {
    const result = await db.query(
      `DELETE
           FROM orders
           WHERE order_id = $1
           RETURNING order_id AS orderId`,
      [id]
    );
    const order = result.rows[0];

    if (!order) throw new NotFoundError(`No order: ${id}`);
  }
}

module.exports = Order;
