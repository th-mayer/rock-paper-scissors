import { PrismaClient } from "@prisma/client";
import { DbUser } from "./DbUser";
import { DbGenItem } from "./DbGenItem";

// There should only be one PrismaClient at a time!
const prismaClient = new PrismaClient();
export const dbUsers = new DbUser(prismaClient.user);
export const dbGenItem = new DbGenItem(prismaClient.genItem);
