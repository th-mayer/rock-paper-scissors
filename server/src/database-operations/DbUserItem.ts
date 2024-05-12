import { PrismaClient, UserItem } from "@prisma/client";

export class DbUserItem {
  constructor(private readonly prismaItem: PrismaClient["userItem"]) {}

  // CREATE
  async createUserItem(userItemData: UserItem) {
    await this.prismaItem.create({
      data: {
        userId: userItemData.userId,
        itemId: userItemData.itemId,
      },
    });
  }

  // READ
  async getAllUserItems() {
    await this.prismaItem.findMany();
  }

  async getUserItemByIds(user_id: number, item_id: number) {
    await this.prismaItem.findMany({
      where: {
        userId: user_id,
        itemId: item_id,
      },
    });
  }

  // UPDATE
  // TODO ?

  // DELETE
  async deleteUserItemWithIds(user_id: number, item_id: number) {
    await this.prismaItem.deleteMany({
      where: {
        userId: user_id,
        itemId: item_id,
      },
    });
  }
}
