"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getURLLogin = void 0;
const googleapis_1 = require("googleapis");
const query_string_1 = __importDefault(require("query-string"));
const HashToken_1 = require("../../utils/HashToken");
const uuid_1 = require("uuid");
const index_interface_1 = __importDefault(require("../index.interface"));
const auth_dto_1 = __importDefault(require("./auth.dto"));
const token_dto_1 = __importDefault(require("./token.dto"));
const init_1 = require("../../init");
const files_dto_1 = __importDefault(require("../files/files.dto"));
const video_dto_1 = __importDefault(require("../video/video.dto"));
const status_dto_1 = __importDefault(require("../status/status.dto"));
const oauth2 = googleapis_1.google.auth.OAuth2;
class AuthService extends index_interface_1.default {
    constructor() {
        super();
        this.oauth2Client = new googleapis_1.google.auth.OAuth2({
            clientId: process.env.NODE_ENV_GOOGLE_APP_ID,
            clientSecret: process.env.NODE_ENV_GOOGLE_APP_SECRET,
            redirectUri: process.env.NODE_ENV_GOOGLE_APP_REDIRECT_URL,
            eagerRefreshThresholdMillis: 3000,
            forceRefreshOnFailure: true,
        });
        this._message = "[auth]";
    }
    async loginGoogle(req, res, next) {
        try {
            var file;
            var token;
            var account;
            var accountExist = true;
            const access_token = (0, HashToken_1.hashToken)({ sub: req.body.sub, email: req.body.email, email_verified: req.body.email_verified }, process.env.NODE_ENV_ACCESS_TOKEN_SECRET, parseInt(process.env.NODE_ENV_EXPIRES_IN_JWT));
            const refresh_token = (0, HashToken_1.hashToken)({ id: (0, uuid_1.v4)() }, process.env.NODE_ENV_ACCESS_TOKEN_SECRET, parseInt(process.env.NODE_ENV_EXPIRES_IN_JWT) * 1008);
            account = await auth_dto_1.default.findOne({ sub: req.body.sub, email: req.body.email }).then(async (account) => {
                if (!!!account) {
                    accountExist = false;
                    file = await new files_dto_1.default({ dir: { dir: `${init_1.init.projectDir}/${req.body.sub}` } }).save();
                    token = await new token_dto_1.default({ access_token: access_token, refresh_token: refresh_token }).save();
                    await new auth_dto_1.default({ email: req.body.email, family_name: req.body.family_name, given_name: req.body.given_name, picture: req.body.picture, sub: req.body.sub, id_tokens: token.id, id_files: file.id }).save();
                }
                if (accountExist) {
                    token = await token_dto_1.default.findByIdAndUpdate(account === null || account === void 0 ? void 0 : account.id_tokens, { $set: { access_token: access_token, refresh_token: refresh_token } });
                    await auth_dto_1.default.findByIdAndUpdate(account === null || account === void 0 ? void 0 : account.id, { $setOnInsert: { id_tokens: token === null || token === void 0 ? void 0 : token.id } });
                }
            });
            account = await auth_dto_1.default.findOne({ sub: req.body.sub, email: req.body.email });
            return res.status(200).send({
                status: 200, message: `${this._message} success`, data: {
                    account: {
                        byParty: account === null || account === void 0 ? void 0 : account.byParty,
                        email: account === null || account === void 0 ? void 0 : account.email,
                        family_name: account === null || account === void 0 ? void 0 : account.family_name,
                        given_name: account === null || account === void 0 ? void 0 : account.given_name,
                        iat: account === null || account === void 0 ? void 0 : account.iat,
                        picture: account === null || account === void 0 ? void 0 : account.picture,
                        role: account === null || account === void 0 ? void 0 : account.roles,
                        sub: account === null || account === void 0 ? void 0 : account.sub,
                    }, token: { access_token: access_token, refresh_token: refresh_token }
                }
            });
        }
        catch (error) {
            return res.send({ status: 400, message: `${this._message} ${error}`, data: null });
        }
    }
    async getInfo(req, res, next) {
        var account;
        account = await auth_dto_1.default.findOne({ sub: req.body.sub, email: req.body.email });
        return res.send({ status: 200, message: "success", data: { account: account } });
    }
    async getProfile(req, res, next) {
        var account;
        var video;
        account = await auth_dto_1.default.findOne({ sub: req.params.id });
        video = await video_dto_1.default.find({ id_account: account === null || account === void 0 ? void 0 : account.id });
        const result_video = await Promise.all(video.map(async (el) => {
            var status = await status_dto_1.default.findById(el.id_status);
            return {
                id: el.id,
                toPath: `@${(req.params.id)}/video/${el.id}`,
                video_url: el.video_url,
                cover_picture: el.cover_picture,
                note: el.note,
                tag_account: el.tag_account,
                hashtag: el.hashtag,
                status: {
                    view: status === null || status === void 0 ? void 0 : status.view,
                    heart: status === null || status === void 0 ? void 0 : status.heart,
                }
            };
        })).then(value => value);
        return res.send({ status: 200, message: "success", data: { account: account, video: result_video } });
    }
}
exports.default = AuthService;
const getURLLogin = () => {
    return {
        fb: `https://www.facebook.com/v15.0/dialog/oauth?${query_string_1.default.stringify({
            client_id: process.env.NODE_ENV_FB_APP_ID,
            redirect_uri: process.env.NODE_ENV_FB_APP_REDIRECT_URL,
        })}`,
        google: `https://accounts.google.com/o/oauth2/v2/auth?${query_string_1.default.stringify({
            client_id: process.env.NODE_ENV_GOOGLE_APP_ID,
            redirect_uri: "https://107b-14-180-184-110.ap.ngrok.io/auth/o/google",
            scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email', "openid",
            ].join(' '),
            access_type: 'offline',
            response_type: 'code',
            prompt: 'consent',
        })}`
    };
};
exports.getURLLogin = getURLLogin;
