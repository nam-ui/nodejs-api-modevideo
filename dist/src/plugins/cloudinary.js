"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = __importDefault(require("cloudinary"));
class CloudinaryController {
    constructor() {
        cloudinary_1.default.v2.config({ api_key: process.env.NODE_ENV_CLOUDINARY_API_KEY, cloud_name: process.env.NODE_ENV_CLOUDINARY_NAME, api_secret: process.env.NODE_ENV_CLOUDINARY_API_SECRET, secure: true, });
    }
    static getInstance() {
        if (!CloudinaryController.instance) {
            CloudinaryController.instance = new CloudinaryController();
        }
        return CloudinaryController.instance;
    }
}
exports.default = CloudinaryController;
