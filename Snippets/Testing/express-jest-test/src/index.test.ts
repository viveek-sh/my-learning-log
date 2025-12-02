import { describe, it, expect } from "@jest/globals";
import { app } from "./index.ts";
import request from "supertest";

describe("POST /sum", () => {
  it("Should return sum of numbers", async () => {
    const res = await request(app).post("/sum").send({
      a: 10,
      b: 20,
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.ans).toBe(30);
  });
});
