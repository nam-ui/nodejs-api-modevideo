"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const reviews_dto_1 = __importDefault(require("./reviews.dto"));
class ReviewController {
    constructor(app, baseURL) {
        ReviewController.application = app;
        ReviewController.baseURL = baseURL;
    }
    start() {
        ReviewController.application.get(`${ReviewController.baseURL}`, async (req, res, next) => {
            try {
                res.send({ msg: "send" });
            }
            catch (error) {
                return res.send({ status: 404, message: error });
            }
        });
        ReviewController.application.post(`${ReviewController.baseURL}`, (req, res, next) => {
            try {
                new reviews_dto_1.default({
                    id_user: "6395f26362d4e837aa4bc52a",
                    product_reviews: {
                        "6395f2a262d4e837aa4bc52b": {
                            id_product: "6395f2a262d4e837aa4bc52b",
                            reviews: {
                                "6395f26362d4e837aa4bc52a": {
                                    comment: "Beautiful home, very picturesque and close to everything in jtree! A little warm for a hot weekend, but would love to come back during the cooler seasons!",
                                    id_user: "6395f26362d4e837aa4bc52a",
                                    property_attachment_review: "user-key/attachment_uuid",
                                    rating: 5
                                }
                            }
                        },
                        "6395f2db62d4e837aa4bc52c": {
                            id_product: "6395f2db62d4e837aa4bc52c",
                            reviews: {
                                "6395f26362d4e837aa4bc52a": {
                                    comment: "Beautiful home, very picturesque and close to everything in jtree! A little warm for a hot weekend, but would love to come back during the cooler seasons!",
                                    id_user: "6395f26362d4e837aa4bc52a",
                                    property_attachment_review: "user-key/attachment_uuid",
                                    rating: 5
                                }
                            }
                        }
                    }
                }).save();
            }
            catch (error) {
                return res.send({ status: 404, message: error, data: null });
            }
        });
    }
}
exports.default = ReviewController;
