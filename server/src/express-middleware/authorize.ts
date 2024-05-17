import { expressjwt } from "express-jwt";
import config from "../json/config.json";
import { DbUser } from "../database-operations/DbUser";
import { PrismaClient } from "@prisma/client";


export function authorize(){
  const secret = config.secret;
  const prisma = new PrismaClient();
  const dbUsers = new DbUser(prisma.user);

  return [
    // authenticate JWT token
    expressjwt({ secret, algorithms: ["HS256"] }),

    async(req:any, res:any, next:any) => {
      const user = await dbUsers.getUserWithId(req.user_id);
      if(!user){
        return res.status(401).json({message: "Unauthorized"});
      }

      // auth successful
      req.user = user;
      next();
    }
  ];
}