import { app } from "../src/app";
import request from "supertest";

describe("Pets", () => {
  var petId = "";

  it("should create a new pet", async () => {
    const response = await request(app)
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
    expect(response.body.status).toBe("success");
    petId = response.body.petId;
  });

  it("should adopt a pet", async () => {
    const response = await request(app).put("/pet/adopt").send({
      petId: petId,
      newOwnerId: "1545028452517592",
    });
    expect(response.body.status).toBe("success");
  });

  it("should return a pet", async () => {
    const response = await request(app).get(`/pet/${petId}`);
    expect(response.body.petid).toBe(petId);
  });

  it("should return a list of pets by state and city", async () => {
    const response = await request(app).get("/pet/cat/list").query({
      city: "Quixadá",
      state: "Ceará",
    });
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("should return a list of all pets by type", async () => {
    const response = await request(app).get("/pet/cat/all");
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("should delete a pet", async () => {
    const response = await request(app).delete("/pet/delete").send({
      petId: petId,
    });
    expect(response.body.status).toBe("success");
  });
});
