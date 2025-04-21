import { body } from "express-validator";

const loginValidator = [
  body("email").isString().trim().isLength({ min: 1 }).isEmail(),
  body("password").isString().trim().isLength({ min: 1 }),
];

export default loginValidator;
