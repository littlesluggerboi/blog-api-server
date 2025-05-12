import { Router } from "express";
import passport from "passport";
import usersController from "../controller/usersController.js";

const userRoutes = Router();

userRoutes.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  usersController.isAuthorized,
  usersController.getUsers
);

userRoutes.get("/count",
    passport.authenticate("jwt", {session: false}),
    usersController.isAuthorized,
    usersController.getUsersCount
)

export default userRoutes;
