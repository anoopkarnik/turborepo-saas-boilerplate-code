import { PrismaClient } from "@prisma/client";
// convert this to a singleton for nextjs
export const prismaClient = new PrismaClient();