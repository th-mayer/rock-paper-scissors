import { expressjwt } from "express-jwt";
import config from "../json/config.json";
import { DbUser } from "../database-operations/DbUser";
import prismaClient from "../database-operations/prisma-client";

// https://github.com/auth0/express-jwt?tab=readme-ov-file#usage
export function authorize(){
  const secret = config.secret;
  const prisma = prismaClient;
  const dbUsers = new DbUser(prisma.user);

  return [
    // authenticate JWT token
    expressjwt({ secret, algorithms: ["HS256"] }),

    async(req:any, res:any, next:any) => {
      // get user id from sub property in auth
      const user = await dbUsers.getUserWithId(req.auth.sub);
      if(!user){
        return res.status(401).json({message: "Unauthorized"});
      }

      // auth successful
      req.user = user;
      next();
    }
  ];
}