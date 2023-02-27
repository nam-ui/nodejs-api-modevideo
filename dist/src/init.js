"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const app_service_1 = __importDefault(require("./app/app/app.service"));
class SnapShot {
    constructor() {
        app_service_1.default.createSnapShot();
    }
    static getInstance() {
        if (!SnapShot.instance) {
            SnapShot.instance = new SnapShot();
        }
        return SnapShot.instance;
    }
}
exports.default = SnapShot;
const init = {
    project: "api-candy",
    projectDir: "apiCandy",
};
exports.init = init;
