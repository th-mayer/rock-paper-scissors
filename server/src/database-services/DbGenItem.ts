import { PrismaClient } from "@prisma/client";

export class DbGenItem {
  private prismaGenItem: PrismaClient["genItem"];

  constructor(prisma: PrismaClient["genItem"]) {
    this.prismaGenItem = prisma;
  }

  async delete(user_id: number) {
    await this.prismaGenItem.deleteMany({
      where: {
        userId: user_id,
      },
    });
  }
}
