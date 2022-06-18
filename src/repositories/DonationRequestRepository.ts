import { v4 as uuid } from "uuid";
import { client } from "../db/PostgresConection";
import { DonationRequest } from "../models/DonationRequest";

class DonationRequestRepository {

    async newDonationRequest (donationRequest : DonationRequest) {
        const donationRequestId = uuid();
        const query = {
            text : "INSERT INTO donationrequests(donationrequestid, donatorid, intersteddoneeid, petid) VALUES($1, $2, $3, $4)",
            values: [donationRequestId, donationRequest.donatorId, donationRequest.interrestedDoneeId, donationRequest.petId]
        }
        await client.query(query, (err, res) => {
            if (err) {
              return err;
            }
          });
      
          return {
            message: "Donation request added to db",
            donationRequest: donationRequest
          }
    }
    async acceptDonationRequest (donationRequestId : string) {}
    async rejectDonationRequest (donationRequestId : string) {}
    async getUserDonationRequests (userid : string) {}
}

export { DonationRequestRepository };