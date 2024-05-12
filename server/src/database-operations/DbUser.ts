import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcryptjs";

export class DbUser {
  constructor(private readonly prismaUser: PrismaClient["user"]) {}

  // CREATE
  async createUser(newUserData: User) {
    // validate
    if (
      await this.prismaUser.findFirst({
        where: {
          name: newUserData.name,
        },
      })
    ) {
      // TODO improve error handling
      throw "Username " + newUserData.name + "is already taken";
    }

    newUserData.hash = bcrypt.hashSync(newUserData.hash);

    await this.prismaUser.create({
      data: {
        email: newUserData.email,
        name: newUserData.name,
        hash: newUserData.hash,
      },
    });
  }

  // READ
  async getAllUsers() {
    return await this.prismaUser.findMany();
  }

  async getUserWithId(user_id: number) {
    return await this.prismaUser.findFirstOrThrow({
      where: {
        id: user_id,
      },
    });
  }

  // UPDATE
  async updateUsername(user_id: number, user_name: string) {
    // TODO
  }

  async updateEmail(user_id: number, user_email: string) {
    // TODO
  }

  async updatePwdHash(user_id: number, user_hash: string) {
    // TODO
  }

  // DELETE
  async deleteUser(user_id: number){
    await this.prismaUser.delete({
      where: {
        id: user_id
      }
    });
  }
}
