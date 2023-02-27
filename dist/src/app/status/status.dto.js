"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const statusShema = new mongoose_1.Schema({
    only_view: {
        type: String,
        enum: ['Công khai', 'Bạn bè', 'Riêng tư'],
        description: "can only be either 'Công khai' or 'Bạn bè' or 'Riêng tư'."
    },
    access_user: [String],
    view: { type: Number, default: 1 },
    heart: { type: Number, default: 1 },
});
const StatusMongo = (0, mongoose_1.model)('Status', statusShema);
exports.default = StatusMongo;
