"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const commentsShema = new mongoose_1.Schema({
    id_video: { required: true, type: mongoose_1.Schema.Types.ObjectId, ref: 'Videos', unique: true },
    map: [{
            f_id: { type: mongoose_1.Schema.Types.ObjectId, unique: false },
            p_id: { type: mongoose_1.Schema.Types.ObjectId, unique: false },
            id_user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Users', require: true },
            hash_user: [],
            note: String,
            timeWrite: { default: Math.round(Date.now() / 1000), type: Number },
            required: false,
        }]
});
const CommentsMongo = (0, mongoose_1.model)('Comments', commentsShema);
exports.default = CommentsMongo;
