import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";
import config from "../json/config.json";
import { generateRandomItem } from "../generators/randomItemGenerator";
import { dbGenItem } from "./prisma-client";

/**
 * DONT INSTANTIATE THIS CLASS!
 * USE THE "dbUsers" const from database-services/prisma-client.ts !
 */
export class DbUser {
  private secret = config.secret;
  private prismaUser: PrismaClient["user"];

  constructor(prisma: PrismaClient["user"]) {
    this.prismaUser = prisma;
  }

  async authenticate({ username, hash }: { username: string; hash: string }) {
    const user = await this.prismaUser.findUnique({
      where: {
        username: username,
      },
    });

    if (!user || !(await bcrypt.compare(hash, user.hash))) {
      throw Error("Username or Password incorrect!");
    }

    //auth successful, sign JWT
    const token = sign({ sub: user.id }, this.secret, { expiresIn: "1d" });
    return { ...this.withoutHash(user), token };
  }

  // CREATE
  async createUser(newUserData: User) {
    // validate
    if (
      await this.prismaUser.findFirst({
        where: {
          username: newUserData.username,
        },
      })
    ) {
      throw Error("Username " + newUserData.username + " is already taken");
    }

    newUserData.hash = bcrypt.hashSync(newUserData.hash);

    await this.prismaUser.create({
      data: {
        email: newUserData.email,
        username: newUserData.username,
        hash: newUserData.hash,
        items: {
          create: [{}, {}, {}],
        },
        genItems: {
          create: [{}, {}, {}],
        },
      },
    });
  }

  // READ
  async getAllUsers() {
    return await this.prismaUser.findMany({
      include: {
        items: true,
      },
    });
  }

  async getUserById(user_id: number) {
    return await this.getUser(user_id);
  }

  async getLeaderboard() {
    const users = await this.prismaUser.findMany({
      orderBy: {
        wins: "desc",
      },
    });
    const sanitizedUser: {
      id: number;
      username: string;
      itemCoin: number;
      wins: number;
    }[] = [];
    users.forEach((user) => {
      const noHash = this.withoutHash(user);
      const noEmail = this.withoutEmail(noHash);
      sanitizedUser.push(noEmail);
    });
    return sanitizedUser;
  }

  async generateItems(user_id: number) {
    const user = await this.getUser(user_id);
    if (!user) throw Error("User not found");
    const item1 = generateRandomItem();
    const item2 = generateRandomItem();
    const item3 = generateRandomItem();

    await dbGenItem.delete(user_id);

    const genItems = await this.prismaUser.update({
      where: {
        id: user_id,
      },
      data: {
        genItems: {
          create: [
            {
              kind: item1.kind,
              modifier: item1.modifier,
            },
            {
              kind: item2.kind,
              modifier: item2.modifier,
            },
            {
              kind: item3.kind,
              modifier: item3.modifier,
            },
          ],
        },
      },
      include: {
        genItems: true,
      },
    });
    return genItems;
  }

  // UPDATE
  async updateUser(user_id: number, data: any) {
    const user = await this.getUser(user_id);
    if (!user) throw Error("User not found");

    // check username
    const changedUsername = data.username && user.username !== data.username;
    if (
      changedUsername &&
      (await this.prismaUser.findFirst({
        where: {
          username: data.username,
        },
      }))
    ) {
      throw Error("Username " + data.username + "is already taken");
    }

    // check password
    if (data.hash) {
      data.hash = bcrypt.hashSync(data.hash);
    }

    const updatedUser = await this.prismaUser.update({
      where: {
        id: user_id,
      },
      data: {
        email: data.email,
        username: data.username,
        hash: data.hash,
      },
    });
    return updatedUser;
  }

  async updateItems(user_id: number, data: any) {
    const user = await this.getUserGenItems(user_id);
    if (!user) throw Error("User not found");
    if (!data.exItem || !data.genItem)
      throw Error("No replacement Item chosen!");

    let genItem;
    for (let item of user.genItems) {
      if (item.id === data.genItem) {
        genItem = item;
      }
    }

    // update items
    const updatedUser = await this.prismaUser.update({
      where: {
        id: user_id,
      },
      data: {
        items: {
          update: {
            where: {
              id: data.exItem,
            },
            data: {
              kind: genItem!.kind,
              modifier: genItem!.modifier,
            },
          },
        },
        itemCoin: {
          decrement: 1,
        },
      },
      include: {
        items: true,
      },
    });
    // delete generated items
    dbGenItem.delete(user_id);

    return updatedUser;
  }

  async updateWinItemCoin(user_id: number, win: boolean) {
    const user = await this.getUser(user_id);
    if (!user) throw Error("User not found");
    // increase ItemCoin by 1 after user has won a game
    let updatedUser;
    if (win) {
      updatedUser = await this.prismaUser.update({
        where: {
          id: user_id,
        },
        data: {
          itemCoin: {
            increment: 2,
          },
          wins: {
            increment: 1,
          },
        },
        include: {
          items: true,
        },
      });
    } else {
      updatedUser = await this.prismaUser.update({
        where: {
          id: user_id,
        },
        data: {
          itemCoin: {
            increment: 1,
          },
        },
        include: {
          items: true,
        },
      });
    }
    return updatedUser;
  }

  // DELETE
  async deleteUser(user_id: number) {
    await this.prismaUser.delete({
      where: {
        id: user_id,
      },
    });
  }

  // Helpers
  async getUser(id: number) {
    const user = await this.prismaUser.findFirstOrThrow({
      where: {
        id: id,
      },
      include: {
        items: true,
      },
    });
    return user;
  }

  async getUserGenItems(id: number) {
    const user = await this.prismaUser.findFirstOrThrow({
      where: {
        id: id,
      },
      include: {
        genItems: true,
      },
    });
    return user;
  }

  withoutHash(user: User) {
    const { hash, ...userWithoutHash } = user;
    return userWithoutHash;
  }

  withoutEmail(user: any) {
    const { email, ...userWithoutEmail } = user;
    return userWithoutEmail;
  }
}
