import { body } from "express-validator";
import prisma from "../prisma/prismaClient.js";

const signupValidator = [
  body("email")
    .isString()
    .trim()
    .isEmail()
    .isLength({ min: 1 })
    .custom(async (value, { req }) => {
      const user = await prisma.blogs_User.findUnique({
        where: {
          email: value,
        },
        select: {
          id: true,
        },
      });
      if (user != null) {
        throw new Error("Email already in use");
      }
      return true;
    }),
  body("password").isString().trim().isLength({ min: 1 }),
  body("username").isString().optional(),
  body("role").isString().trim().isLength({ min: 1 }).optional(),
];

export default signupValidator;
