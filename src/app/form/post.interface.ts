import { Types } from "mongoose";

export interface IPost {
    id_files: Types.ObjectId;
    id_descriptions: Types.ObjectId;
    id_categories: Types.ObjectId;
    id_comments: Types.ObjectId;
    id_status: Types.ObjectId;
    id_rating: Types.ObjectId;

    purchasePrice: String;
    resolutionAspectRatio: String;
    title: String;
    postTags: String;
}