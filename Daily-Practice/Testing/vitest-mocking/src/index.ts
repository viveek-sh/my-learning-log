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
