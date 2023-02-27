"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchToken = exports.middleware_auth = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const HashToken_1 = require("../../utils/HashToken");
const auth_dto_1 = __importDefault(require("../auth/auth.dto"));
const token_dto_1 = __importDefault(require("../auth/token.dto"));
const middleware_auth = async (req, res, next) => {
    var token;
    var error;
    const access_token = req.headers.authorization;
    if (!access_token)
        throw { message: "middleware_auth", access_token: false };
    const decodeToken = (0, jsonwebtoken_1.decode)(access_token);
    if (!decodeToken)
        throw { message: "middleware_auth", access_token: false };
    await auth_dto_1.default.findOne({ email: decodeToken.email }).then(async (account) => {
        if (!!!account) {
            error = true;
        }
        else {
            token = await token_dto_1.default.findById(account.id_tokens).then(async (token) => {
                if (access_token === (token === null || token === void 0 ? void 0 : token.access_token)) {
                    return;
                }
                else {
                    throw { message: "middleware_auth", access_token: false };
                }
            });
        }
    });
    if (error)
        throw { message: "middleware_auth", access_token: false };
};
exports.middleware_auth = middleware_auth;
const catchToken = (app) => {
    app.post("/catch-token", async (req, res, next) => {
        var refresh_token = req.body.refresh_token;
        var profile = req.body.profile;
        if (!refresh_token)
            return res.status(401).send({ catch_refresh_token: false });
        if (!profile)
            return res.status(401).send({ catch_refresh_token: false });
        var account = await auth_dto_1.default.findOne({ sub: profile.sub, email: profile.email });
        var token = await token_dto_1.default.findById(account === null || account === void 0 ? void 0 : account.id_tokens);
        if ((token === null || token === void 0 ? void 0 : token.refresh_token) == refresh_token) {
            const access_token = (0, HashToken_1.hashToken)({ sub: req.body.sub, email: req.body.email, email_verified: true }, process.env.NODE_ENV_ACCESS_TOKEN_SECRET, parseInt(process.env.NODE_ENV_EXPIRES_IN_JWT));
            await token_dto_1.default.findByIdAndUpdate(token === null || token === void 0 ? void 0 : token.id, { $setOnInsert: { access_token: access_token } });
            return res.status(200).send({ access_token: access_token });
        }
        else {
            return res.status(401).send({ access_token: false });
        }
    });
};
exports.catchToken = catchToken;
