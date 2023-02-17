import express from "express";
import { google } from "googleapis";
import { middleware_auth } from "../middleware/auth";
import AuthService from "./auth.service";


const oauth2 = google.auth.OAuth2;
export default class AuthController {
    private static application: express.Application;
    private static baseURL: string;
    constructor(app: express.Application, baseURL: string) {
        AuthController.application = app;
        AuthController.baseURL = baseURL;
    }
    start() {
        const authService = new AuthService();
        AuthController.application.post(`${AuthController.baseURL}/o/google`, async (req, res, next) => {
            try {
                await authService.loginGoogle(req, res, next);
            } catch (error) {
                return res.send({ status: 404, message: error, data: null })
            }
        });
        AuthController.application.post(`${AuthController.baseURL}/o/google/info`, async (req, res, next) => {
            try {
                await middleware_auth;
                authService.getInfo(req, res, next);
            } catch (error) {
                return res.send({ status: 404, message: error, data: null })
            }
        })
    }
}
