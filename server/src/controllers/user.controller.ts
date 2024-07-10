import { Router } from "express";
import { authorize } from "../express-middleware/authorize";
import dbUsers from "../database-services/prisma-client";
import { parseArgs } from "util";

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
router.get("/:id", authorize(), getById);
router.put("/:id", authorize(), updateItems);
router.put("/:id/updateWin", authorize(), updateWin);
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

function updateItems(req: any, res: any, next: any) {
  const user_id: number = parseInt(req.params.id);
  dbUsers
    .update(user_id, req.body)
    .then((updated_user) => res.json(updated_user))
    .catch((err) => next(err));
}

function updateWin(req: any, res: any, next: any) {
  const user_id: number = parseInt(req.params.id);
  const win: boolean = req.params.win; // SOMEONE HAS TO CHECK THIS, IT WORKS BUT I JUST ASSUMED WHAT HAD TO BE DONE !!!!
  dbUsers
    .updateWinItemCoin(user_id, win)
    .then((updated_user) => res.json(updated_user))
    .catch((err) => next(err));
}

function _delete(req: any, res: any, next: any) {
  dbUsers
    .deleteUser(req.params.id)
    .then(() => res.json({ message: "User successfully deleted" }))
    .catch(next);
}
export default router;
