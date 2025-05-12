import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import prisma from "../prisma/prismaClient.js";
import bcrypt from "bcrypt";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";

passport.use(
  new JWTStrategy(
    {
      secretOrKey: process.env.SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (emailArg, passwordArg, done) => {
      try {
        const result = await prisma.blogs_User.findUnique({
          where: { email: emailArg },
          omit: {
            created_at: true,
          },
        });
        if (!result) {
          return done(null, false, { email: "User not found." });
        }
        const { password, ...user } = result;
        const match = await bcrypt.compare(passwordArg, password);
        if (!match) {
          return done(null, false, { password: "Wrong password." });
        }
        return done(null, user, { message: "Login Successful!" });
      } catch (error) {
        done(error);
      }
    }
  )
);
