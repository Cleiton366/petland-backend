import { DonationRequestRepository } from "../repositories/DonationRequestRepository";
import { Request, Response } from "express";

const donationRequestRepository = new DonationRequestRepository();

class DonationRequestController {

    async newDonationRequest(req: Request, res: Response) {}
    async aceptDonationRequest(req: Request, res: Response) {}
    async rejectDonationRequest(req: Request, res: Response) {}
    async getUserDonationRequests(req: Request, res: Response) {}
}

export { DonationRequestController };