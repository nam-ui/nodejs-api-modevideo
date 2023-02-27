"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const tokenShema = new mongoose_1.Schema({
    access_token: { type: String, require: true },
    refresh_token: { type: String, require: true },
});
const TokenMongo = (0, mongoose_1.model)('Tokens', tokenShema);
exports.default = TokenMongo;
