import express from "express";
import { verify } from "jsonwebtoken";
import { hashToken } from "../../utils/HashToken";
import AccountMongo from "../auth/auth.dto";
import TokenMongo from "../auth/token.dto";


export const middleware_auth = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log("CALL ME");
    
    var account;
    var token;
    var error;
    const access_token = req.headers.authorization;
    const refresh_token = req.body.refresh_token;
    const email = req.body.email;
    if (!email) return res.status(400).send({ message: '[middleware_auth] email not found.', login: false });
    if (!access_token) return res.status(400).send({ message: '[middleware_auth] Refresh token not found.' });
    if (!refresh_token) return res.status(400).send({ message: '[middleware_auth] Refresh token not found.', login: false });
    account = await AccountMongo.findOne({ email: req.body.email }).then(async account => {
        if (!!!account) {
            error = true;
        } else {
            token =await TokenMongo.findById(account.id_tokens).then(async token => {
                if (access_token === token?.access_token) {
                    next();
                } else {
                    if (refresh_token === token?.refresh_token) {
                        token = await TokenMongo.findByIdAndUpdate(account.id_tokens, { $setOnInsert: { access_token: hashToken({ sub: req.body.sub, email: req.body.email, email_verified: true }, process.env.NODE_ENV_ACCESS_TOKEN_SECRET as string, parseInt(process.env.NODE_ENV_EXPIRES_IN_JWT as string)) } })
                    } else {
                        return res.status(400).send({ message: '[middleware_auth] Refresh not found.', login: false });
                    }
                }

            });
        }
    })
    if (error) return res.status(400).send({ message: '[middleware_auth] email not found.', login: false });
}