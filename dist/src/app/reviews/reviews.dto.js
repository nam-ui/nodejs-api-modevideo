"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const accountShema = new mongoose_1.Schema({
    id_user: {
        required: true,
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Users'
    },
    product_reviews: {
        required: true,
        type: Map,
        of: {
            _id: false,
            id_product: {
                required: true,
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'Products'
            },
            reviews: {
                type: Map,
                of: {
                    _id: false,
                    id_user: {
                        required: true,
                        type: mongoose_1.Schema.Types.ObjectId,
                        ref: 'Users'
                    },
                    comment: {
                        required: true,
                        type: String,
                    },
                    rating: {
                        required: true,
                        type: String,
                    },
                    property_attachment_review: {
                        required: true,
                        type: String,
                    }
                }
            }
        }
    }
});
const AccountMongo = (0, mongoose_1.model)('Reviews', accountShema);
exports.default = AccountMongo;
