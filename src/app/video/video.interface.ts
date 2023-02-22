import { Types } from "mongoose";

export interface IVideo {
    id_comments: Types.ObjectId;
    id_status: Types.ObjectId;
    id_account: Types.ObjectId;

    video_url: String,
    cover_picture: String,
    note: String,
    tag_account: {value: String, text: String}[]
    hashtag: String[]
}