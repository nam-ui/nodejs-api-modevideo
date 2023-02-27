"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const jsonwebtoken_1 = require("jsonwebtoken");
const app_service_1 = __importDefault(require("../app/app.service"));
const auth_service_1 = require("../auth/auth.service");
class MapController {
    constructor(app, baseURL) {
        MapController.application = app;
        MapController.baseURL = baseURL;
    }
    start() {
        MapController.application.get(`${MapController.baseURL}/snapshot`, async (req, res, next) => {
            try {
                var results = {};
                if (req.headers.x_authorization) {
                    const decodeToken = (0, jsonwebtoken_1.verify)(req.headers.x_authorization, process.env.NODE_ENV_ACCESS_TOKEN_SECRET, { ignoreExpiration: true, });
                    decodeToken.superId ? results.account = {
                        superId: decodeToken.superId,
                        name: decodeToken.name,
                        gender: "Male",
                        email: decodeToken.email,
                        membershipId: "Free Membership",
                    } : false;
                }
                var _app = (await app_service_1.default.getAll()).map(el => lodash_1.default.get(el, "app"));
                if (_app)
                    results.app = Object.assign(Object.assign({}, _app), (0, auth_service_1.getURLLogin)());
                return res.status(200).send(results);
            }
            catch (error) {
                return res.status(400).send({ message: `${error}` });
            }
        });
    }
}
exports.default = MapController;
