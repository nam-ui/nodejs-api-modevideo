"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const googleapis_1 = require("googleapis");
const auth_service_1 = __importDefault(require("./auth.service"));
const oauth2 = googleapis_1.google.auth.OAuth2;
class AuthController {
    constructor(app, baseURL) {
        AuthController.application = app;
        AuthController.baseURL = baseURL;
    }
    start() {
        const authService = new auth_service_1.default();
        AuthController.application.post(`${AuthController.baseURL}/o/google`, async (req, res, next) => {
            try {
                await authService.loginGoogle(req, res, next);
            }
            catch (error) {
                return res.send({ status: 404, message: error, data: null });
            }
        });
        AuthController.application.post(`${AuthController.baseURL}/o/google/info`, async (req, res, next) => {
            try {
                await authService.getInfo(req, res, next);
            }
            catch (error) {
                return res.send({ status: 404, message: error, data: null });
            }
        });
        AuthController.application.get(`${AuthController.baseURL}/profile/:id`, async (req, res, next) => {
            try {
                await authService.getProfile(req, res, next);
            }
            catch (error) {
                return res.send({ status: 404, message: error, data: null });
            }
        });
    }
}
exports.default = AuthController;
