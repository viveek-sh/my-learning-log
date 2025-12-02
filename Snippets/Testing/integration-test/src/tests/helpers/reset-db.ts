import { PrismaClient } from "../../generated/prisma/client.js";
//@ts-ignore
const prisma = new PrismaClient();

export function resetDB() {
  prisma.user.deleteMany();
}
