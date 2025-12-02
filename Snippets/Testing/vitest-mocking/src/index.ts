import express, { response } from "express";
import type { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { prisma } from "./db";

export const app = express();
app.use(express.json());

const sumInput = z.object({
  num1: z.number(),
  num2: z.number(),
});

function inputValidator(req: Request, res: Response, next: NextFunction) {
  const parseRes = sumInput.safeParse(req.body);
  if (!parseRes.success) {
    return res.status(411).json({ message: "Inavlid Inputs" });
  }
  //@ts-ignore
  req.parsedInput = parseRes.data;
  next();
}

app.post("/sum", inputValidator, async (req: Request, res: Response) => {
  //@ts-ignore
  const { num1, num2 } = req.parsedInput;
  const answer = num1 + num2;

  //Example DB Call (Mocking this DB call in Testing)
  await prisma.sum.create({
    data: {
      num1,
      num2,
      sum: answer,
    },
  });
  return res.status(200).json({ answer });
});

//Testing how to return something that app is depended on to resolve like a response from DB
app.get("/user", async (req: Request, res: Response) => {
  try {
    const userID = req.query.userID;
    const user = await prisma.user.findUnique({
      where: { id: String(userID) },
    });
    res.status(200).json({ user });
  } catch (error) {
    res.status(404).json({ message: "User Does not Exsist" });
  }
});

//Spying on DB Calls
app.post("/user", async (req: Request, res: Response) => {
  try {
    const { userID, email, name } = req.body;
    const user = await prisma.user.create({
      data: {
        id: userID,
        email: email,
        name: name,
      },
    });
    res.status(200).json({ message: "User Created Succesfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error Creating an User" });
  }
});
