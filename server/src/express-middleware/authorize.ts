import { dbUsers } from "../database-services/prisma-client";
import config from "../json/config.json";
import { expressjwt } from "express-jwt";

// https://github.com/auth0/express-jwt?tab=readme-ov-file#usage
export function authorize(){
  const secret = config.secret;

  return [
    // authenticate JWT token
    expressjwt({ secret, algorithms: ["HS256"] }),
    async(req:any, res:any, next:any) => {
      // get user id from sub property in auth
      const user_id = req.auth.sub;
      const user = await dbUsers.getUserById(user_id);
      if(!user){
        return res.status(401).json({message: "Unauthorized"});
      }

      // auth successful
      req.user = user;
      next();
    }
  ];
}
