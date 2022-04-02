import nodemailer from "nodemailer";
import "dotenv/config.js";

const stmpTransport = nodemailer.createTransport({
  service: "gmail",
  auth: { 
    user: process.env.email, 
    pass: process.env.password 
  }
});

function accountCreatedEmail(userEmail: string) {
  const emailObj = {
    from: "noreply.petland@gmail.com",
    to: userEmail,
    subject: "Petland Account Created",
    generateTextFromHTML: true,
    html: "<h3>Your account have been created <3</h3>"+
    `<img src="https://media1.giphy.com/media/gwisEpuibLPvu3seFQ/giphy.gif?cid=ecf05e47447ito8a0spq3060d8le1rmq1ykkslgxdkr25mhe&rid=giphy.gif&ct=g" width="400" height="500">`,
  };

  stmpTransport.sendMail(emailObj, (err, res) => {
    if (err) {
      console.log("Error while trying to sent email:", err);
    } else {
      console.log("Email sent to user suscessfully: ", res);
    }
  });
}

export { accountCreatedEmail };
