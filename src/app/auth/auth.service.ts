import axios from "axios";
import express from "express";
import { google } from 'googleapis';
import { OAuth2Client } from "googleapis-common";
import jwt from "jsonwebtoken";
import queryString from "query-string";


import MainRouter from "../index.interface";
import AccountMongo from "./auth.dto";

const oauth2 = google.auth.OAuth2;
export default class AuthService extends MainRouter {
    oauth2Client: OAuth2Client;
    constructor() {
        super();
        this.oauth2Client = new google.auth.OAuth2({
            clientId: process.env.NODE_ENV_GOOGLE_APP_ID,
            clientSecret: process.env.NODE_ENV_GOOGLE_APP_SECRET,
            redirectUri: process.env.NODE_ENV_GOOGLE_APP_REDIRECT_URL,
            eagerRefreshThresholdMillis: 3000,
            forceRefreshOnFailure: true,
        });
        this._message = "[auth]"
    }
    public async loginFacebook(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const stringifiedParams = queryString.stringify({
                client_id: process.env.NODE_ENV_FB_APP_ID,
                client_secret: process.env.NODE_ENV_FB_APP_SECRET,
                redirect_uri: process.env.NODE_ENV_FB_APP_REDIRECT_URL,
                code: req.query.code,
            });
            const data = await axios(`https://graph.facebook.com/v15.0/oauth/access_token?${stringifiedParams}`);
            if (data) {
                const account = await axios.get(`https://graph.facebook.com/v15.0/me`, {
                    params: {
                        access_token: data.data.access_token,
                        fields: 'name,email,picture',
                        locale: 'en_US',
                        method: 'get',
                        sdk: 'joey',
                        suppress_http_code: 1
                    }
                });
                if (account) {
                    const isExist = await checkAccountInDatabase(account.data.email)
                    const hashToken = await authHashToken({ name: account.data.name as string, email: account.data.email as string });
                    await updateRefreshToken(account.data.email as string, hashToken?.refreshToken as string);
                    if (isExist) return res.send({
                        status: 200, message: `${this._message} login-fb-success`, data: {
                            expiresIn: process.env.NODE_ENV_EXPIRES_IN_JWT,
                            name: account.data.name,
                            email: account.data.email,
                            avatar: account.data.picture.data.url,
                            access_token: hashToken?.accessToken,
                            refresh_token: hashToken?.refreshToken
                        }
                    })
                    await new AccountMongo({ refreshToken: hashToken?.refreshToken, name: account.data.name, email: account.data.email, avatar: account.data.picture.data.url, isByPartyFacebook: true, }).save();
                    return res.send({
                        status: 200, message: `${this._message} login-fb-success`, data: { access_token: hashToken?.refreshToken, refresh_token: hashToken?.refreshToken, expiresIn: process.env.NODE_ENV_EXPIRES_IN_JWT, name: account.data.name, email: account.data.email, avatar: account.data.picture.data.url, }
                    })
                }
            }
        } catch (error) {
            return res.send({ status: 400, message: `${this._message} ${error}`, data: null })
        }
    }
    public async loginGoogle(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const code = req.query.code as string;
            console.log(code);
            const data_google = await this.oauth2Client.getToken(code);
            const oauth2Client = new oauth2();
            oauth2Client.setCredentials({ access_token: data_google.tokens.access_token });
            const information_account = google.oauth2({ auth: oauth2Client, version: 'v2' });
            return information_account.userinfo.get(async (_err, _res) => {
                if (_res?.data) {
                    const isExist = await checkAccountInDatabase(_res.data.email as string)
                    if (!isExist) {
                        await new AccountMongo({ name: _res.data.name, email: _res.data.email, avatar: _res.data.picture, isByPartyGoogle: true, }).save();
                    }
                    const hashToken: any = await authHashToken({ name: _res.data.name as string, email: _res.data.email as string })
                    await updateRefreshToken(_res.data.email as string, hashToken?.refreshToken as string)
                    return res.send({ status: 200, message: `${this._message} login-google-success`, data: { expiresIn: process.env.NODE_ENV_EXPIRES_IN_JWT, name: _res.data.name, email: _res.data.email, avatar: _res.data.picture, access_token: hashToken?.refreshToken, refresh_token: hashToken?.refreshToken } });
                }
                else { return res.send({ status: 400, message: `${this._message} Can't get your google info`, data: null }); }
            })
        } catch (error) {
            return res.send({ status: 400, message: `${this._message} ${error}`, data: null })
        }
    }


}
async function checkAccountInDatabase(email: string) {
    let isExist = false;
    const account_mg = await AccountMongo.findOne({ email: email });
    if (account_mg?.name) { return true };
    return isExist;
}
export const authHashToken = async (payload: { name: string, email: string }) => {
    try {
        const accessToken = await jwt.sign({ data: payload }, process.env.NODE_ENV_ACCESS_TOKEN_SECRET as string, {
            algorithm: 'HS256',
            expiresIn: process.env.NODE_ENV_EXPIRES_IN_JWT,
        });
        const refreshToken = await jwt.sign({ data: payload }, process.env.NODE_ENV_ACCESS_TOKEN_SECRET as string, {
            expiresIn: parseInt(process.env.NODE_ENV_EXPIRES_IN_JWT as string) * 60
        });
        return { accessToken, refreshToken };
    } catch (error) {
        console.error({ status: 400, message: `[auth] ${error} - hash token`, data: null })
    }
};
export const updateRefreshToken = async (email: string, refresh_token: string) => {
    try {
        await AccountMongo.findOneAndUpdate({ email: email, }, { $set: { refreshToken: refresh_token } })
    } catch (error) {
        console.error({ status: 400, message: `[auth] ${error} - update token`, data: null })
    }
}

export const getURLLogin = (): { fb: String, google: String } => {
    return {
        fb: `https://www.facebook.com/v15.0/dialog/oauth?${queryString.stringify({
            client_id: process.env.NODE_ENV_FB_APP_ID,
            redirect_uri: process.env.NODE_ENV_FB_APP_REDIRECT_URL,
        })}`,
        google: `https://accounts.google.com/o/oauth2/v2/auth?${queryString.stringify({
            client_id: process.env.NODE_ENV_GOOGLE_APP_ID,
            redirect_uri: process.env.NODE_ENV_GOOGLE_APP_REDIRECT_URL,
            scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email', "openid",
            ].join(' '),
            access_type: 'offline',
            response_type: 'code',
            prompt: 'consent',
        })}`
    }
}