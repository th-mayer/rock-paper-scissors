import { Item, PrismaClient } from "@prisma/client";

export class DbItem {
  constructor(private readonly prismaItem: PrismaClient["item"]) {}

  //CREATE
  async createItem(newItemType: Item) {
    if (
      await this.prismaItem.findFirst({
        where: {
          name: newItemType.name,
        },
      })
    ) {
      throw "Item type with name " + newItemType.name + "already exists";
    }

    await this.prismaItem.create({
      data: {
        name: newItemType.name,
        description: newItemType.description,
        effect: newItemType.effect,
      },
    });
  }

  // READ
  async getAllItems() {
    return await this.prismaItem.findMany();
  }

  async getItemWithId(item_id: number) {
    return await this.prismaItem.findFirstOrThrow({
      where: {
        id: item_id,
      },
    });
  }

  // UPDATE
  async updateItemName(item_id: number, item_name: string) {
    // TODO
  }

  async updateItemDescription(item_id: number, item_des: string) {
    // TODO
  }

  async updateItemEffect(item_id: number, item_effect: string) {
    // TODO
  }

  // DELETE
  async deleteItemWithId(item_id: number) {
    await this.prismaItem.delete({
      where: {
        id: item_id,
      },
    });
  }
}
