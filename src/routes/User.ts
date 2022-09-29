import { Router } from "express";
import "../services/PassportSetupGoogle";
import "../services/PassportSetupFacebook";
import passport from "passport";
import cookieSession from "cookie-session";
import "dotenv/config.js";
import { UserController } from "../controllers/UserController";
import { CheckSession } from "../middleware/CheckSession";

const router = Router();
const userController = new UserController();

router.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
    maxAge: 60 * 60 * 1000, // 1 hour
  })
);

// Initializes passport and passport sessions
router.use(passport.initialize());
router.use(passport.session());

///////////////////////////google oauth routes//////////////////////////////////

// Login route
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
// login callback
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: `${process.env.CLIENT_API}/home`,
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
    successRedirect: `${process.env.CLIENT_API}/home`,
    failureRedirect: "/login_error",
  })
);

//////////////////////Google and Facebook error and success routes/////////////////////////////

//login error route
router.get("/login_error", (req, res) => res.json("Something went wrong"));

// User logged, can get information about the user
router.get("/user-info", CheckSession, async (req, res) => {
  try {
    const user = await userController.getUser(req, res);
    if(!user) {
      return res.status(500).send("User not found");
    }
    return res.json(user);
  } catch (err) {
    return res.status(500).send(err);
  }
});
// Logout route
router.get("/logout", (req, res) => {
  req.session = null;
  req.logout();
  res.redirect(process.env.CLIENT_API);
});

///////////////////////////////User routes///////////////////////////////////////////////

router.post("/newUser", async (req, res) => {
  try {
    const user = await userController.newUser(req, res);
    return res.json(user);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.post("/newUserAndroid", async (req, res) => {
  try {
    const user = await userController.newUserAndroid(req, res);
    return res.json(user);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.get("/donatedPets", CheckSession, userController.getDonatedPets);

router.get("/userPets", CheckSession, userController.getUserPets);

export { router };
