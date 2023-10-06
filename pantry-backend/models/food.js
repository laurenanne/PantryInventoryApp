"use strict";

const db = require("../db");
const { NotFoundError } = require("../expressError");
// const {
//   NotFoundError,
//   BadRequestError,
//   UnauthorizedError,
// } = require("../expressError");

class Food {
  // creates a new food item
  static async create(data) {
    const result = await db.query(
      `INSERT INTO food (name, inventory)
      VALUES($1, $2)
      RETURNING food_id AS "foodId", name, inventory`,
      [data.name, data.inventory]
    );

    let food = result.rows[0];

    return food;
  }

  // gets all food items
  static async getAll() {
    const result = await db.query(
      `SELECT food_id AS "foodId", name, inventory
        FROM food
        ORDER BY name`
    );
    return result.rows;
  }

  // gets an individual food item
  static async get(foodId) {
    const result = await db.query(
      `SELECT food_id AS "foodId", name, inventory
        FROM food
        WHERE food_id = $1
        ORDER BY name`,
      [foodId]
    );

    let food = result.rows[0];
    if (!food) throw new NotFoundError(`No food item: ${foodId}`);
    return food;
  }

  // updates the inventory of each food item
  static async updateInventory(foodId, inventory) {
    const querySql = `UPDATE food 
      SET inventory = inventory + $1
      WHERE food_id = $2
      RETURNING food_id AS "foodId", name, inventory`;

    const result = await db.query(querySql, [inventory, foodId]);
    let food = result.rows[0];

    if (!food) throw new NotFoundError(`No food item: ${foodId}`);

    return food;
  }
}

module.exports = Food;
