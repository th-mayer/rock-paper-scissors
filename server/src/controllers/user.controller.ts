import { Router } from "express";
import { authorize } from "../express-middleware/authorize";
import { DbUser } from "../database-operations/DbUser";
import prismaClient from "../database-operations/prisma-client";

const router = Router();
const prisma = prismaClient;
const dbUsers = new DbUser(prisma.user);

/**
 * defines all /users routes for API
 * is bound to /users path in server.ts
 */
router.post("/authenticate", authenticate);
router.post("/register", register);
router.get("/", authorize(), getAll);
// implementation WIP!
router.put("/:id", authorize(), update);
router.delete("/:id", authorize(), _delete);

function authenticate(req: any, res: any, next: any) {
  dbUsers
    .authenticate(req.body)
    .then((user) => res.json(user))
    .catch(next);
}

function register(req: any, res: any, next: any) {
  dbUsers
    .createUser(req.body)
    .then(() => res.json({ message: "Registration succesful" }))
    .catch(next);
}

function getAll(req: any, res: any, next: any) {
  dbUsers
    .getAllUsers()
    .then((users) => res.json(users))
    .catch(next);
}

function update(req: any, res: any, next: any) {
  // TODO, finish when dbUser update functions are ready
}

function _delete(req: any, res: any, next: any) {
  dbUsers
    .deleteUser(req.params.id)
    .then(() => res.json({ message: "User successfully deleted" }))
    .catch(next);
}
export default router;
