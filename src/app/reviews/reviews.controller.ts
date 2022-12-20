import express from "express";
import ReviewsMongo from "./reviews.dto"
export default class ReviewController {
    private static application: express.Application;
    private static baseURL: string;
    constructor(app: express.Application, baseURL: string) {
        ReviewController.application = app;
        ReviewController.baseURL = baseURL;
    }
    start() {
        ReviewController.application.get(`${ReviewController.baseURL}`, async (req, res, next) => {
            try {
                res.send({ msg: "send" })
            } catch (error) {
                return res.send({ status: 404, message: error })
            }
        });
        ReviewController.application.post(`${ReviewController.baseURL}`, (req, res, next) => {
            try {
                new ReviewsMongo({
                    id_user: "6395f26362d4e837aa4bc52a", // user_key from obj ID
                    product_reviews: {
                        "6395f2a262d4e837aa4bc52b": { // product_key from dto product objID
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
            } catch (error) {
                return res.send({ status: 404, message: error, data: null })
            }
        });
    }
}
