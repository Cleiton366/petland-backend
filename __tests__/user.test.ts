import { app } from "../src/app";
import request from "supertest";

describe("Users", () => {
    const user = "1545028452517592";
    it("should redirect user to google login page", async ()=> {
        const response = await request(app)
        .get("/auth/google")
        expect(response.status).toBe(302);
    });

    it("should redirect user to facebook login page", async ()=> {
        const response = await request(app)
        .get("/auth/facebook")
        expect(response.status).toBe(302);
    });

    it("should return user donated pets", async ()=> {
        const response = await request(app)
        .get('/donatedPets')
        .set('userid', user)
        expect(response.body.length).toBeGreaterThan(0);
    });

    it("should return user adopted pets", async ()=> {
        const response = await request(app)
        .get('/userPets')
        .set('userid', user)
        expect(response.body.length).toBeGreaterThan(0);
    });


});