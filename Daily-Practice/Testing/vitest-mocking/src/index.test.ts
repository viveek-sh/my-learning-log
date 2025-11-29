import { describe, expect, it, vi } from "vitest";
import request from "supertest";
import { app } from "./index.js";

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
