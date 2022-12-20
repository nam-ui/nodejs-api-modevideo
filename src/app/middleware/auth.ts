import express from "express";
import { verify } from "jsonwebtoken";
import AccountMongo from "../auth/auth.dto";
import { authHashToken } from "../auth/auth.service";


export const middleware_auth = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const access_token = req.headers.x_authorization;
    const refresh_token = req.body.refresh_token;
    const email = req.body.email;
    if (!access_token) { return res.status(400).send('Access token not found.'); }
    if (!refresh_token) { return res.status(400).send('Refresh token not found.'); }
    const decodeToken = await verify(access_token as string, process.env.NODE_ENV_ACCESS_TOKEN_SECRET as string, { ignoreExpiration: true, }) as { name: string, email: string };
    if (!decodeToken.email) { return res.status(400).send('User not found.'); }
    const account = await AccountMongo.findOne({ email: decodeToken.email });
    if (!account) { return res.status(400).send('User not found.'); }
    if (refresh_token != account.refreshToken) { return res.status(400).send('Refresh token not found.'); }
    const authHash = await authHashToken({ email: account.email, name: account.name })
    req.body.access_token = authHash?.accessToken;
    next();
}
