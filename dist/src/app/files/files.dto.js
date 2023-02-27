"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const filesSchema = new mongoose_1.Schema({
    dir: { type: Map, of: String },
});
const FilesMongo = (0, mongoose_1.model)('Files', filesSchema);
exports.default = FilesMongo;
