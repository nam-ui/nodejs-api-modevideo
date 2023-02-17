import jwt from "jsonwebtoken";
export const hashToken = (payload: Object, secretCode: string, expiresIn: number) => {
    return jwt.sign(payload, secretCode, {
        expiresIn: expiresIn
    });
}