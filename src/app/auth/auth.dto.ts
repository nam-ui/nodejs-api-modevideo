import { Schema, model, connect } from 'mongoose';
import { IAccount } from './auth.interface';
const accountShema = new Schema<IAccount>({
    name: { type: String, require: true },
    avatar: { type: String, require: true },
    roles: { type: [String], default: ["user"] },

    email: { type: String, require: true, unique: true },
    refreshToken: { type: String, require: true },
    isByPartyFacebook: { type: Boolean, default: false },
    isByPartyGoogle: { type: Boolean, default: false },
    superId: { type: String, require: true, unique: true },
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
