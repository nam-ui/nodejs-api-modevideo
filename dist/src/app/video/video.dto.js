"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const videoSchema = new mongoose_1.Schema({
    id_comments: { required: true, type: mongoose_1.Schema.Types.ObjectId, ref: 'Comments' },
    id_status: { required: true, type: mongoose_1.Schema.Types.ObjectId, ref: 'Status' },
    id_account: { required: true, type: mongoose_1.Schema.Types.ObjectId, ref: 'Users' },
    video_url: { type: String, require: true },
    cover_picture: { type: String, require: true },
    note: { type: String, default: "" },
    tag_account: [String],
    hashtag: [String],
});
const VideoMongo = (0, mongoose_1.model)('Videos', videoSchema);
exports.default = VideoMongo;
