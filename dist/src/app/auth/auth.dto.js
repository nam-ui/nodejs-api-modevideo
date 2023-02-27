"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const accountShema = new mongoose_1.Schema({
    email: { type: String, require: true, unique: true },
    given_name: { type: String, require: true },
    family_name: { type: String, require: true },
    picture: { type: String, require: true },
    roles: { type: [], default: ["user"] },
    sub: { type: String, require: true, unique: true },
    byParty: { type: [], default: ["google"] },
    iat: { type: Number, require: true, default: Math.round(Date.now() / 1000) },
    id_tokens: { required: true, type: mongoose_1.Schema.Types.ObjectId, ref: 'Tokens' },
    id_files: { required: true, type: mongoose_1.Schema.Types.ObjectId, ref: 'Files' },
});
const AccountMongo = (0, mongoose_1.model)('Users', accountShema);
exports.default = AccountMongo;
/**
 * @openapi
 * components:
 *   schema:
 *     CustomerCreate:
 *       type: object
 *       required:
 *        - name
 *        - avatar
 *        - roles
 *        - email
 *        - refreshToken
 *        - isByPartyFacebook
 *        - isByPartyGoogle
 *       properties:
 *         name:
 *           type: string
 *         avatar:
 *           type: string
 *         roles:
 *           type: array
 *           default: ["user"]
 *         email:
 *           type: string
 *         refreshToken:
 *           type: string
 *         isByPartyFacebook:
 *           type: boolean
 *         isByPartyGoogle:
 *           type: boolean
 */
