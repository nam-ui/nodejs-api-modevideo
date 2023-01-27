import express from "express";
export default class MapController {
    private static application: express.Application;
    private static baseURL: string;
    constructor(app: express.Application, baseURL: string) {
        MapController.application = app;
        MapController.baseURL = baseURL;
    }
    start() {
        MapController.application.get(`${MapController.baseURL}/snapshot`, async (req, res, next) => {
            try {
            } catch (error) {
                return res.send({ status: 404, message: error })
            }
        });
    }
}
