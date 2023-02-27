import express from "express";
import { middleware_auth } from "../middleware/auth";
import CommentsService from "./comments.service";
export default class CommentsController {
    private static application: express.Application;
    private static baseURL: string;
    constructor(app: express.Application, baseURL: string) {
        CommentsController.application = app;
        CommentsController.baseURL = baseURL;
    }
    start() {
        CommentsController.application.get(`${CommentsController.baseURL}/:id`, async (req, res, next) => {
            try {
                return await CommentsService.getCommentsByIdVideo(req, res, next);
            } catch (error) {
                return res.status(404).send({ status: 404, message: error, data: null })
            }
        });
        CommentsController.application.post(`${CommentsController.baseURL}/`, async (req, res, next) => {
            try {
                await middleware_auth(req, res, next);
                return await CommentsService.create(req, res, next);
            } catch (error) {
                return res.send({ status: 404, message: error, data: null })
            }
        });
    }
}
