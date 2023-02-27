"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const elasticsearch_1 = __importDefault(require("@elastic/elasticsearch"));
class EsSearchController {
    constructor() {
        try {
            EsSearchController.client = new elasticsearch_1.default.Client({
                cloud: {
                    id: process.env.NODE_ENV_ELASTIC_SEARCH_CLOUD_ID,
                },
                auth: { apiKey: process.env.NODE_ENV_ELASTIC_SEARCH_KEY },
            });
            console.log("🍀 connected elasticsearch ✅");
        }
        catch (error) {
            console.error(error);
            process.exit(1);
        }
    }
    static getInstance() {
        if (!EsSearchController.instance) {
            EsSearchController.instance = new EsSearchController();
        }
        return EsSearchController.instance;
    }
    static async run() {
    }
}
exports.default = EsSearchController;
