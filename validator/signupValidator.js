import { body } from "express-validator";

const signupValidator = [
    body("email").isString().trim().isEmail().isLength({min: 1}),
    body("password").isString().trim().isLength({min: 1}),
    body("first_name").isString().trim().isLength({min: 1}).optional(),
    body("last_name").isString().trim().isLength({min: 1}).optional(),
    body("role").isString().trim().isLength({min: 1}).optional()
]

export default signupValidator;