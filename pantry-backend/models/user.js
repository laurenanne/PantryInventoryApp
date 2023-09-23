"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql.js");
const { BCRYPT_WORK_FACTOR } = require("../config.js");

class User {
  // authenticate user with username and password
  // returns {username, first_name, last_name, email, is_admin}
  static async authenticate(username, password) {
    const result = await db.query(
      `SELECT username, 
        password, 
        first_name AS "firstName",
        last_name AS "lastName",
        email,
        is_admin AS "isAdmin"
        FROM users
        WHERE username = $1`,
      [username]
    );

    const user = result.rows[0];

    if (user) {
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid === true) {
        delete user.password;
        return user;
      }
    }
  }

  // register a new user
  static async register({
    username,
    password,
    firstName,
    lastName,
    email,
    isAdmin,
  }) {
    const dupCheck = await db.query(
      `SELECT username
        FROM users
        WHERE username = $1`,
      [username]
    );
    if (dupCheck.rows[0]) {
      throw new BadRequestError(`Duplicate username`);
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    const result = await db.query(
      `INSERT INTO users
    (username, 
        password, 
        first_name, 
        last_name, 
        email, 
        is_admin)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING username, first_name AS "firstName", last_name AS "lastName", email, is_admin AS "isAdmin"`,
      [username, hashedPassword, firstName, lastName, email, isAdmin]
    );

    const user = result.rows[0];
    return user;
  }

  // get user information based on username
  static async get(username) {
    const result = await db.query(
      `SELECT username,
            first_name AS "firstName",
            last_name AS "lastName",
            email,
            is_admin AS "isAdmin"
        FROM users
        WHERE username = $1`,
      [username]
    );

    let user = result.rows[0];
    if (!user) throw new NotFoundError(`No user: ${username}`);

    return user;
  }

  // update user information (everything but username)
  static async update(username, data) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
    }

    const { setCols, values } = sqlForPartialUpdate(data, {
      firstName: "first_name",
      lastName: "last_name",
      password: "password",
      email: "email",
    });
    const handleVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE users 
                    SET ${setCols} 
                    WHERE username = ${handleVarIdx} 
                    RETURNING username,         
                              first_name AS "firstName", 
                              last_name AS "lastName", 
                              email,
                              is_admin AS "isAdmin"`;
    const result = await db.query(querySql, [...values, username]);
    const user = result.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);

    delete user.password;
    return user;
  }

  // delete a user from the database
  static async remove(username) {
    const result = await db.query(
      `DELETE
         FROM users
         WHERE username = $1
         RETURNING username`,
      [username]
    );
    const user = result.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);
  }
}

module.exports = User;