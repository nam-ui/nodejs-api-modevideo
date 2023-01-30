import { Types } from "mongoose";

export interface ICategories {
    readonly type: "video-long" | "video-short" | "audio" | "blog"
}