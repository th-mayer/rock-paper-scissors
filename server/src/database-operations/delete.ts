import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const deleteUserWithId = async (user_id: number) => {
  await prisma.user.delete({
    where: {
      id: user_id,
    },
  });
  console.log("Deleted User with id " + user_id);
};

export const deleteItemWithId = async (item_id: number) => {
  await prisma.item.delete({
    where: {
      id: item_id,
    },
  });
  console.log("Deleted Item with id " + item_id);
};

export const deleteUserItemWithIds = async (
  user_id: number,
  item_id: number
) => {
  await prisma.userItem.deleteMany({
    where: {
      userId: user_id,
      itemId: item_id,
    },
  });
};
