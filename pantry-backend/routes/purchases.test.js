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
  testPurchaseIds,
  u1Token,
  u2Token,
} = require("./_testRoutes");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

// ******************************************* POST/ purchases

describe("POST /purchases", function () {
  test("works for admins: create purchase order", async function () {
    const resp = await request(app)
      .post("/purchases")
      .send({ date: "09/22/23" })
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(201);
    expect(resp.body).toEqual({
      purchase: {
        purchaseId: expect.any(Number),
        date: "2023-09-22T04:00:00.000Z",
      },
    });
  });

  test("unauth for users", async function () {
    const resp = await request(app)
      .post("/purchases")
      .send({ date: "09/22/23" })
      .set("authorization", `Bearer ${u2Token}`);
    expect(resp.statusCode).toEqual(401);
  });

  test("unauth for anon", async function () {
    const resp = await request(app)
      .post("/purchases")
      .send({ date: "09/22/23" });
    expect(resp.statusCode).toEqual(401);
  });

  test("bad request if missing data", async function () {
    const resp = await request(app)
      .post("/purchases")
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(400);
  });

  test("bad request if invalid data", async function () {
    const resp = await request(app)
      .post("/purchases")
      .send({ date: 123456 })
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(400);
  });
});

//************************************** GET /purchases

describe("GET /purchases", function () {
  test("works for admin", async function () {
    const resp = await request(app)
      .get(`/purchases`)
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toEqual({
      purchases: [
        {
          purchaseId: testPurchaseIds[1],
          date: `2023-08-10T04:00:00.000Z`,
        },
        {
          purchaseId: testPurchaseIds[0],
          date: `2023-09-18T04:00:00.000Z`,
        },
      ],
    });
  });

  test("unauth for non admin", async function () {
    const resp = await request(app)
      .get(`/purchases`)
      .set("authorization", `Bearer ${u2Token}`);
    expect(resp.statusCode).toEqual(401);
  });

  test("unauth for anon", async function () {
    const resp = await request(app).get(`/purchases`);
    expect(resp.statusCode).toEqual(401);
  });
});

//************************************** GET /purchases/:id

describe("GET /purchases/:id", function () {
  test("works for admin", async function () {
    const resp = await request(app)
      .get(`/purchases/${testPurchaseIds[0]}`)
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toEqual({
      purchase: {
        purchaseId: testPurchaseIds[0],
        date: `2023-09-18T04:00:00.000Z`,
        food: [
          {
            foodId: testFoodIds[0],
            name: "Peas",
            quantity: 40,
            pricePerUnit: "3.55",
          },
          {
            foodId: testFoodIds[1],
            name: "Cheese",
            quantity: 30,
            pricePerUnit: "2.65",
          },
        ],
      },
    });
  });

  test("unauth for non admin", async function () {
    const resp = await request(app)
      .get(`/purchases/${testPurchaseIds[0]}`)
      .set("authorization", `Bearer ${u2Token}`);
    expect(resp.statusCode).toEqual(401);
  });

  test("unauth for anon", async function () {
    const resp = await request(app).get(`/purchases/${testPurchaseIds[0]}`);
    expect(resp.statusCode).toEqual(401);
  });

  test("not found if order missing", async function () {
    const resp = await request(app)
      .get(`/purchases/345678`)
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(404);
  });
});

//************************************** PATCH /purchases/:id

describe("PATCH /purchases/:id", function () {
  test("works for admin", async function () {
    const resp = await request(app)
      .patch(`/purchases/${testPurchaseIds[0]}`)
      .send({ date: "09-10-23" })
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.body).toEqual({
      purchase: {
        purchaseId: testPurchaseIds[0],
        date: `2023-09-10T04:00:00.000Z`,
      },
    });
  });

  test("unauth for anon", async function () {
    const resp = await request(app)
      .patch(`/purchases/${testPurchaseIds[0]}`)
      .send({ date: "09-10-23" });
    expect(resp.statusCode).toEqual(401);
  });

  test("not found if purchase order is missing", async function () {
    const resp = await request(app)
      .patch(`/purchases/123456`)
      .send({ date: "09-10-23" })
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(404);
  });
});

//************************************** POST /purchases/:id/food/:foodId

describe("POST /orders/:id/food/:foodId", function () {
  test("works for admin", async function () {
    const resp = await request(app)
      .post(`/purchases/${testPurchaseIds[1]}/food/${testFoodIds[0]}`)
      .send({ quantity: 4, pricePerUnit: 2.75 })
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(201);
    expect(resp.body).toEqual({
      purchaseItem: {
        purchaseId: testPurchaseIds[1],
        foodId: testFoodIds[0],
        quantity: 4,
        pricePerUnit: "2.75",
      },
    });
  });

  test("unauth for users", async function () {
    const resp = await request(app)
      .post(`/purchases/${testPurchaseIds[1]}/food/${testFoodIds[0]}`)
      .send({ quantity: 4, pricePerUnit: 2.75 })
      .set("authorization", `Bearer ${u2Token}`);
    expect(resp.statusCode).toEqual(401);
  });

  test("unauth for anon", async function () {
    const resp = await request(app)
      .post(`/purchases/${testPurchaseIds[1]}/food/${testFoodIds[0]}`)
      .send({ quantity: 4, pricePerUnit: 2.75 });
    expect(resp.statusCode).toEqual(401);
  });
});

//************************************** PATCH /purchases/:id/food/:foodId

describe("PATCH /purchases/:id/food/:foodId", function () {
  test("works for admin", async function () {
    const resp = await request(app)
      .patch(`/purchases/${testPurchaseIds[0]}/food/${testFoodIds[1]}`)
      .send({ quantity: 12 })
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toEqual({
      purchaseItem: {
        purchaseId: testPurchaseIds[0],
        foodId: testFoodIds[1],
        quantity: 12,
        pricePerUnit: "2.65",
      },
    });
  });

  test("unauth for non admin", async function () {
    const resp = await request(app)
      .patch(`/purchases/${testPurchaseIds[0]}/food/${testFoodIds[1]}`)
      .send({ quantity: 12 })
      .set("authorization", `Bearer ${u2Token}`);
    expect(resp.statusCode).toEqual(401);
  });

  test("unauth for anon", async function () {
    const resp = await request(app)
      .patch(`/purchases/${testPurchaseIds[0]}/food/${testFoodIds[1]}`)
      .send({ quantity: 12 });
    expect(resp.statusCode).toEqual(401);
  });

  test("not found if order missing", async function () {
    const resp = await request(app)
      .patch(`/purchases/${testPurchaseIds[0]}/food/2345678`)
      .send({ quantity: 23 })
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(404);
  });
});

//  ************************************************ DELETE purchases/:id/food/:foodId
describe("DELETE /purchases/:id/food/:foodId", function () {
  test("works for admin", async function () {
    const resp = await request(app)
      .delete(`/purchases/${testPurchaseIds[0]}/food/${testFoodIds[1]}`)
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.body).toEqual({
      deleted: `Food Id ${testFoodIds[1]} from Purchase Order ${testPurchaseIds[0]}`,
    });
  });

  test("unauth for non admin", async function () {
    const resp = await request(app)
      .delete(`/purchases/${testPurchaseIds[0]}/food/${testFoodIds[1]}`)
      .set("authorization", `Bearer ${u2Token}`);
    expect(resp.statusCode).toEqual(401);
  });

  test("unauth for anon", async function () {
    const resp = await request(app).delete(
      `/purchases/${testPurchaseIds[0]}/food/${testFoodIds[1]}`
    );
    expect(resp.statusCode).toEqual(401);
  });

  test("not found if purchase missing", async function () {
    const resp = await request(app)
      .delete(`/purchases/${testPurchaseIds[0]}/food/2345678`)
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(404);
  });
});
