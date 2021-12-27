import express from "express";
import "./services/PassportSetupGoogle";
import "./services/PassportSetupFacebook";
import passport from "passport";
import cookieSession from "cookie-session";
import { isLoggedIn } from "./middleware/IsLoggedIn";
import { PetController } from "./controllers/PetController";
import { UserController } from "./controllers/UserController";

const app = express();
const userController = new UserController();
const petController = new PetController();

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});

app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
  })
);

// Initializes passport and passport sessions
app.use(passport.initialize());
app.use(passport.session());

///////////////////////////google oauth routes//////////////////////////////////

// Login route
app.get(
  "/oauth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
// login callback
app.get(
  "/google/oauth/callback",
  passport.authenticate("google", { 
    successRedirect: "/user-info",
    failureRedirect: "/login_error"})
);

///////////////////////////facebook oauth routes//////////////////////////////////

// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
app.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: ["email", "public_profile"] })
);

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/user-info",
    failureRedirect: "/login_error",
  })
);

//////////////////////Google and Facebook error and success routes/////////////////////////////

//login error route
app.get("/login_error", (req, res) => res.send("You Failed to log in"));

// User logged, can get information about the user
app.get("/user-info", isLoggedIn, (req, res) => {
  const user = userController.getUser(req, res);
  res.json(user);
});
// Logout route
app.get("/logout", (req, res) => {
  req.session = null;
  req.logout();
  res.redirect("/");
});

//////////////////pet routes////////////////////////

// add new pet to db
app.post("/newpet", (req, res) => {
  petController.newPet(req, res);
});

// change isAdopted status of pet
app.put("/adoptpet", (req, res) => {
  petController.adoptPet(req, res);
});

//delete pet
app.delete("/deletepet", (req, res) => {
  petController.deletePet(req, res);
});

//get pet pet info
app.get("/getPet", (req, res) => {
  petController.getPet(req, res);
});

//get all cat list
app.get("/catlist", (req, res) => {
  petController.getCatList(req, res);
});

//get all dog list
app.get("/doglist", (req, res) => {
  petController.getDogList(req, res);
});

//get all adopted pets list
app.get("/adoptedlist", (req, res) => {
  petController.getAdoptedPetsList(req, res);
});

//get all pets donated list
app.get("/donatedlist", (req, res) => {
  petController.getDonatedPetsList(req, res);
});

//////////////////user routes////////////////////////

//get user profile information
app.get("/user", (req, res) => {
  const user = userController.getUser(req, res);
  res.json(user);
});

//////////////////////////chat routes/////////////////////////////