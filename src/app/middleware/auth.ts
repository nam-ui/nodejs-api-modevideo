import express from "express";
import { decode } from "jsonwebtoken";
import { hashToken } from "../../utils/HashToken";
import AccountMongo from "../auth/auth.dto";
import TokenMongo from "../auth/token.dto";
export const middleware_auth = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    var token;
    var error;
    const access_token = req.headers.authorization;
    if (!access_token) throw { message: "middleware_auth", access_token: false }
    const decodeToken = decode(access_token) as unknown as { email: String, sub: String, email_verified: Boolean };
    if (!decodeToken) throw { message: "middleware_auth", access_token: false }
    await AccountMongo.findOne({ email: decodeToken.email }).then(async account => {
        if (!!!account) {
            error = true;
        } else {
            token = await TokenMongo.findById(account.id_tokens).then(async token => {
                if (access_token === token?.access_token) {
                    return;
                } else {
                    throw { message: "middleware_auth", access_token: false }
                }
            });
        }
    })
    if (error) throw { message: "middleware_auth", access_token: false }

}
export const catchToken = (app: express.Application) => {
    app.post("/catch-token", async (req, res, next) => {
        var refresh_token = req.body.refresh_token;
        var profile = req.body.profile;
        if (!refresh_token) return res.status(401).send({ catch_refresh_token: false });
        if (!profile) return res.status(401).send({ catch_refresh_token: false });
        var account = await AccountMongo.findOne({ sub: profile.sub, email: profile.email });
        var token = await TokenMongo.findById(account?.id_tokens);
        if (token?.refresh_token == refresh_token) {
            const access_token = hashToken({ sub: req.body.sub, email: req.body.email, email_verified: true }, process.env.NODE_ENV_ACCESS_TOKEN_SECRET as string, parseInt(process.env.NODE_ENV_EXPIRES_IN_JWT as string))
            await TokenMongo.findByIdAndUpdate(token?.id, { $setOnInsert: { access_token: access_token } });
            return res.status(200).send({ access_token: access_token });
        } else {
            return res.status(401).send({ access_token: false });
        }
    })
}