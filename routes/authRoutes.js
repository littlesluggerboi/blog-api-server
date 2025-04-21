import { Router } from "express";
import signupValidator from "../validator/signupValidator.js";
import validator from "../validator/validator.js";
import loginValidator from "../validator/loginValidator.js";
import authController from "../controller/authController.js";

const authRoutes = Router();

authRoutes.post(
  "/signup",
  signupValidator,
  validator,
  authController.postSignup
);

authRoutes.post(
  "/login", 
  loginValidator, 
  validator, 
  authController.postLogin
);

export default authRoutes;
