"use strict";

const db = require("../db");
const { NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

class Purchase {
  // creates a new purchase in purchases
  static async create(data) {
    const result = await db.query(
      `INSERT INTO purchases (date)
      VALUES($1)
      RETURNING purchase_id AS "purchaseId", date`,
      [data.date]
    );

    let purchase = result.rows[0];

    return purchase;
  }

  // gets all purchases
  static async getAll() {
    const result = await db.query(
      `SELECT purchase_id AS "purchaseId", date
          FROM purchases
          ORDER BY date`
    );
    return result.rows;
  }

  // get a purchase based on PurchaseId
  static async get(id) {
    const result = await db.query(
      `SELECT p.purchase_id, p.date, f.food_id, f.name, pi.quantity, pi.price_per_unit
      FROM purchases AS p
      LEFT JOIN purchase_items AS pi
      ON p.purchase_id = pi.purchase_id
      LEFT JOIN food as f ON pi.food_id = f.food_id
        WHERE p.purchase_id = $1`,
      [id]
    );

    if (!result.rows[0]) throw new NotFoundError(`No purchase: ${id}`);

    let purchaseId = result.rows[0].purchase_id;
    let date = result.rows[0].date;

    let food = result.rows.map((r) => {
      const container = {};

      container.foodId = r.food_id;
      container.name = r.name;
      container.quantity = r.quantity;
      container.pricePerUnit = r.price_per_unit;

      return container;
    });

    return { purchaseId, date, food };
  }

  // updates the date on the Purchase order
  static async update(id, date) {
    const querySql = `UPDATE purchases
    SET date = $1
    WHERE purchase_id = $2
    RETURNING purchase_id AS "purchaseId", date`;

    const result = await db.query(querySql, [date, id]);
    let purchase = result.rows[0];

    if (!purchase) throw new NotFoundError(`No purchase order: ${id}`);

    return purchase;
  }
}

module.exports = Purchase;
