import { Router } from "express";
import { authorize } from "../express-middleware/authorize";
import { dbUsers } from "../database-services/prisma-client";
import * as Yup from "yup";

const router = Router();

/**
 * defines all /users routes for API
 * is bound to /users path in server.ts
 */
router.post("/authenticate", authenticate);
router.post("/register", register);
router.get("/", authorize(), getAll);
router.get("/current", authorize(), getCurrent);
router.get("/leaderboard", authorize(), getLeaderboard);
router.get("/:id/generateItems", authorize(), generateItems);
router.get("/:id", authorize(), getById);
router.put("/:id/edit", authorize(), updateUserSchema, updateUser);
router.put("/:id", authorize(), updateItems);
router.delete("/:id", authorize(), _delete);
// only needed for debug reasons
// router.put("/:id/updateWin", authorize(), updateWin);

function authenticate(req: any, res: any, next: any) {
  dbUsers
    .authenticate(req.body)
    .then((user) => res.json(user))
    .catch(next);
}

function register(req: any, res: any, next: any) {
  dbUsers
    .createUser(req.body)
    .then(() => res.json({ message: "Registration successful" }))
    .catch(next);
}

function getAll(req: any, res: any, next: any) {
  dbUsers
    .getAllUsers()
    .then((users) => res.json(users))
    .catch(next);
}

function getById(req: any, res: any, next: any) {
  const user_id: number = parseInt(req.params.id, 10);
  dbUsers
    .getUserById(user_id)
    .then((user) => (user ? res.json(user) : res.sendStatus(404)))
    .catch((err) => next(err));
}

function getCurrent(req: any, res: any, next: any) {
  res.json(req.user);
}

function getLeaderboard(req: any, res: any, next: any) {
  dbUsers
    .getLeaderboard()
    .then((users) => res.json(users))
    .catch(next);
}

function generateItems(req: any, res: any, next: any) {
  const user_id: number = parseInt(req.params.id);
  dbUsers
    .generateItems(user_id)
    .then((genItems) => res.json(genItems))
    .catch((err) => next(err));
}

async function updateUserSchema(req: any, res: any, next: any) {
  const schema = Yup.object().shape({
    email: Yup.string().email().nullable(),
    username: Yup.string().nullable(),
    hash: Yup.string().nullable(),
  });
  schema
    .validate(req.body)
    .then((valid) => next())
    .catch((error) => next("Validation error: " + error));
}

function updateUser(req: any, res: any, next: any) {
  const user_id: number = parseInt(req.params.id);
  dbUsers
    .updateUser(user_id, req.body)
    .then((updated_user) => res.json(updated_user))
    .catch((err) => next(err));
}

function updateItems(req: any, res: any, next: any) {
  const user_id: number = parseInt(req.params.id);
  dbUsers
    .updateItems(user_id, req.body)
    .then((updated_user) => res.json(updated_user))
    .catch((err) => next(err));
}

// only needed for debug reasons
// function updateWin(req: any, res: any, next: any) {
//   const user_id: number = parseInt(req.params.id);
//   const win: boolean = req.params.win;
//   dbUsers
//     .updateWinItemCoin(user_id, win)
//     .then((updated_user) => res.json(updated_user))
//     .catch((err) => next(err));
// }

function _delete(req: any, res: any, next: any) {
  dbUsers
    .deleteUser(req.params.id)
    .then(() => res.json({ message: "User successfully deleted" }))
    .catch(next);
}
export default router;
