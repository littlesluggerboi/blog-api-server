import { body } from "express-validator";

export const postPostsValidator = [
  body("title").isString().trim().isLength({ min: 1 }),
  body("content").isString().isLength({ min: 1 }),
  body("is_published")
    .isString()
    .isLength({ min: 1 })
    .custom((input) => input === "false" || input === "true")
    .customSanitizer((input) => {
      if (input == "false") {
        return false;
      }
      return true;
    })
    .optional(),
];

export const updatePostValidator = [
  body("title").isString().trim().isLength({ min: 1 }).optional(),
  body("content").isString().isLength({ min: 1 }).optional(),
  body("is_published")
    .isString()
    .isLength({ min: 1 })
    .custom((input) => input === "false" || input === "true")
    .customSanitizer((input) => {
      if (input == "false") {
        return false;
      }
      return true;
    })
    .optional(),
];
