import prisma from "../prisma/prismaClient.js";
import passport from "passport";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const postSignup = async (req, res, next) => {
  try {
    const { password, ...data } = req.body;
    const hash = await bcrypt.hash(password, 10);
    data.password = hash;
    await prisma.blogs_User.create({
      data: data,
    });
    res.json({ message: "Sign up successful." });
  } catch (error) {
    next(error);
  }
};

const postLogin = async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err) return next(err);
      if (!user) return res.status(401).json({ info });
      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);
        const token = jwt.sign({ user }, process.env.SECRET, {
          expiresIn: 60 * 60 * 24,
        });
        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
};

export default { postLogin, postSignup };
