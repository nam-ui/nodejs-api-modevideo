import { model, Schema } from 'mongoose';
import mongoose from 'mongoose';
import { IComments } from './comments.interface';


const commentsShema = new Schema<IComments>({
    id_video: { required: true, type: Schema.Types.ObjectId, ref: 'Videos', unique: true },
    map: [{
        f_id: { type: Schema.Types.ObjectId, unique: false },
        p_id: { type: Schema.Types.ObjectId, unique: false },
        id_user: { type: Schema.Types.ObjectId, ref: 'Users', require: true },
        hash_user: [],
        note: String,
        timeWrite: { default: Math.round(Date.now() / 1000), type: Number },
        required: false,
    }]
});

const CommentsMongo = model<IComments>('Comments', commentsShema);
export default CommentsMongo;