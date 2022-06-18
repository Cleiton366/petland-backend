import { Router } from "express";
import { DonationRequestController } from "../controllers/DonationRequestController";
import { CheckSession } from "../middleware/CheckSession";

const donationRequestController = new DonationRequestController();
const router = Router();

router.post("/donationrequest/new", CheckSession, donationRequestController.newDonationRequest)
router.put("/donationrequest/acept" , CheckSession , donationRequestController.aceptDonationRequest)
router.put("/donationrequest/reject" , CheckSession, donationRequestController.rejectDonationRequest)
router.put("/donationrequest/list" , CheckSession, donationRequestController.getUserDonationRequests)

export { router };