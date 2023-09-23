"use strict";

const request = require("supertest");

const app = require("../app");
const moment = require("moment");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testClientIds,
  testOrderIds,
  testFoodIds,
  u1Token,
  u2Token,
} = require("./_testRoutes");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

//************************************** GET /orders

describe("GET /orders", function () {
  test("works for admin", async function () {
    let date = moment();
    let currentDate = date.format("YYYY-MM-DD");

    const resp = await request(app)
      .get(`/orders`)
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toEqual({
      orders: [
        {
          orderId: testOrderIds[0],
          clientId: testClientIds[0],
          date: `${currentDate}T04:00:00.000Z`,
        },
        {
          orderId: testOrderIds[1],
          clientId: testClientIds[0],
          date: `${currentDate}T04:00:00.000Z`,
        },
      ],
    });
  });

  test("unauth for non admin", async function () {
    const resp = await request(app)
      .get(`/orders`)
      .set("authorization", `Bearer ${u2Token}`);
    expect(resp.statusCode).toEqual(401);
  });

  test("unauth for anon", async function () {
    const resp = await request(app).get(`/orders`);
    expect(resp.statusCode).toEqual(401);
  });
});

//************************************** GET /orders/:id

describe("GET /orders/:id", function () {
  test("works for admin", async function () {
    let date = moment();
    let currentDate = date.format("YYYY-MM-DD");

    const resp = await request(app)
      .get(`/orders/${testOrderIds[0]}`)
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toEqual({
      order: {
        orderId: testOrderIds[0],
        clientId: testClientIds[0],
        date: `${currentDate}T04:00:00.000Z`,
        food: [
          {
            foodId: testFoodIds[0],
            name: "Peas",
            quantity: 3,
          },
          {
            foodId: testFoodIds[1],
            name: "Cheese",
            quantity: 10,
          },
        ],
      },
    });
  });

  test("unauth for non admin", async function () {
    const resp = await request(app)
      .get(`/orders/${testOrderIds[0]}`)
      .set("authorization", `Bearer ${u2Token}`);
    expect(resp.statusCode).toEqual(401);
  });

  test("unauth for anon", async function () {
    const resp = await request(app).get(`/orders/${testOrderIds[0]}`);
    expect(resp.statusCode).toEqual(401);
  });

  test("not found if order missing", async function () {
    const resp = await request(app)
      .get(`/orders/123456`)
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(404);
  });
});

//************************************** DELETE /orders/:id

describe("DELETE /orders/:id", function () {
  test("works for admin", async function () {
    const resp = await request(app)
      .delete(`/orders/${testOrderIds[0]}`)
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.body).toEqual({ deleted: `${testOrderIds[0]}` });
  });

  test("unauth for anon", async function () {
    const resp = await request(app).delete(`/orders/${testOrderIds[0]}`);
    expect(resp.statusCode).toEqual(401);
  });

  test("not found if user missing", async function () {
    const resp = await request(app)
      .delete(`/orders/123456`)
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(404);
  });
});

//************************************** POST /clients/:id/orders

describe("POST /orders/:id/food/:foodId", function () {
  test("works for admin", async function () {
    const resp = await request(app)
      .post(`/orders/${testOrderIds[1]}/food/${testFoodIds[0]}`)
      .send({ quantity: 4 })
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(201);
    expect(resp.body).toEqual({
      orderItem: {
        orderId: testOrderIds[1],
        foodId: testFoodIds[0],
        quantity: 4,
      },
    });
  });

  test("unauth for users", async function () {
    const resp = await request(app)
      .post(`/orders/${testOrderIds[1]}/food/${testFoodIds[0]}`)
      .send({ quantity: 4 })
      .set("authorization", `Bearer ${u2Token}`);
    expect(resp.statusCode).toEqual(401);
  });

  test("unauth for anon", async function () {
    const resp = await request(app)
      .post(`/orders/${testOrderIds[1]}/food/${testFoodIds[0]}`)
      .send({ quantity: 4 });
    expect(resp.statusCode).toEqual(401);
  });
});

//************************************** PATCH /orders/:id/food/:foodId

describe("PATCH /orders/:id/food/:foodId", function () {
  test("works for admin", async function () {
    const resp = await request(app)
      .patch(`/orders/${testOrderIds[0]}/food/${testFoodIds[1]}`)
      .send({ quantity: 12 })
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toEqual({
      orderItem: {
        orderId: testOrderIds[0],
        foodId: testFoodIds[1],
        quantity: 12,
      },
    });
  });

  test("unauth for non admin", async function () {
    const resp = await request(app)
      .patch(`/orders/${testOrderIds[0]}/food/${testFoodIds[1]}`)
      .send({ quantity: 12 })
      .set("authorization", `Bearer ${u2Token}`);
    expect(resp.statusCode).toEqual(401);
  });

  test("unauth for anon", async function () {
    const resp = await request(app)
      .patch(`/orders/${testOrderIds[0]}/food/${testFoodIds[1]}`)
      .send({ quantity: 12 });
    expect(resp.statusCode).toEqual(401);
  });

  test("not found if order missing", async function () {
    const resp = await request(app)
      .patch(`/orders/${testOrderIds[0]}/food/97896`)
      .send({ quantity: 12 })
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(404);
  });
});

//  ************************************************ DELETE orders/:id/food/:foodId
describe("DELETE /orders/:id/food/:foodId", function () {
  test("works for admin", async function () {
    const resp = await request(app)
      .delete(`/orders/${testOrderIds[0]}/food/${testFoodIds[1]}`)
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.body).toEqual({
      deleted: `Food Id ${testFoodIds[1]} from Client Order ${testOrderIds[0]}`,
    });
  });

  test("unauth for non admin", async function () {
    const resp = await request(app)
      .delete(`/orders/${testOrderIds[0]}/food/${testFoodIds[1]}`)
      .set("authorization", `Bearer ${u2Token}`);
    expect(resp.statusCode).toEqual(401);
  });

  test("unauth for anon", async function () {
    const resp = await request(app).delete(
      `/orders/${testOrderIds[0]}/food/${testFoodIds[1]}`
    );
    expect(resp.statusCode).toEqual(401);
  });

  test("not found if order missing", async function () {
    const resp = await request(app)
      .delete(`/orders/${testOrderIds[0]}/food/97896`)
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(404);
  });
});
