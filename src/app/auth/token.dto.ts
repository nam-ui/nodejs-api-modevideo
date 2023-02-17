import { Schema, model, connect } from 'mongoose';
export interface IToken {
    access_token: String,
    refresh_token: String,
}
const tokenShema = new Schema<IToken>({
    access_token: { type: String, require: true },
    refresh_token: { type: String, require: true },
});
const TokenMongo = model<IToken>('Tokens', tokenShema);
export default TokenMongo;