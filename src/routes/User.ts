import { Router } from "express";
import "../services/PassportSetupGoogle";
import "../services/PassportSetupFacebook";
import passport from "passport";
import cookieSession from "cookie-session";
import { isLoggedIn } from "../middleware/IsLoggedIn";
import { UserController } from "../controllers/UserController";
import { check_api_key } from "../middleware/check_api_key";

const router = Router();
const userController = new UserController();

router.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
    maxAge: 60 * 60 * 1000 // 1 hour
  })
);

// Initializes passport and passport sessions
router.use(passport.initialize());
router.use(passport.session());

///////////////////////////google oauth routes//////////////////////////////////

// Login route
router.get(
  "/oauth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
// login callback
router.get(
  "/google/oauth/callback",
  passport.authenticate("google", {
    successRedirect: "/user-info",
    failureRedirect: "/login_error",
  })
);

///////////////////////////facebook oauth routes//////////////////////////////////

// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
router.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: ["email", "public_profile"] })
);

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/user-info",
    failureRedirect: "/login_error",
  })
);

//////////////////////Google and Facebook error and success routes/////////////////////////////

//login error route
router.get("/login_error", (req, res) => res.json("Something went wrong"));

// User logged, can get information about the user
router.get("/user-info", [isLoggedIn, check_api_key], async (req , res) => {
  const user = await userController.getUser(req, res);
  res.json(user);
});
// Logout route
router.get("/logout", (req, res) => {
  req.session = null;
  req.logout();
  res.redirect("/");
});

router.post("/newUser",  userController.newUser);

export { router };
