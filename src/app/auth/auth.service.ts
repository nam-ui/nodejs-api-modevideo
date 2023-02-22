import axios from "axios";
import express from "express";
import { google } from 'googleapis';
import { OAuth2Client } from "googleapis-common";
import jwt from "jsonwebtoken";
import queryString from "query-string";
import { hashToken } from "../../utils/HashToken";
import { v4 as uuidv4 } from 'uuid';


import MainRouter from "../index.interface";
import AccountMongo from "./auth.dto";
import TokenMongo from "./token.dto"
import FileService from "../files/files.service";
import { init } from "../../init";
import FilesMongo from "../files/files.dto";
import VideoMongo from "../video/video.dto";
import StatusMongo from "../status/status.dto";
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
    public async loginGoogle(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            var file;
            var token;
            var account;
            var accountExist = true;
            const access_token = hashToken({ sub: req.body.sub, email: req.body.email, email_verified: req.body.email_verified }, process.env.NODE_ENV_ACCESS_TOKEN_SECRET as string, parseInt(process.env.NODE_ENV_EXPIRES_IN_JWT as string))
            const refresh_token = hashToken({ id: uuidv4() }, process.env.NODE_ENV_ACCESS_TOKEN_SECRET as string, parseInt(process.env.NODE_ENV_EXPIRES_IN_JWT as string) * 1008);
            account = await AccountMongo.findOne({ sub: req.body.sub, email: req.body.email }).then(async account => {
                if (!!!account) {
                    accountExist = false;
                    file = await new FilesMongo({ dir: { dir: `${init.projectDir}/${req.body.sub}` } }).save();
                    token = await new TokenMongo({ access_token: access_token, refresh_token: refresh_token }).save();
                    await new AccountMongo({ email: req.body.email, family_name: req.body.family_name, given_name: req.body.given_name, picture: req.body.picture, sub: req.body.sub, id_tokens: token.id, id_files: file.id }).save();
                }
                if (accountExist) {
                    token = await TokenMongo.findByIdAndUpdate(account?.id_tokens, { $set: { access_token: access_token, refresh_token: refresh_token } });
                    await AccountMongo.findByIdAndUpdate(account?.id, { $setOnInsert: { id_tokens: token?.id } })
                }
            })
            account = await AccountMongo.findOne({ sub: req.body.sub, email: req.body.email });
            return res.status(200).send({
                status: 200, message: `${this._message} success`, data: {
                    account: {
                        byParty: account?.byParty,
                        email: account?.email,
                        family_name: account?.family_name,
                        given_name: account?.given_name,
                        iat: account?.iat,
                        picture: account?.picture,
                        role: account?.roles,
                        sub: account?.sub,
                    }, token: { access_token: access_token, refresh_token: refresh_token }
                }
            })

        } catch (error) {
            return res.send({ status: 400, message: `${this._message} ${error}`, data: null })
        }
    }

    public async getInfo(req: express.Request, res: express.Response, next: express.NextFunction) {
        var account;
        account = await AccountMongo.findOne({ sub: req.body.sub, email: req.body.email });
        return res.send({ status: 200, message: "success", data: { account: account } })
    }
    public async getProfile(req: express.Request, res: express.Response, next: express.NextFunction) {
        var account;
        var video;
        account = await AccountMongo.findOne({sub: req.params.id});
        video = await VideoMongo.find({ id_account: account?.id });
        const result_video = await Promise.all(video.map(async el => {
            var status = await StatusMongo.findById(el.id_status);
            return {
                id: el.id,
                toPath: `@${(req.params.id)}/video/${el.id}`,
                video_url: el.video_url,
                cover_picture: el.cover_picture,
                note: el.note,
                tag_account: el.tag_account,
                hashtag: el.hashtag,
                status: {
                    view: status?.view,
                    heart: status?.heart,
                }
            }
        })).then(value => value);
        return res.send({ status: 200, message: "success", data: { account: account, video: result_video } })
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
            redirect_uri: "https://107b-14-180-184-110.ap.ngrok.io/auth/o/google",
            scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email', "openid",
            ].join(' '),
            access_type: 'offline',
            response_type: 'code',
            prompt: 'consent',
        })}`
    }
}