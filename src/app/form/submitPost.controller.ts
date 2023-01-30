import express from "express";
import { UploadedFile } from "express-fileupload";
import path from "path";
import { Observable } from 'rxjs';
import cloudinaryService from "../cloudinary/cloudinary.service";
import PostMongo from "./post.dto"
import PostService from "./post.service";
export default class PostController {
    private static application: express.Application;
    private static baseURL: string;
    constructor(app: express.Application, baseURL: string) {
        PostController.application = app;
        PostController.baseURL = baseURL;
    }
    start() {
        PostController.application.post(`${PostController.baseURL}/post`, async (req, res, next) => {
            try {
                if (req.body.categories === "video-long") {
                    const createVideoLong = await PostService.createVideoLong(req, res, next);
                    if (!createVideoLong) {
                        return res.status(400).send({
                            status: 400,
                            message: "[Submit-post] error not created"
                        });
                    }
                    return res.send({
                        status: 200,
                        data: createVideoLong,
                    });
                }
            } catch (error) {
                return res.status(400).send({ status: 400, message: error })
            }
        });
    }
}
