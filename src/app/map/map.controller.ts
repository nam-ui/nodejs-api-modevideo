import express from "express";
import _ from "lodash";

import { verify } from "jsonwebtoken";
import AppService from "../app/app.service";
import { getURLLogin } from "../auth/auth.service";

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
                var results: Record<string, any> = {};
                if (req.headers.x_authorization) {
                    const decodeToken = verify(req.headers.x_authorization as string, process.env.NODE_ENV_ACCESS_TOKEN_SECRET as string, { ignoreExpiration: true, }) as { name: string, email: string, superId: String };
                    decodeToken.superId ? results.account = {
                        superId: decodeToken.superId,
                        name: decodeToken.name,
                        gender: "Male",
                        email: decodeToken.email,
                        membershipId: "Free Membership",
                    } : false;
                }
                var _app = (await AppService.getAll()).map(el => _.get(el, "app"));
                if (_app) results.app = { ..._app, ...getURLLogin() };
                return res.status(200).send(results);
            } catch (error) {
                return res.status(400).send({ message: `${error}` });
            }
        });
    }
}
