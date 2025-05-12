import { Router } from "express";
import idValidationMiddleWare from "../middlewares/idValidation.js";
import passport from "passport";
import {
  commentsPostValidator,
  commentsUpdateValidator,
} from "../validator/commentsValidator.js";
import validator from "../validator/validator.js";
import commentController from "../controller/commentController.js";

const commentRoutes = Router();

commentRoutes.get("/", commentController.getComments);

commentRoutes.get("/count", commentController.getCommentsCount);

commentRoutes.get("/:id", idValidationMiddleWare, commentController.getComment);

commentRoutes.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  commentsPostValidator,
  validator,
  commentController.postComment
);

commentRoutes.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  idValidationMiddleWare,
  commentController.isAuthorized,
  commentsUpdateValidator,
  commentController.updateComment
);

commentRoutes.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  idValidationMiddleWare,
  commentController.isAuthorized,
  commentController.deleteComment
);

export default commentRoutes;
