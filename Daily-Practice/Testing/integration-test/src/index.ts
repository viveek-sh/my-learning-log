import express from "express";
import { prisma } from "./db.js";

export const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body || req.body;

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    res.status(200).json({
      message: "User Created Successfully",
      userID: user.id,
      userName: user.name,
      userEmail: user.email,
    });
  } catch (error) {
    res.status(500).json({ message: "Error Creating User" });
  }
});
