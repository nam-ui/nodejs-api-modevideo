import express from "express";
import { google } from "googleapis";
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
        AuthController.application.get(`${AuthController.baseURL}/o/facebook`, async (req, res, next) => {
            try {
                await authService.loginFacebook(req, res, next);
            } catch (error) {
                return res.send({ status: 404, message: error })
            }
        });
        AuthController.application.get(`${AuthController.baseURL}/o/google`, (req, res, next) => {
            console.log("CALL ME");
            try {
                authService.loginGoogle(req, res, next);
            } catch (error) {
                return res.send({ status: 404, message: error, data: null })
            }
        });
        AuthController.application.post(`${AuthController.baseURL}/call/google`, async (req, res, next) => {
            console.log("CALL ME_________CALLLLLLLLLLLLL");
            console.log(req.body);

            try {
                const oauth2Client = new oauth2();
                oauth2Client.credentials = req.body.credential;
                const information_account = google.oauth2({ auth: oauth2Client, version: 'v2' });
                return information_account.userinfo.get(async (_err, _res) => {
                    console.log(_res);
                    if (_res?.data) {
                        res.send({ status: _res.data });
                    }
                })

            } catch (error) {
                return res.send({ status: 404, message: error, data: null })
            }
        });
    }
}
