"use strict";

const request = require("supertest");

const app = require("../app");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testFoodIds,
  u1Token,
  u2Token,
} = require("./_testRoutes");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

//************************************** POST / food

describe("POST /food", function () {
  test("works for admins: create food", async function () {
    const resp = await request(app)
      .post("/food")
      .send({
        name: "new-food",
        inventory: 3,
      })
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(201);
    expect(resp.body).toEqual({
      food: {
        foodId: expect.any(Number),
        name: "new-food",
        inventory: 3,
      },
    });
  });

  test("unauth for users", async function () {
    const resp = await request(app)
      .post("/food")
      .send({
        name: "new-food",
        inventory: 3,
      })
      .set("authorization", `Bearer ${u2Token}`);
    expect(resp.statusCode).toEqual(401);
  });

  test("unauth for anon", async function () {
    const resp = await request(app).post("/food").send({
      name: "new-food",
      inventory: 3,
    });
    expect(resp.statusCode).toEqual(401);
  });

  test("bad request if missing data", async function () {
    const resp = await request(app)
      .post("/food")
      .send({
        inventory: 3,
      })
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(400);
  });

  test("bad request if invalid data", async function () {
    const resp = await request(app)
      .post("/food")
      .send({
        name: "new-food",
        inventory: "3",
      })
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(400);
  });
});

// ************************************** GET /food

describe("GET /food", function () {
  test("works for admin", async function () {
    const resp = await request(app)
      .get(`/food`)
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.body).toEqual({
      food: [
        { foodId: expect.any(Number), name: "Cheese", inventory: 34 },
        { foodId: expect.any(Number), name: "Peas", inventory: 20 },
      ],
    });
  });

  test("unauth for other users", async function () {
    const resp = await request(app)
      .get(`/food`)
      .set("authorization", `Bearer ${u2Token}`);
    expect(resp.statusCode).toEqual(401);
  });

  test("unauth for anon", async function () {
    const resp = await request(app).get(`/food`);
    expect(resp.statusCode).toEqual(401);
  });
});

//************************************** GET /food/:id

describe("GET /food/:id", function () {
  test("works for admin", async function () {
    const resp = await request(app)
      .get(`/food/${testFoodIds[0]}`)
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.body).toEqual({
      food: {
        foodId: testFoodIds[0],
        name: "Peas",
        inventory: 20,
      },
    });
  });

  test("unauth for other users", async function () {
    const resp = await request(app)
      .get(`/food/${testFoodIds[0]}`)
      .set("authorization", `Bearer ${u2Token}`);
    expect(resp.statusCode).toEqual(401);
  });

  test("unauth for anon", async function () {
    const resp = await request(app).get(`/food/${testFoodIds[0]}`);
    expect(resp.statusCode).toEqual(401);
  });

  test("not found if food not found", async function () {
    const resp = await request(app)
      .get(`/food/7000`)
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(404);
  });
});

//************************************** PATCH /food/:id

describe("PATCH /food/:id", () => {
  test("works for admins", async function () {
    const resp = await request(app)
      .patch(`/food/${testFoodIds[0]}`)
      .send({
        inventory: 13,
      })
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.body).toEqual({
      food: {
        foodId: testFoodIds[0],
        name: "Peas",
        inventory: 33,
      },
    });
  });

  test("unauth for anon", async function () {
    const resp = await request(app).patch(`/food/${testFoodIds[0]}`).send({
      inventory: 13,
    });
    expect(resp.statusCode).toEqual(401);
  });

  test("not found if no such food", async function () {
    const resp = await request(app)
      .patch(`/food/8000`)
      .send({
        inventory: 10,
      })
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(404);
  });

  test("bad request if invalid data", async function () {
    const resp = await request(app)
      .patch(`/food/${testFoodIds[0]}`)
      .send({
        inventory: "Nope",
      })
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(400);
  });
});
