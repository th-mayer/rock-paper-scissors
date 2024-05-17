import { PrismaClient } from "@prisma/client";
// There should only be one PrismaClient at a time!
let prismaClient = new PrismaClient();
export default prismaClient;