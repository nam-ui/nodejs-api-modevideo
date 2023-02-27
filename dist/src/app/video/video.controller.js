"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("../middleware/auth");
const video_service_1 = __importDefault(require("./video.service"));
class PostController {
    constructor(app, baseURL) {
        PostController.application = app;
        PostController.baseURL = baseURL;
    }
    start() {
        PostController.application.post(`${PostController.baseURL}/upload`, async (req, res, next) => {
            try {
                await (0, auth_1.middleware_auth)(req, res, next);
                const createVideo = await video_service_1.default.createVideo(req, res, next);
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
            }
            catch (error) {
                if ((error === null || error === void 0 ? void 0 : error.access_token) === false) {
                    return res.status(401).send({ status: 401, access_token: false });
                }
                else {
                    return res.status(400).send({ status: 400, message: error });
                }
            }
        });
        PostController.application.get(`${PostController.baseURL}/@:idAccount/:idVideo`, async (req, res, next) => {
            try {
                return res.send({
                    status: 200,
                    data: await video_service_1.default.getById(req, res, next),
                });
            }
            catch (error) {
                return res.status(400).send({ status: 400, message: error });
            }
        });
        PostController.application.get(`${PostController.baseURL}/get-list`, async (req, res, next) => {
            try {
                return res.send({
                    status: 200,
                    data: await video_service_1.default.getList(req, res, next),
                });
            }
            catch (error) {
                return res.status(400).send({ status: 400, message: error });
            }
        });
    }
}
exports.default = PostController;
