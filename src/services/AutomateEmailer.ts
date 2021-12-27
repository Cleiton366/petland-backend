import nodemailer from "nodemailer";
import { google } from "googleapis";
import "dotenv/config.js";

const OAuth2 = google.auth.OAuth2;
const oauthClient = new OAuth2(
  process.env.EMAILER_CLIENT_ID,
  process.env.EMAILER_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground/"
);

const stmpTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: "noreply.petland@gmail.com",
    clientId: oauthClient._clientId,
    clientSecret: oauthClient._clientSecret,
    refreshToken: process.env.EMAILER_REFRESH_TOKEN,
    accessToken: process.env.EMAILER_ACCESS_TOKEN,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

function accountCreatedEmail(userEmail: string) {
  const message = {
    from: "noreply.petland@gmail.com",
    to: userEmail,
    subject: "Petland Account Created",
    generateTextFromHTML: true,
    html: "<h2>Your account have been created! Welcome to the family <3333</h2>"+
    `<img src="https://media1.giphy.com/media/gwisEpuibLPvu3seFQ/giphy.gif?cid=ecf05e47447ito8a0spq3060d8le1rmq1ykkslgxdkr25mhe&rid=giphy.gif&ct=g" alt="Girl in a jacket" width="500" height="600">`,
  };

  stmpTransport.sendMail(message, (err, res) => {
    if (err) {
      console.log("Error while trying to sent email:", err);
    } else {
      console.log("Email sent to user suscessfully: ", res);
    }
  });
}

export { accountCreatedEmail };
