import { Pet } from "../../models/Pet";
import { DonationRequest } from "../../models/DonationRequest";
export {};
declare global {
  namespace Express {
    export interface Request {
      user: string;
      pet: Pet;
      status: string;
      donationRequest: DonationRequest;
      avatarurl: string;
      email: string;
      id: string;
      username: string;
    }
  
    export interface Response {
      message: string;
    }
  }
}
