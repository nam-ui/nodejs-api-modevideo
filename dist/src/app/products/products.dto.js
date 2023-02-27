"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const accountShema = new mongoose_1.Schema({
    propertyTitle: { type: String, require: true },
    description: { type: String, require: true },
    status: { type: Boolean, require: true, default: true },
    room: { type: Number, require: true },
    tags: { type: [], require: true },
    price: { type: {}, required: true },
    expiryDate: { type: String, require: true },
    postDate: { type: String, require: true },
    location: {
        type: {
            address: String,
            countryOrigin: String,
            cty: String,
            location: {
                lat: Number,
                lon: Number
            },
        }, require: true
    },
    detailedInformation: { type: [], require: true },
    images: { type: [], require: true },
    propertyAttachments: { type: String, require: true },
    video: { type: String, require: true },
    id_review: {
        required: true,
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Review'
    },
});
const AccountMongo = (0, mongoose_1.model)('Products', accountShema);
exports.default = AccountMongo;
