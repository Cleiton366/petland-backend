import { Router } from "express";
import { DonationRequestController } from "../controllers/DonationRequestController";
import { CheckSession } from "../middleware/CheckSession";

const donationRequestController = new DonationRequestController();
const router = Router();

router.post("/donationrequest/new", CheckSession, donationRequestController.newDonationRequest);
router.post("/donationrequest/accept" , CheckSession , donationRequestController.acceptDonationRequest);
router.delete("/donationrequest/reject" , CheckSession, donationRequestController.rejectDonationRequest);
router.get("/donationrequest/list" , CheckSession, donationRequestController.getUserDonationRequests);

export { router };
