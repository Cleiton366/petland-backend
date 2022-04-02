import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
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
    async function (accessToken, refreshToken, profile, done,
      req: Request,res: Response) {
      try {
        req = profile.id;
        const user = await userController.verifyUser(profile.id);
        if (user) {
          return done(null, user);
        } else {
          req = profile;
          const result = await userController.newUser(req, res);
          if(result === null) return done(JSON.stringify({status: "error", message: "user already exist"}));
          return done(null, result);
        }
      } catch (err) {
        return done(err);
      }
    })
);
