import { Router } from "express";
import validator from "../validator/validator.js";
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
  "/",
  passport.authenticate("jwt", { session: false }),
  postPostsValidator,
  validator,
  postController.postPost
);

export default postRoutes;
