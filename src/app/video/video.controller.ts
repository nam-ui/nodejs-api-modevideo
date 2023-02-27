import express from "express";
import { middleware_auth } from "../middleware/auth";
import VideoService from "./video.service";
export default class PostController {
    private static application: express.Application;
    private static baseURL: string;
    constructor(app: express.Application, baseURL: string) {
        PostController.application = app;
        PostController.baseURL = baseURL;
    }
    start() {
        PostController.application.post(`${PostController.baseURL}/upload`, async (req, res, next) => {
            try {
                await middleware_auth(req, res, next);
                const createVideo = await VideoService.createVideo(req, res, next);
                if (!createVideo) {
                    return res.status(400).send({
                        status: 400,
                        message: "[Submit-post] error not created"
                    });
                }
                return res.send({
                    status: 200,
                    data: createVideo,
                });
            } catch (error: any) {
                if (error?.access_token as Boolean === false) {
                    return res.status(401).send({ status: 401, access_token: false })
                } else {
                    return res.status(400).send({ status: 400, message: error })
                }
            }
        });
        PostController.application.get(`${PostController.baseURL}/@:idAccount/:idVideo`, async (req, res, next) => {
            try {
                return res.send({
                    status: 200,
                    data: await VideoService.getById(req, res, next),
                });
            } catch (error: any) {
                return res.status(400).send({ status: 400, message: error })
            }
        });
        PostController.application.get(`${PostController.baseURL}/get-list`, async (req, res, next) => {
            try {
                return res.send({
                    status: 200,
                    data: await VideoService.getList(req, res, next),
                });
            } catch (error: any) {
                return res.status(400).send({ status: 400, message: error })
            }
        });
    }
}