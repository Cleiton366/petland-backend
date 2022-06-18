import { Pet } from "../models/Pet";
import { DonationRequest } from "../models/DonationRequest";

declare namespace Express {
  export interface Request {
    user: string;
    pet: Pet;
    status: string;
    donationRequest: DonationRequest;
  }

  export interface Response {
    message: string;
  }
}
