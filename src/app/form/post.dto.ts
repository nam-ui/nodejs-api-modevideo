import { Schema, model, connect } from 'mongoose';
import { IPost } from './post.interface';
const accountShema = new Schema<IPost>({
    

});

const AccountMongo = model<IPost>('Posts', accountShema);
export default AccountMongo;
