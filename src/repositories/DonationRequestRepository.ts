import { v4 as uuid } from "uuid";
import { client } from "../db/PostgresConection";
import { DonationRequest } from "../models/DonationRequest";
import { petAdoptedEmail } from "../services/AutomateEmailer";

class DonationRequestRepository {

    async newDonationRequest (donationRequest : DonationRequest) {
        const donationRequestId = uuid();
        const query = {
            text : "INSERT INTO donationrequests(donationrequestid, donatorid, interresteddoneeid, petid, isadopted) VALUES($1, $2, $3, $4, false)",
            values: [donationRequestId, donationRequest.donatorId, donationRequest.interrestedDoneeId, donationRequest.petId]
        }
        await client.query(query, (err, res) => {
            if (err) {
              return err;
            }
          });
      
          return {
            message: "Donation request added to db",
            donationRequestId : donationRequestId,
            donationRequest: donationRequest
          }
    }
    async acceptDonationRequest (
      interrestedDoneeId : string, petId : string, donationRequestId : string) {
      let query = {
        text: "UPDATE pets SET ownerid = $1, isadopted = $2 WHERE petid = $3",
        values: [interrestedDoneeId, true, petId]
      }
      await client.query(query, (err, res) => {
        if (err) {
          return err;
        }
      });
  
      petAdoptedEmail(interrestedDoneeId, petId);

      query = {
        text : "UPDATE donationrequests SET isadopted = $1 WHERE donationrequestid = $2",
        values: [true, donationRequestId]
      }

      await client.query(query, (err, res) => {
        if (err) {
          return err;
        }
      });

      return {
        status: "success",
        message: "Pet adopted"
      }
    }
    async rejectDonationRequest (donationRequestId : string) {
      const query = {
        text : "DELETE FROM donationrequests WHERE donationrequestid = $1",
        values: [donationRequestId]
      }
      await client.query(query, (err, res) => {
        if (err) {
          return err;
        }
      });

      return {
        status: "success",
        message: "Donation request rejected"
      }
    }
    async getUserDonationRequests (userid : string) {}
}

export { DonationRequestRepository };