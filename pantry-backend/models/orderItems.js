"use strict";

const { NotFoundError } = require("../expressError");
const db = require("../db");

class OrderItems {
  // creates a new orderitem in orderItems
  static async addItems(orderId, foodId, data) {
    const result = await db.query(
      `INSERT INTO order_items (order_id, food_id, quantity)
        VALUES($1, $2, $3)
        RETURNING order_id AS "orderId", food_id AS "foodId", quantity`,
      [orderId, foodId, data.quantity]
    );

    let orderItem = result.rows[0];

    return orderItem;
  }

  // correct quantity for a food item in the client order
  static async editItems(orderId, foodId, quantity) {
    const querySql = `UPDATE order_items
      SET quantity = $1
      WHERE order_id = $2 AND food_id = $3
      RETURNING order_id AS "orderId",
                food_id AS "foodId", 
                quantity`;

    const result = await db.query(querySql, [quantity, orderId, foodId]);
    let orderItem = result.rows[0];

    if (!orderItem) {
      throw new NotFoundError(`No such item from client order: ${orderId}`);
    }
    return orderItem;
  }

  // deletes an item from the client's order
  static async deleteItems(orderId, foodId) {
    const result = await db.query(
      `DELETE FROM order_items 
      WHERE order_id =$1 AND food_id = $2
        RETURNING order_id AS "orderId", food_id AS "foodId", quantity`,
      [orderId, foodId]
    );

    let orderItem = result.rows[0];
    if (!orderItem)
      throw new NotFoundError(`No item from client order: ${orderId}`);
  }
}

module.exports = OrderItems;
