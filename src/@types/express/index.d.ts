import { Pet } from "../models/Pet";

declare namespace Express {
    export interface Request {
        user: string;
        pet: Pet;
    }

    export interface Response {
        user: {
            username: string;
        }
    }
}