import { model, Schema } from 'mongoose';
import { IVideo } from './video.interface';
const videoSchema = new Schema<IVideo>({
    id_comments: { required: true, type: Schema.Types.ObjectId, ref: 'Comments' },
    id_status: { required: true, type: Schema.Types.ObjectId, ref: 'Status' },
    id_account: { required: true, type: Schema.Types.ObjectId, ref: 'Users' },

    video_url: { type: String, require: true },
    cover_picture: { type: String, require: true },
    note: { type: String, default: "" },
    tag_account: [String],
    hashtag: [String],
});

const VideoMongo = model<IVideo>('Videos', videoSchema);
export default VideoMongo;
