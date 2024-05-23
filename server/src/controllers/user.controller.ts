import { Router, Request, Response, NextFunction } from "express";
import { authorize } from "../express-middleware/authorize";
import { DbUser } from "../database-services/DbUser";
import prismaClient from "../database-services/prisma-client";
import dbUsers from "../database-services/prisma-client";

const router = Router();

/**
 * defines all /users routes for API
 * is bound to /users path in server.ts
 */
router.post("/authenticate", authenticate);
router.post("/register", register);
router.get("/", authorize(), getAll);
router.get("/:id", authorize(), getUserWithId);
router.get("/current", authorize(), getCurrent);
router.put("/:id", authorize(), updateItems);
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

function getUserWithId(req: any, res: any, next: any) {
  const user_id: number = parseInt(req.params.id, 10);
  dbUsers
    .getUserWithId(user_id)
    .then((user) => (user ? res.json(user) : res.sendStatus(404)))
    .catch((err) => next(err));
}

function getCurrent(req: any, res: any, next: any) {
  console.log("getCurrent Controller" + req);
  res.json(req.user);
}

function updateItems(req: any, res: any, next: any) {
  const user_id: number = parseInt(req.params.id);
  console.log("Update request body: " + req);
  dbUsers
    .update(user_id, req.body)
    .then(() => res.json({}))
    .catch((err) => next(err));
}

function _delete(req: any, res: any, next: any) {
  dbUsers
    .deleteUser(req.params.id)
    .then(() => res.json({ message: "User successfully deleted" }))
    .catch(next);
}
export default router;
