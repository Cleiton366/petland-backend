import { app } from "../src/app";
import request from "supertest";

describe("Pets", () => {

  it("should return a pet", async () => {
    const response = await request(app).get(`/pet/2ffa3aa5-8eae-4319-8dfd-0a518d4e4edc`);
    expect(response.body.petid).toBe("2ffa3aa5-8eae-4319-8dfd-0a518d4e4edc");
  });

  it("should return a list of pets by state and city", async () => {
    const response = await request(app).get("/pet/cat/list").query({
      city: "quixada",
      state: "ceara",
    });
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("should return a list of all pets by type", async () => {
    const response = await request(app).get("/pet/cat/all");
    expect(response.body.length).toBeGreaterThan(0);
  });

});
