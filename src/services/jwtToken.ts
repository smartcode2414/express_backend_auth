import jwt from "jsonwebtoken";
import { UserJwtPaload } from "../types/payload.type";
import { ACTIVATION_TOKEN_SECRET } from "../config/config";


export const createActivationToken = (payload: UserJwtPaload): string => {
    return jwt.sign( payload, ACTIVATION_TOKEN_SECRET, {expiresIn: '5m'});
}

