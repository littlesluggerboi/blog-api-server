import { Router } from "express";
import monitorController from "../controller/monitorController.js";
import usersController from "../controller/usersController.js";
import passport from "passport";

const monitorRoutes = Router();

monitorRoutes.get(
  "/post_stats",
  passport.authenticate("jwt", { session: false }),
  usersController.isAuthorized,
  monitorController.getPostsStats
);

monitorRoutes.get(
  "/recent_activities",
  passport.authenticate("jwt", { session: false }),
  usersController.isAuthorized,
  monitorController.getRecentActivities
);

export default monitorRoutes;
