import { Router } from "https://deno.land/x/oak/mod.ts";
import { welcome } from "./handlers/welcome.ts";
import {
  addUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "./handlers/users.ts";

const router = new Router();

router
  .get("/", welcome)
  .get("/users", getAllUsers)
  .get("/users/:id", getUser)
  .post("/users", addUser)
  .put("/users/:id", updateUser)
  .delete("/users/:id", deleteUser);

export default router;
