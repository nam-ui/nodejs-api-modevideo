import { model, Schema } from 'mongoose';
import { IPost } from './post.interface';
const postShema = new Schema<IPost>({
    id_files: { required: true, type: Schema.Types.ObjectId, ref: 'Files' },
    id_descriptions: { required: true, type: Schema.Types.ObjectId, ref: 'Descriptions' },
    id_comments: { required: true, type: Schema.Types.ObjectId, ref: 'Comments' },
    id_status: { required: true, type: Schema.Types.ObjectId, ref: 'Status' },
});

const PostMongo = model<IPost>('Posts', postShema);
export default PostMongo;