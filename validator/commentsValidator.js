import { body } from "express-validator";
import prisma from "../prisma/prismaClient.js";

export const commentsPostValidator = [
  body("post_id")
    .isInt()
    .customSanitizer((post_id) => {
      return parseInt(post_id);
    })
    .custom(async (post_id) => {
      const post = await prisma.blogs_Post.findUnique({
        where: { id: post_id },
      });
      if (!post) throw new Error("Post does not exist");
      return true;
    }),
  body("comment").isString().trim().isLength({ min: 1 }),
];

export const commentsUpdateValidator = [
  body("comment").isString().trim().isLength({ min: 1 }),
];
