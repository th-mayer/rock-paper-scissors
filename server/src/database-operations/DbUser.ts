import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcryptjs";
import { Jwt, sign } from "jsonwebtoken";
import config from "../json/config.json";

/**
 * Usage: create new Prisma Client, then new DbUser instance
 * const prisma = prismaClient;
 * const dbUsers = new DbUser(prisma.user);
 */
export class DbUser {
  constructor(private readonly prismaUser: PrismaClient["user"]) {}

  secret = config.secret;

  async authenticate({username, password} : {username:string, password:string}){
    const user = await this.prismaUser.findFirst({
      where: {
        name: username
      }
    });

    if( !user || !(await bcrypt.compare(password, user.hash))){
      // TODO imporve error handling
      throw "Username or Password incorrect!";
    }

    //auth successful, sign JWT
    const token = sign({sub: user.id}, this.secret, {expiresIn: "7d"});
    return {...this.getUserWithIdWithoutHash(user.id), token}
  }

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
      throw "Username " + newUserData.name + " is already taken";
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

  async getUserWithIdWithoutHash(user_id: number){
    const user = await this.getUserWithId(user_id);
    return {
      id: user.id,
      email: user.email,
      name: user.name
    };
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
