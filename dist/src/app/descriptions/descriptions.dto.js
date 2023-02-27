"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const descriptionsShema = new mongoose_1.Schema({
    note: { type: String, require: true },
    tagAccount: { type: Object, of: {
            value: String,
            text: String,
        } },
    hashtag: { type: Object, of: {
            value: String,
            text: String,
        } },
});
const DescriptionsMongo = (0, mongoose_1.model)('Descriptions', descriptionsShema);
exports.default = DescriptionsMongo;
