"use strict";

const db = require("../db");
const { NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

class PurchaseItems {
  // creates a new purchase item in purchaseItems
  static async addItems(purchaseId, foodId, data) {
    const result = await db.query(
      `INSERT INTO purchase_items (purchase_id, food_id, quantity, price_per_unit)
        VALUES($1, $2, $3, $4)
        RETURNING purchase_id AS "purchaseId", food_id AS "foodId", quantity, price_per_unit AS "pricePerUnit"`,
      [purchaseId, foodId, data.quantity, data.pricePerUnit]
    );

    let purchaseItem = result.rows[0];

    return purchaseItem;
  }

  // correct any information that was input incorrecty into the purchase order
  static async editItems(purchaseId, foodId, data) {
    const { setCols, values } = sqlForPartialUpdate(data, {
      pricePerUnit: "price_per_unit",
      quantity: "quantity",
    });
    const handleVarIdx = "$" + (values.length + 1);
    const handleVarIdx2 = "$" + (values.length + 2);

    const querySql = `UPDATE purchase_items
      SET ${setCols} 
      WHERE purchase_id = ${handleVarIdx} AND food_id = ${handleVarIdx2}
      RETURNING purchase_id AS "purchaseId",
                food_id AS "foodId", 
                price_per_unit AS "pricePerUnit", 
                quantity`;

    const result = await db.query(querySql, [...values, purchaseId, foodId]);
    let purchaseItem = result.rows[0];
    console.log(purchaseItem);

    if (!purchaseItem) {
      throw new NotFoundError(
        `No such item from purchase order: ${purchaseId}`
      );
    }

    return purchaseItem;
  }

  // deletes an item in purchaseItems
  static async deleteItems(purchaseId, foodId) {
    const result = await db.query(
      `DELETE FROM purchase_items 
      WHERE purchase_id =$1 AND food_id = $2
        RETURNING purchase_id AS "purchaseId", food_id AS "foodId", quantity, price_per_unit AS "pricePerUnit"`,
      [purchaseId, foodId]
    );

    let purchaseItem = result.rows[0];
    if (!purchaseItem)
      throw new NotFoundError(`No item from purchase order: ${purchaseId}`);
  }
}

module.exports = PurchaseItems;
