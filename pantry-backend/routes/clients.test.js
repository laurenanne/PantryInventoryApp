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
  u1Token,
  u2Token,
  testFoodIds,
} = require("./_testRoutes");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

//************************************** POST /clients

describe("POST /clients", function () {
  test("works for admins: create client", async function () {
    const resp = await request(app)
      .post("/clients")
      .send({
        firstName: "First",
        altFirstName: "",
        lastName: "Last",
        altLastName: "",
        address: "1000 Shore Road, Brooklyn, NY 10000",
        phone: "000-000-0000",
        altPhone: "",
        numberAdultsInFamily: 1,
        numberKidsInFamily: 2,
        receiveBenefits: "Yes",
        isEligible: true,
        race: "",
        isHispanic: "Yes",
        createDate: "09-19-23",
      })
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(201);
    expect(resp.body).toEqual({
      client: {
        clientId: expect.any(Number),
        firstName: "First",
        altFirstName: "",
        lastName: "Last",
        altLastName: "",
        address: "1000 Shore Road, Brooklyn, NY 10000",
        phone: "000-000-0000",
        altPhone: "",
      },
    });
  });

  test("unauth for users", async function () {
    const resp = await request(app)
      .post("/clients")
      .send({
        firstName: "First",
        altFirstName: "",
        lastName: "Last",
        altLastName: "",
        address: "1000 Shore Road, Brooklyn, NY 10000",
        phone: "000-000-0000",
        altPhone: "",
        numberAdultsInFamily: 1,
        numberKidsInFamily: 2,
        receiveBenefits: "Yes",
        isEligible: true,
        race: "",
        isHispanic: "Yes",
        createDate: "09-19-23",
      })
      .set("authorization", `Bearer ${u2Token}`);
    expect(resp.statusCode).toEqual(401);
  });

  test("unauth for anon", async function () {
    const resp = await request(app).post("/clients").send({
      firstName: "First",
      altFirstName: "",
      lastName: "Last",
      altLastName: "",
      address: "1000 Shore Road, Brooklyn, NY 10000",
      phone: "000-000-0000",
      altPhone: "",
      numberAdultsInFamily: 1,
      numberKidsInFamily: 2,
      receiveBenefits: "Yes",
      isEligible: true,
      race: "",
      isHispanic: "Yes",
      createDate: "09-19-23",
    });
    expect(resp.statusCode).toEqual(401);
  });

  test("bad request if missing data", async function () {
    const resp = await request(app)
      .post("/clients")
      .send({
        firstName: "First",
        altFirstName: "",
        lastName: "Last",
        altLastName: "",
        phone: "000-000-0000",
        altPhone: "",
      })

      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(400);
  });

  test("bad request if invalid data", async function () {
    const resp = await request(app)
      .post("/clients")
      .send({
        firstName: 123456,
        altFirstName: "",
        lastName: "Last",
        altLastName: "",
        address: "1000 Shore Road, Brooklyn, NY 10000",
        phone: "000-000-0000",
        altPhone: "",
        numberAdultsInFamily: 1,
        numberKidsInFamily: 2,
        receiveBenefits: "Yes",
        isEligible: true,
        race: "",
        isHispanic: "Yes",
        createDate: "09-19-23",
      })
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(400);
  });
});

// *************************************************** GET/clients

describe("GET /clients", function () {
  test("works for admin", async function () {
    const resp = await request(app)
      .get(`/clients`)
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.body).toEqual({
      clients: [
        {
          clientId: testClientIds[0],
          firstName: "ClientFirst",
          altFirstName: "",
          lastName: "ClientLast",
          altLastName: "",
          address: "256 Main Street Brooklyn, NY 10000",
          phone: "000-000-0000",
          altPhone: "",
          numberAdultsInFamily: 2,
          numberKidsInFamily: 0,
          receiveBenefits: "No",
          isEligible: true,
          race: "white",
          isHispanic: "Prefer not to say",
          createDate: "2023-09-18T04:00:00.000Z",
          lastVisit: null,
        },
      ],
    });
  });

  test("unauth for other users", async function () {
    const resp = await request(app)
      .get(`/clients`)
      .set("authorization", `Bearer ${u2Token}`);
    expect(resp.statusCode).toEqual(401);
  });

  test("unauth for anon", async function () {
    const resp = await request(app).get(`/clients`);
    expect(resp.statusCode).toEqual(401);
  });

  test("works: filtering", async function () {
    const resp = await request(app)
      .get(`/clients`)
      .query({ lastName: "ClientLast" })
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.body).toEqual({
      clients: [
        {
          clientId: testClientIds[0],
          firstName: "ClientFirst",
          altFirstName: "",
          lastName: "ClientLast",
          altLastName: "",
          address: "256 Main Street Brooklyn, NY 10000",
          phone: "000-000-0000",
          altPhone: "",
          numberAdultsInFamily: 2,
          numberKidsInFamily: 0,
          receiveBenefits: "No",
          isEligible: true,
          race: "white",
          isHispanic: "Prefer not to say",
          createDate: "2023-09-18T04:00:00.000Z",
          lastVisit: null,
        },
      ],
    });
  });

  test("bad request on invalid filter key", async function () {
    const resp = await request(app)
      .get(`/clients`)
      .query({ numberAdultsInFamily: 2 })
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(400);
  });
});

//************************************** GET /clients/:id

describe("GET /clients/:id", function () {
  test("works for admin", async function () {
    const resp = await request(app)
      .get(`/clients/${testClientIds[0]}`)
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.body).toEqual({
      client: {
        clientId: testClientIds[0],
        firstName: "ClientFirst",
        altFirstName: "",
        lastName: "ClientLast",
        altLastName: "",
        address: "256 Main Street Brooklyn, NY 10000",
        phone: "000-000-0000",
        altPhone: "",
        numberAdultsInFamily: 2,
        numberKidsInFamily: 0,
        receiveBenefits: "No",
        isEligible: true,
        race: "white",
        isHispanic: "Prefer not to say",
        createDate: "2023-09-18T04:00:00.000Z",
        lastVisit: null,
        orders: [expect.any(Number), expect.any(Number)],
      },
    });
  });

  test("unauth for other users", async function () {
    const resp = await request(app)
      .get(`/clients/${testClientIds[0]}`)
      .set("authorization", `Bearer ${u2Token}`);
    expect(resp.statusCode).toEqual(401);
  });

  test("unauth for anon", async function () {
    const resp = await request(app).get(`/clients/${testClientIds[0]}`);
    expect(resp.statusCode).toEqual(401);
  });

  test("not found if client not found", async function () {
    const resp = await request(app)
      .get(`/clients/12345`)
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(404);
  });
});

// ************************************** PATCH /clients/:id

describe("PATCH /clients/:id", () => {
  test("works for admins", async function () {
    const resp = await request(app)
      .patch(`/clients/${testClientIds[0]}`)
      .send({
        firstName: "New",
      })
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.body).toEqual({
      client: {
        clientId: testClientIds[0],
        firstName: "New",
        altFirstName: "",
        lastName: "ClientLast",
        altLastName: "",
        address: "256 Main Street Brooklyn, NY 10000",
        phone: "000-000-0000",
        altPhone: "",
      },
    });
  });

  test("unauth for anon", async function () {
    const resp = await request(app).patch(`/clients/${testClientIds[0]}`).send({
      firstName: "New",
    });
    expect(resp.statusCode).toEqual(401);
  });

  test("unauth for non admin", async function () {
    const resp = await request(app)
      .patch(`/clients/${testClientIds[0]}`)
      .send({
        firstName: "New",
      })
      .set("authorization", `Bearer ${u2Token}`);
    expect(resp.statusCode).toEqual(401);
  });

  test("not found if no such user", async function () {
    const resp = await request(app)
      .patch(`/clients/12345`)
      .send({
        firstName: "Nope",
      })
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(404);
  });

  test("bad request if invalid data", async function () {
    const resp = await request(app)
      .patch(`/clients/${testClientIds[0]}`)
      .send({
        firstName: 42,
      })
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(400);
  });
});

//************************************** DELETE /clients/:id

describe("DELETE /clients/:id", function () {
  test("works for admin", async function () {
    const resp = await request(app)
      .delete(`/clients/${testClientIds[0]}`)
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.body).toEqual({ deleted: `${testClientIds[0]}` });
  });

  test("unauth for anon", async function () {
    const resp = await request(app).delete(`/clients/${testClientIds[0]}`);
    expect(resp.statusCode).toEqual(401);
  });

  test("not found if user missing", async function () {
    const resp = await request(app)
      .delete(`/clients/123456`)
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(404);
  });
});

//************************************** POST /clients/:id/orders

describe("POST /clients/:id/orders", function () {
  test("works for admin", async function () {
    let date = moment();
    let currentDate = date.format("YYYY-MM-DD");

    const resp = await request(app)
      .post(`/clients/${testClientIds[0]}/orders`)
      .send({ date: currentDate })
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(201);
    expect(resp.body).toEqual({
      order: {
        orderId: expect.any(Number),
        clientId: testClientIds[0],
        date: `${currentDate}T04:00:00.000Z`,
      },
    });
  });

  test("unauth for users", async function () {
    let date = moment();
    let currentDate = date.format("YYYY-MM-DD");

    const resp = await request(app)
      .post(`/clients/${testClientIds[0]}/orders`)
      .send({ date: currentDate })
      .set("authorization", `Bearer ${u2Token}`);
    expect(resp.statusCode).toEqual(401);
  });

  test("unauth for anon", async function () {
    let date = moment();
    let currentDate = date.format("YYYY-MM-DD");

    const resp = await request(app)
      .post(`/clients/${testClientIds[0]}/orders`)
      .send({ date: currentDate });
    expect(resp.statusCode).toEqual(401);
  });
});

//************************************** GET /clients/:id/orders/id

describe("GET /clients/:id/orders/:orderId", function () {
  test("works for admin", async function () {
    let date = moment();
    let currentDate = date.format("YYYY-MM-DD");

    const resp = await request(app)
      .get(`/clients/${testClientIds[0]}/orders/${testOrderIds[0]}`)
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
      .get(`/clients/${testClientIds[0]}/orders/${testOrderIds[0]}`)
      .set("authorization", `Bearer ${u2Token}`);
    expect(resp.statusCode).toEqual(401);
  });

  test("unauth for anon", async function () {
    const resp = await request(app).get(
      `/clients/${testClientIds[0]}/orders/${testOrderIds[0]}`
    );
    expect(resp.statusCode).toEqual(401);
  });

  test("not found if order missing", async function () {
    const resp = await request(app)
      .get(`/clients/${testClientIds[0]}/orders/123456`)
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(404);
  });
});
