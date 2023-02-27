"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const hashToken = (payload, secretCode, expiresIn) => {
    return jsonwebtoken_1.default.sign(payload, secretCode, {
        expiresIn: expiresIn
    });
};
exports.hashToken = hashToken;
