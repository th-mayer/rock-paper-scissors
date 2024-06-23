import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";
import config from "../json/config.json";

/**
 * DONT INSTANTIATE THIS CLASS!
 * USE THE "dbUsers" const from database-services/prisma-client.ts !
 */
// TODO: make this a singleton
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

  // UPDATE
  async update(user_id: number, data: any) {
    const user = await this.getUser(user_id);
    if (!user) throw Error("User not found");
    if (!data.exItem) throw Error("No replacement Item chosen!");
    // update items
    if (data.item) {
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
                name: data.item.name,
                description: data.item.description,
                modifier: data.item.modifier,
                kind: data.item.kind,
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
      return updatedUser;
    }
    throw Error("Error when updating User");
  }

  async updateItemCoin(user_id: number) {
    const user = await this.getUser(user_id);
    if (!user) throw Error("User not found");
    // increase ItemCoin by 1 after user has won a game
    const updatedUser = await this.prismaUser.update({
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

  withoutHash(user: User) {
    const { hash, ...userWithoutHash } = user;
    return userWithoutHash;
  }
}
