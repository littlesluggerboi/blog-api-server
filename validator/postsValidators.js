import { body } from "express-validator";

export const postPostsValidator = [
  body("title").isString().trim().isLength({ min: 1 }),
  body("content").isString().isLength({ min: 1 }),
];

export const updatePostValidator = [
  body("title").isString().trim().isLength({ min: 1 }).optional(),
  body("content").isString().isLength({ min: 1 }).optional(),
];
