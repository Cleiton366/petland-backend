import { v4 as uuid } from "uuid";
import { client } from "../db/PostgresConection";
import { DonationRequest } from "../models/DonationRequest";
import { petAdoptedEmail } from "../services/AutomateEmailer";
import { UserRepository } from "../repositories/UserRepository";

class DonationRequestRepository {
  async newDonationRequest(donationRequest: DonationRequest) {
    const donationRequestId = uuid();
    const query = {
      text: "INSERT INTO donationrequests(donationrequestid, donatorid, interresteddoneeid, petid, isadopted) VALUES($1, $2, $3, $4, false)",
      values: [
        donationRequestId,
        donationRequest.donatorId,
        donationRequest.interrestedDoneeId,
        donationRequest.petId,
      ],
    };

    await client.query(query);

    return {
      message: "Donation request added to db",
      donationRequestId: donationRequestId,
      donationRequest: donationRequest,
    };
  }
  async acceptDonationRequest(
    interrestedDoneeId: string,
    petId: string,
    donationRequestId: string
  ) {
    let query = {
      text: "UPDATE pets SET ownerid = $1, isadopted = $2 WHERE petid = $3",
      values: [interrestedDoneeId, true, petId],
    };

    await client.query(query);
    petAdoptedEmail(interrestedDoneeId, petId);

    query = {
      text: "UPDATE donationrequests SET isadopted = $1 WHERE donationrequestid = $2",
      values: [true, donationRequestId],
    };

    await client.query(query);

    return {
      status: "success",
      message: "Pet adopted",
    };
  }
  async rejectDonationRequest(donationRequestId: string) {
    const query = {
      text: "DELETE FROM donationrequests WHERE donationrequestid = $1",
      values: [donationRequestId],
    };

    await client.query(query);

    return {
      status: "success",
      message: "Donation request rejected",
    };
  }
  async getUserDonationRequests(userid: string) {
    const userRepository = new UserRepository();
    const query = {
      text: "SELECT * FROM donationrequests WHERE donatorid = $1 AND isadopted = false",
      values: [userid],
    };

    const res = await client.query(query);
    const donationRequests = res.rows;

    const donationRequestsList = [];
    for (let i = 0; i < donationRequests.length; i++) {
      var userId = donationRequests[i].interresteddoneeid;
      const user = await userRepository.getUser(userId);

      donationRequestsList.push({
        DonationRequest: donationRequests[i],
        User: {
          userId: user.id,
          userName: user.username,
          userPhoto: user.avatarurl,
        },
      });
    }

    return donationRequestsList;
  }
}

export { DonationRequestRepository };
