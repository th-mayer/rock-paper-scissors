import { Item, PrismaClient, User } from "@prisma/client";
import bcrypt from "bcryptjs";
import { Jwt, sign } from "jsonwebtoken";
import config from "../json/config.json";

/**
 * Usage: create new Prisma Client, then new DbUser instance
 * const prisma = prismaClient;
 * const dbUsers = new DbUser(prisma.user);
 */
export class DbUser {
  private secret = config.secret;
  private prismaUser: PrismaClient["user"];
  private userId: number;

  constructor(prisma: PrismaClient["user"]) {
    this.prismaUser = prisma;
    this.userId = 0;
  }

  async authenticate({ username, hash }: { username: string; hash: string }) {
    const user = await this.prismaUser.findUnique({
      where: {
        username: username,
      },
    });

    if (!user || !(await bcrypt.compare(hash, user.hash))) {
      // TODO imporve error handling
      throw "Username or Password incorrect!";
    }

    //auth successful, sign JWT
    const token = sign({ sub: user.id }, this.secret, { expiresIn: "7d" });
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
      // TODO improve error handling
      throw "Username " + newUserData.username + " is already taken";
    }

    newUserData.hash = bcrypt.hashSync(newUserData.hash);

    await this.prismaUser.create({
      data: {
        email: newUserData.email,
        username: newUserData.username,
        hash: newUserData.hash,
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
    if (!user) throw "User not found";
    // update items
    if (data.items) {
      const updatedUser = await this.prismaUser.update({
        where: {
          id: user_id,
        },
        data: {
          items: {
            create: [
              {
                modifier: data.items.modifier,
                kind: data.items.kind,
              },
            ],
          },
          itemCoin: data.itemCoin,
        },
        include: {
          items: true,
        },
      });
      console.log(updatedUser);
      return updatedUser;
    }
    throw "Error when updating User";
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
  async getUser(id: number){
    const user = await this.prismaUser.findFirstOrThrow({
      where: {
        id: id
      }
    });
    return user;
  }

  withoutHash(user: User) {
    const { hash, ...userWithoutHash } = user;
    return userWithoutHash;
  }
}
