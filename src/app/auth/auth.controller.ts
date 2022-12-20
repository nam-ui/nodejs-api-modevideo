import express from "express";
import AuthService from "./auth.service";
export default class AuthController {
    private static application: express.Application;
    private static baseURL: string;
    constructor(app: express.Application, baseURL: string) {
        AuthController.application = app;
        AuthController.baseURL = baseURL;
    }
    start() {
        const authService = new AuthService();
        AuthController.application.get(`${AuthController.baseURL}/o/facebook`, async (req, res, next) => {
            try {
                await authService.loginFacebook(req, res, next);
            } catch (error) {
                return res.send({ status: 404, message: error })
            }
        });
        AuthController.application.get(`${AuthController.baseURL}/o/google`, (req, res, next) => {
            try {
                authService.loginGoogle(req, res, next);
            } catch (error) {
                return res.send({ status: 404, message: error, data: null })
            }
        });
    }
}
