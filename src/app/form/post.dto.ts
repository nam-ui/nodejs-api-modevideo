import { model, Schema } from 'mongoose';
import { IPost } from './post.interface';
const postShema = new Schema<IPost>({
    id_files: { required: true, type: Schema.Types.ObjectId, ref: 'Files' },
    id_descriptions: { required: true, type: Schema.Types.ObjectId, ref: 'Descriptions' },
    id_categories: { required: true, type: Schema.Types.ObjectId, ref: 'Categories' },
    id_comments: { required: true, type: Schema.Types.ObjectId, ref: 'Comments' },
    id_status: { required: true, type: Schema.Types.ObjectId, ref: 'Status' },
    id_rating: { required: true, type: Schema.Types.ObjectId, ref: 'Rating' },

    title: { type: String, default: "--", required: true },
    resolutionAspectRatio: { type: String, default: "16:9", },
    purchasePrice: { type: String, default: "0.0", },
    postTags: [String],
});

const PostMongo = model<IPost>('Posts', postShema);
export default PostMongo;