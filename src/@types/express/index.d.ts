import { Pet } from "../../models/Pet";
import { DonationRequest } from "../../models/DonationRequest";
import { Social } from "../../models/Social";
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
      social : Social;
    }
  
    export interface Response {
      message: string;
    }
  }
}
