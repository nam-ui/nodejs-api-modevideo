"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("../middleware/auth");
const comments_service_1 = __importDefault(require("./comments.service"));
class CommentsController {
    constructor(app, baseURL) {
        CommentsController.application = app;
        CommentsController.baseURL = baseURL;
    }
    start() {
        CommentsController.application.get(`${CommentsController.baseURL}/:id`, async (req, res, next) => {
            try {
                return await comments_service_1.default.getCommentsByIdVideo(req, res, next);
            }
            catch (error) {
                return res.status(404).send({ status: 404, message: error, data: null });
            }
        });
        CommentsController.application.post(`${CommentsController.baseURL}/`, async (req, res, next) => {
            try {
                await (0, auth_1.middleware_auth)(req, res, next);
                return await comments_service_1.default.create(req, res, next);
            }
            catch (error) {
                return res.send({ status: 404, message: error, data: null });
            }
        });
    }
}
exports.default = CommentsController;
