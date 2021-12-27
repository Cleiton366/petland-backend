import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import { authenticateUser } from "./AuthenticateUser";
import { UserController } from "../controllers/UserController";
import { Request, Response } from "express";
import "dotenv/config.js";

const userController = new UserController();

interface IUser {
  id: string;
}

passport.serializeUser(function (user: IUser, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  done(null, id);
});

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async function (accessToken,refreshToken,profile,done,
      req: Request,res: Response) {
      try {
        req = profile.id;
        const user = await authenticateUser(req, res);
        if (user) {
          console.log(`User ${user.username} logged`);
          return done(null, user);
        } else {
          req = profile;
          await userController.newUser(req, res);
          return done(null, profile);
        }
      } catch (err) {
        return done(err);
      }
    })
);
