import { Schema, model, connect } from 'mongoose';
import { IAccount } from './auth.interface';
const accountShema = new Schema<IAccount>({
    email        : { type: String, require: true, unique: true },
    given_name   : { type: String, require: true },
    family_name  : { type: String, require: true },
    picture      : { type: String, require: true },
    roles: { type: [], default: ["user"] },
    sub : { type: String, require: true, unique: true },
    byParty: { type: [], default: ["google"] },
    iat: { type: Number, require: true, default: Date.now() /1000 },
    
    id_tokens: { required: true, type: Schema.Types.ObjectId, ref: 'Tokens' },
    id_files: { required: true, type: Schema.Types.ObjectId, ref: 'Files' },
});
const AccountMongo = model<IAccount>('Users', accountShema);
export default AccountMongo;

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
