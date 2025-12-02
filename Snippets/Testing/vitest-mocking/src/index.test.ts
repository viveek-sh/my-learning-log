import { describe, expect, it, should, vi } from "vitest";
import request from "supertest";
import { app } from "./index.js";
import { prisma } from "./__mocks__/db.js";

//Mocking the Prisma Client
// This only mocks single client
// vi.mock("./db", () => ({
//   prisma: {
//     sum: {
//       create: vi.fn(),
//     },
//   },
// }));

//This will pick up mocked clients from [__mocks__] dir
vi.mock("./db");

describe("Endpoint: /sum, Method : POST", () => {
  it("Should return sum of two numbers correctly", async () => {
    const res = await request(app).post("/sum").send({
      num1: 20,
      num2: 10,
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.answer).toBe(30);
  });

  it("Should return Invalid Input for Invalid Inputs", async () => {
    const res = await request(app)
      .post("/sum")
      .send({
        num1: "abs",
        num2: [1, 2, 3],
      });
    expect(res.statusCode).toBe(411);
    expect(res.body.message).toBe("Inavlid Inputs");
  });
});

describe("Endpoint : /user, Method : get", () => {
  it("Should return user Email", async () => {
    //This will return a dummy return for the DB call that endpoint depends

    prisma.user.findUnique.mockResolvedValue({
      id: "b934703c-bbe7-40b5-b8ad-f5f245935782",
      email: "admin@example.com",
      name: "Administrator",
    });
    const res = await request(app)
      .get("/user")
      .query({ userID: "b934703c-bbe7-40b5-b8ad-f5f245935782" });

    expect(res.statusCode).toBe(200);
    expect(res.body.user.email).toBe("admin@example.com");
  });
});

// Spying on DB call
describe("Endpoint : /user, Method : POST", () => {
  it("Should add a user in the DB with proper inputs", async () => {
    prisma.user.create.mockResolvedValue({
      id: "b934703c-bbe7-40b5-b8ad-f5f245935782",
      email: "admin@example.com",
      name: "Administrator",
    });
    vi.spyOn(prisma.user, "create");
    const res = await request(app).post("/user").send({
      userID: "b934703c-bbe7-40b5-b8ad-f5f245935782",
      email: "admin@example.com",
      name: "Administrator",
    });

    expect(prisma.user.create).toHaveBeenCalledWith({
      data: {
        id: "b934703c-bbe7-40b5-b8ad-f5f245935782",
        email: "admin@example.com",
        name: "Administrator",
      },
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("User Created Succesfully");
  });
});
