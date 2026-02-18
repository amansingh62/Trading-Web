import { JwtPayload } from "../types/authTypes.ts";

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
            userId?: string;
        }
    }
}