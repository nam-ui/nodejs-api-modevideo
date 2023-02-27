"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
class Mongoose {
    constructor() {
        if (process.env.NODE_ENV_MONGO) {
            mongoose_1.default
                .connect(process.env.NODE_ENV_MONGO, { connectTimeoutMS: 1000 })
                .then((result) => {
                console.log('🍀 connected data mongodb ✅');
            })
                .catch((error) => {
                console.log(error);
                console.log('error data mongodb ❌');
                process.exit(1);
            });
        }
        else {
            console.log('error data mongodb ❌');
        }
    }
    static getInstance() {
        if (!Mongoose.instance) {
            Mongoose.instance = new Mongoose();
        }
        return Mongoose.instance;
    }
}
exports.default = Mongoose;
