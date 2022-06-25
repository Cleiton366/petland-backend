import { DonationRequestRepository } from "../repositories/DonationRequestRepository";
import { Request, Response } from "express";

const donationRequestRepository = new DonationRequestRepository();

class DonationRequestController {
  async newDonationRequest(req: Request, res: Response) {
    const donationRequest = req.body;
    try {
      const result = await donationRequestRepository.newDonationRequest(
        donationRequest
      );
      return res.json(result);
    } catch (err) {
      return res.status(500).send(err);
    }
  }
  async acceptDonationRequest(req: Request, res: Response) {
    const { interrestedDoneeId, petId, donationRequestId } = req.body;
    try {
      const result = await donationRequestRepository.acceptDonationRequest(
        interrestedDoneeId,
        petId,
        donationRequestId
      );
      return res.json(result);
    } catch (err) {
      return res.status(500).send(err);
    }
  }
  async rejectDonationRequest(req: Request, res: Response) {
    const { donationRequestId } = req.body;
    try {
      const result = await donationRequestRepository.rejectDonationRequest(
        donationRequestId.toString()
      );
      return res.json(result);
    } catch (err) {
      return res.status(500).send(err);
    }
  }
  async getUserDonationRequests(req: Request, res: Response) {
    const userid = req.headers.userid;
    try {
      const donationRequestsList =
        await donationRequestRepository.getUserDonationRequests(
          userid.toString()
        );
      return res.json(donationRequestsList);
    } catch (err) {
      return res.status(500).send(err);
    }
  }
}

export { DonationRequestController };
