"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const init_1 = require("../../init");
const app_dto_1 = __importDefault(require("./app.dto"));
class AppService {
    constructor() {
    }
    static getInstance() {
        if (!AppService.instance) {
            AppService.instance = new AppService();
        }
        return AppService.instance;
    }
    static async createSnapShot() {
        return await app_dto_1.default.findOne({ project: init_1.init.project }).then(result => {
            if (!!!result)
                new app_dto_1.default({
                    project: init_1.init.project,
                    app: {
                        name: init_1.init.project,
                        logo: {
                            dark: "clouldinary-url",
                            light: "clouldinary-url",
                            main: "clouldinary-url",
                        },
                        reserve_images: {
                            avatar: {
                                male: "",
                                female: "",
                                different: '',
                            },
                            images_items: "",
                        },
                    }
                }).save();
        });
    }
    static async getAll() {
        return await app_dto_1.default.find({ 'project': init_1.init.project }).limit(1);
    }
}
exports.default = AppService;
