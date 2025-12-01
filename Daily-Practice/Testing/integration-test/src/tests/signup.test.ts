import { describe, it, expect } from "vitest";
import { app } from "../index.js";
import request from "supertest";

describe("POST /Signup", () => {
  it("Should add user info to the DB", async () => {
    const res = await request(app).post("/signup").send({
      name: "Admin",
      email: "admin@example.com",
      password: "Admin@123",
    });

    expect(res.status).toBe(200);
    expect(res.body.userID).toEqual(expect.any(Number));
    expect(res.body.userName).toBe("Admin");
  });
});
