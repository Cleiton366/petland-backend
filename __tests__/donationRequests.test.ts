import { app } from "../src/app";
import request from "supertest";

describe("DonationRequests", () => {
  var donationRequestId = "";
  var petId = "";
  it("should create a donation request", async () => {
    var response = await request(app)
      .post("/pet/new")
      .send({
        pet: {
          donatorId: "1234",
          petName: "test pet",
          petAddress: {
            city: "city",
            state: "state",
          },
          age: 1,
          medicalCondition: "healthy",
          petType: "cat",
        },
      });
    petId = response.body.petId;
    response = await request(app).post("/donationRequest/new").send({
      donatorId: "test",
      interrestedDoneeId: "1545028452517592",
      petId: petId,
    });
    expect(response.body.message).toBe("Donation request added to db");
    donationRequestId = response.body.donationRequestId;
  });

  it("should reject a donation request", async () => {
    var response = await request(app).delete("/donationrequest/reject").send({
      donationRequestId: donationRequestId,
    });
    expect(response.body.status).toBe("success");
  });

  it("should return a list of donation requests", async () => {
    const response = await request(app)
      .get("/donationrequest/list")
      .set("userid", "1545028452517592");
    expect(response.body.length).toBeGreaterThan(0);
  });
});
