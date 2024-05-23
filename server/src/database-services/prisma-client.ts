import { PrismaClient } from "@prisma/client";
import { DbUser } from "./DbUser";
// There should only be one PrismaClient at a time!
const prismaClient = new PrismaClient();
const dbUsers = new DbUser(prismaClient.user);
export default dbUsers;