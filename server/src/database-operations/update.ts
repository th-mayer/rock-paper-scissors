import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const updateUserWithId = async (
  user_id: number,
  update_field: string,
  data: string
) => {
  switch (update_field) {
    case "email":
      return await prisma.user.update({
        where: {
          id: user_id,
        },
        data: {
          email: data,
        },
      });
    case "name":
      return await prisma.user.update({
        where: {
          id: user_id,
        },
        data: {
          name: data,
        },
      });
    case "password":
      return await prisma.user.update({
        where: {
          id: user_id,
        },
        data: {
          password: data,
        },
      });
    default:
      throw new Error("No property field in User called " + update_field);
  }
};

export const updateItemWithId = async (
  item_id: number,
  update_field: string,
  data: string
) => {
  // TODO
};

export const updateUserItemWithIDs = async (user_id:number, item_id: number) => {
  // TODO
}
