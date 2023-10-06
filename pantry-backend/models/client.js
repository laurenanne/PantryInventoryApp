const db = require("../db");
const { NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

class Client {
  // creates a new client
  static async create(data) {
    const result = await db.query(
      `INSERT INTO clients
    (first_name,
    alt_first_name,
    last_name,
    alt_last_name, 
    address,
    phone,
    alt_phone,
    number_adults_in_family,
    number_kids_in_family,
    receive_benefits,
    is_eligible, 
    race,
    is_hispanic, 
    create_date,
    last_visit
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
    RETURNING client_id AS "clientId", first_name AS "firstName", last_name AS "lastName", alt_first_name AS "altFirstName", alt_last_name AS "altLastName", phone, alt_phone AS "altPhone", address`,
      [
        data.firstName,
        data.altFirstName,
        data.lastName,
        data.altLastName,
        data.address,
        data.phone,
        data.altPhone,
        data.numberAdultsInFamily,
        data.numberKidsInFamily,
        data.receiveBenefits,
        data.isEligible,
        data.race,
        data.isHispanic,
        data.createDate,
        data.lastVisit,
      ]
    );

    const client = result.rows[0];

    return client;
  }

  // gets all clients or a subset based on optional parameters
  //   search Filter
  //   -on lastName (will find case insensitive partial matches)
  //   -on altLastName (will find case insensitive partial matches)
  //   -on address (will find partial matches)
  //   -on phone number
  //   -on altPhoneNumber

  static async find(searchFilters = {}) {
    let query = `SELECT client_id AS "clientId",
            first_name AS "firstName",
            alt_first_name AS "altFirstName",
            last_name AS "lastName",
            alt_last_name AS "altLastName", 
            address,
            phone,
            alt_phone AS "altPhone",
            number_adults_in_family AS "numberAdultsInFamily",
            number_kids_in_family AS "numberKidsInFamily",
            receive_benefits AS "receiveBenefits",
            is_eligible AS "isEligible", 
            race,
            is_hispanic AS "isHispanic", 
            create_date AS "createDate",
            last_visit AS "lastVisit"
        FROM clients`;

    let whereStatement = [];
    let queryVal = [];

    let order = "ORDER BY last_name, first_name";

    const { lastName, address, phone } = searchFilters;

    if (lastName !== undefined) {
      queryVal.push(`${lastName}%`);
      queryVal.push(`${lastName}%`);
      whereStatement.push(
        `last_name ILIKE $${queryVal.length - 1} OR alt_last_name ILIKE $${
          queryVal.length
        }`
      );
    }

    if (address !== undefined) {
      queryVal.push(`${address}%`);
      whereStatement.push(`address ILIKE $${queryVal.length}`);
    }

    if (phone !== undefined) {
      queryVal.push(`${phone}`);
      queryVal.push(`${phone}`);
      whereStatement.push(
        `phone LIKE $${queryVal.length - 1} OR alt_phone LIKE $${
          queryVal.length
        }`
      );
    }

    // final query string to add to search
    if (whereStatement.length > 0) {
      query = query + " WHERE " + whereStatement.join(" AND ");
    }

    query = query + " " + order;

    const result = await db.query(query, queryVal);

    return result.rows;
  }

  // gets the client information based on clientId
  static async get(clientId) {
    const result = await db.query(
      `SELECT client_id AS "clientId",
            first_name AS "firstName",
            alt_first_name AS "altFirstName",
            last_name AS "lastName",
            alt_last_name AS "altLastName", 
            address,
            phone,
            alt_phone AS "altPhone",
            number_adults_in_family AS "numberAdultsInFamily",
            number_kids_in_family AS "numberKidsInFamily",
            receive_benefits AS "receiveBenefits",
            is_eligible AS "isEligible", 
            race,
            is_hispanic AS "isHispanic", 
            create_date AS "createDate",
            last_visit AS "lastVisit"
        FROM clients
        WHERE client_id = $1`,
      [clientId]
    );

    let client = result.rows[0];

    if (!client) throw new NotFoundError(`No client: ${clientId}`);

    const clientOrders = await db.query(
      `SELECT client_id AS "clientId", 
              order_id AS "orderId",
              date
           FROM orders
           WHERE client_id = $1`,
      [clientId]
    );

    client.orders = clientOrders.rows;
    return client;
  }

  // update client information
  static async update(clientId, data) {
    const { setCols, values } = sqlForPartialUpdate(data, {
      firstName: "first_name",
      altFirstName: "alt_first_name",
      lastName: "last_name",
      altLastName: "alt_last_name",
      address: "address",
      phone: "phone",
      altPhone: "alt_phone",
      numberAdultsInFamily: "number_adults_in_family",
      numberKidsInFamily: "number_kids_in_family",
      receiveBenefits: "receive_benefits",
      isEligible: "is_eligible",
      race: "race",
      isHispanic: "is_hispanic",
      lastVisit: "last_visit",
    });
    const handleVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE clients 
                    SET ${setCols} 
                    WHERE client_id = ${handleVarIdx} 
                    RETURNING client_id AS "clientId", 
                              first_name AS "firstName", 
                              last_name AS "lastName", 
                              alt_first_name AS "altFirstName", 
                              alt_last_name AS "altLastName", 
                              phone, 
                              alt_phone AS "altPhone", 
                              address
                              `;
    const result = await db.query(querySql, [...values, clientId]);
    const client = result.rows[0];

    if (!client) throw new NotFoundError(`No client: ${clientId}`);

    return client;
  }

  // delete a client from the database
  static async remove(clientId) {
    const result = await db.query(
      `DELETE
           FROM clients
           WHERE client_id = $1
           RETURNING client_id`,
      [clientId]
    );
    const client = result.rows[0];

    if (!client) throw new NotFoundError(`No client: ${clientId}`);
  }
}

module.exports = Client;
