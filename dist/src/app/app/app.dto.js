"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const appSchema = new mongoose_1.Schema({
    app: Map,
    project: {
        type: String,
        require: true,
        unique: true,
    }
});
const appMongo = (0, mongoose_1.model)('App', appSchema);
exports.default = appMongo;
