import { Router } from "express";
import prisma from "../prisma/prismaClient.js";
import idValidationMiddleWare from "../middlewares/idValidation.js";
import passport from "passport";
import {
  postPostsValidator,
  updatePostValidator,
} from "../validator/postsValidators.js";
import postController from "../controller/postController.js";

const postRoutes = Router();

postRoutes.get("/", postController.getPosts);

postRoutes.get("/:id", idValidationMiddleWare, postController.getPost);

postRoutes.put(
  "/:id",
  idValidationMiddleWare,
  passport.authenticate("jwt", { session: false }),
  postController.isAuthorized,
  updatePostValidator,
  postController.updatePost
);

postRoutes.delete(
  "/:id",
  idValidationMiddleWare,
  passport.authenticate("jwt", { session: false }),
  postController.isAuthorized,
  postController.deletePost
);

postRoutes.post(
  "/new",
  passport.authenticate("jwt", { session: false }),
  postPostsValidator,
  validator,
  postController.postPost
);

export default postRoutes;
