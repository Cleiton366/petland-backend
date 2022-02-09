import { Pet } from "../models/Pet";

declare namespace Express {
    export interface Request {
        user: string;
        pet: Pet;
        status : string;
    }

    export interface Response {
        message: string;
    }
}