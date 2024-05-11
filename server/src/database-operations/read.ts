import { Item, PrismaClient, User, UserItem } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllUsers = async () => {
  return await prisma.user.findMany();
};

export const getUserWithId = async (search_id: number) => {
  return await prisma.user.findUniqueOrThrow({
    where: {
      id: search_id,
    },
  });
};

export const getAllItemTypes = async () => {
  return await prisma.item.findMany();
};

export const getItemWithId = async (search_id: number) => {
  return await prisma.item.findUniqueOrThrow({
    where: {
      id: search_id,
    },
  });
};
