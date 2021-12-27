import passport from "passport";
import FacebookStrategy from "passport-facebook";
import { UserController } from "../controllers/UserController";
import { authenticateUser } from "../services/AuthenticateUser";
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

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      profileFields: ['id', 'displayName', 'photos', 'email', 'name']
    },
    async function (accessToken, refreshToken, profile, done,
      req: Request, res: Response) {
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
