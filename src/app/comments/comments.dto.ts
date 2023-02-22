import { model, Schema } from 'mongoose';
import { IComments } from './comments.interface';
const commentsShema = new Schema<IComments>({
    id_video: "",
    map: {
        author: { required: true, type: Schema.Types.ObjectId, ref: 'Users' },
        from: { type: Schema.Types.ObjectId, ref: 'Users', default: undefined },
        hash_user: [String],
        note: String,
        timeWrite: { default: Math.round(Date.now()) / 1000, type: Number },
        required: false,
    }
});

const CommentsMongo = model<IComments>('Comments', commentsShema);
export default CommentsMongo;