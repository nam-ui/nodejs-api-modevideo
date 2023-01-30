import express from "express";
import SnapShot from "../../init";
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
                return {
                    app: SnapShot.getInstance(),
                    video_categories: ["Gaming","Movies","Sports","Entertainment"],
                };
            } catch (error) {
                return res.send({ status: 404, message: error })
            }
        });
        MapController.application.get(`${MapController.baseURL}/snapshot-account`, async (req, res, next) => {
            try {
                return {
                    info: {
                        superId: "hashtagsid",
                        name: "",
                        gender: "",
                        email: "",
                        membershipId: "Free Membership",
                    },
                };
            } catch (error) {
                return res.send({ status: 404, message: error })
            }
        });
    }
}
