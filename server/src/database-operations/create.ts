// potentially needs to be reworked like so : https://www.prisma.io/docs/orm/prisma-client/queries/custom-models#wrap-a-model-in-a-class

import { Item, PrismaClient, User, UserItem } from "@prisma/client";

const prisma = new PrismaClient();

export const createUser = async (user: User) => {
  await prisma.user.create({
    data: {
      email: user.email,
      name: user.name,
      password: user.password,
    },
  });
  console.log("Successfully created new user " + user.name);
};

export const createItemType = async (item: Item) => {
  await prisma.item.create({
    data: {
      description: item.description,
      effect: item.effect,
      name: item.name,
    },
  });
  console.log("Successfully created new Item " + item.name);
};

export const createUserItem = async (userItem: UserItem) => {
  await prisma.userItem.create({
    data: {
      userId: userItem.userId,
      itemId: userItem.itemId,
    },
  });
  console.log(
    "Successfully created item " +
      userItem.itemId +
      "for User " +
      userItem.userId
  );
};
