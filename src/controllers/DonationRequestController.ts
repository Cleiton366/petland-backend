import { DonationRequestRepository } from "../repositories/DonationRequestRepository";
import { Request, Response } from "express";

const donationRequestRepository = new DonationRequestRepository();

class DonationRequestController {

    async newDonationRequest(req: Request, res: Response) {
        const donationRequest = req.body;
        const result = await donationRequestRepository.newDonationRequest(donationRequest);
        res.json(result);
    }
    async acceptDonationRequest(req: Request, res: Response) {
        const { donationRequestId } = req.headers;
        const result = await donationRequestRepository.acceptDonationRequest(donationRequestId.toString());
        res.json(result);
    }
    async rejectDonationRequest(req: Request, res: Response) {
        const { donationRequestId } = req.headers;
        const result = await donationRequestRepository.rejectDonationRequest(donationRequestId.toString());
        res.json(result);
    }
    async getUserDonationRequests(req: Request, res: Response) {
        const userid = req.headers.userid;
        const donationRequestsList = await donationRequestRepository.getUserDonationRequests(userid.toString());
        res.json(donationRequestsList);
    }
}

export { DonationRequestController };