import { UserRepository } from "../repositories/UserRepository";
import { PetRepository } from "../repositories/PetRepository";
import nodemailer from "nodemailer";
import "dotenv/config.js";

const stmpTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.email,
    pass: process.env.password,
  },
});

async function accountCreatedEmail(userEmail: string) {
  const emailObj = {
    from: "noreply.petland@gmail.com",
    to: userEmail,
    subject: "Petland Account Created",
    generateTextFromHTML: true,
    html:
      "<h3>Your account has been created <3</h3>" +
      `<img src="https://media1.giphy.com/media/gwisEpuibLPvu3seFQ/giphy.gif?cid=ecf05e47447ito8a0spq3060d8le1rmq1ykkslgxdkr25mhe&rid=giphy.gif&ct=g" width="400" height="500">`,
  };

  try {
    await stmpTransport.sendMail(emailObj);
  } catch (err) {
    throw new Error(`Error while trying to send email: ${err.message}`);
  }
}

async function petAdoptedEmail(userId, petId) {
  const petRepository = new PetRepository();
  const userRepository = new UserRepository();

  const user = await userRepository.getUser(userId);
  const pet = await petRepository.getPet(petId);
  const emailObj = {
    from: "noreply.petland@gmail.com",
    to: user.email,
    subject: "Congratulations! Your adoption request has been accepted",
    generateTextFromHTML: true,
    html:
      `<h3>We are so happy to tell you that ${pet.petname} is your new new pet!!</h3>` +
      `<img src=${pet.petphoto} alt="pet photo" width="400" height="500">`,
  };

  try {
    await stmpTransport.sendMail(emailObj);
  } catch (err) {
    throw new Error(`Error while trying to send email: ${err.message}`);
  }
}

export { accountCreatedEmail, petAdoptedEmail };
