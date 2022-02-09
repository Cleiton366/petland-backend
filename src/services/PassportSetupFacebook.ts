import passport from "passport";
import FacebookStrategy from "passport-facebook";
import { AuthenticationController } from "../controllers/AuthenticationController";
import { Request, Response } from "express";
import  fetch  from "node-fetch"
import "dotenv/config.js";

const authenticationController = new AuthenticationController();

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
        try{
          req = profile.id;
          const user = await authenticationController.verifyUser(profile.id);
          if (user) {
            return done(null, user);
          } else {
            req = profile;
            const result = await authenticationController.newUser(req, res);
            if(result === null) return done(JSON.stringify({status: "error", message: "user already exist"}));
            return done(null, result);
          }
        } catch (err) {
          return done(err);
        }
      })
);

/*
const response = await fetch(`${process.env.API}/newUser`, {
              method : "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                id: profile.id,
                displayName: profile.displayName,
                userPhoto: profile.photos[0].value,
                email: profile.emails[0].value,
              }),
            });    
            const result = await response.json();
            if(result.status.toString() == "error") return done("user already exist");
            return done(null, profile);

*/
