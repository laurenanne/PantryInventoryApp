"use strict";

describe("config can come from env", function () {
  test("works", function () {
    process.env.SECRET_KEY = "test";
    process.env.PORT = "5000";
    process.env.DATABASE_URL = "mydatabase";
    process.env.NODE_ENV = "test";

    const config = require("./config");
    expect(config.SECRET_KEY).toEqual("test");
    expect(config.PORT).toEqual(5000);
    expect(config.getDatabaseUri()).toEqual("pantry_test");
    expect(config.BCRYPT_WORK_FACTOR).toEqual(1);

    delete process.env.SECRET_KEY;
    delete process.env.PORT;
    delete process.env.BCRYPT_WORK_FACTOR;
    delete process.env.DATABASE_URL;

    expect(config.getDatabaseUri()).toEqual("pantry_test");
    process.env.NODE_ENV = "production";

    expect(config.getDatabaseUri()).toEqual("pantry");
  });
});
