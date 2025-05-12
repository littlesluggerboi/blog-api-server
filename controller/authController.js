import prisma from "../prisma/prismaClient.js";
import passport from "passport";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const postSignup = async (req, res, next) => {
  try {
    const { password, email, username } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await prisma.blogs_User.create({
      data: { email, password: hash, username },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
      },
    });
    const token = jwt.sign({ user }, process.env.SECRET);
    res.json({ token, ...user });
  } catch (error) {
    next(error);
  }
};

const postLogin = async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err) return next(err);
      if (!user) return res.status(401).json({ errors: info });
      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);
        const token = jwt.sign({ user }, process.env.SECRET);
        return res.json({ token, ...user });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
};

export default { postLogin, postSignup };
