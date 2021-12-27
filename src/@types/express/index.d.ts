
declare namespace Express {
    export interface Request {
        id: string;
        user: any;
        status: number;
    }

    export interface Response {
        user: {
            username: string;
        }
    }
}