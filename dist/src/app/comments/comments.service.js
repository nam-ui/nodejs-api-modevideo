"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_interface_1 = __importDefault(require("../index.interface"));
const comments_dto_1 = __importDefault(require("./comments.dto"));
const CommentsDeep_1 = require("../../utils/CommentsDeep");
const jsonwebtoken_1 = require("jsonwebtoken");
const auth_dto_1 = __importDefault(require("../auth/auth.dto"));
const mongoose_1 = __importDefault(require("mongoose"));
class CommentsService extends index_interface_1.default {
    constructor() {
        super();
    }
    static async getCommentsByIdVideo(req, res, next) {
        var set_p_id = [];
        var comments = await comments_dto_1.default.findOne({ id_video: req.params.id }).then(value => value);
        var customs_comments = await Promise.all(comments === null || comments === void 0 ? void 0 : comments.map.map(async (el) => {
            if (el.p_id) {
                if (!set_p_id.includes(new mongoose_1.default.Types.ObjectId(el.p_id).toString())) {
                    set_p_id.push(new mongoose_1.default.Types.ObjectId(el.p_id).toString());
                }
            }
            return {
                id: el._id,
                f_id: el.f_id,
                p_id: el.p_id,
                hash_user: el.hash_user,
                note: el.note,
                timeWrite: el.timeWrite,
                user: await auth_dto_1.default.findById(el.id_user)
            };
        })).then(result => result);
        return res.status(200).send({ data: await (0, CommentsDeep_1.treeComments)(JSON.parse(JSON.stringify(customs_comments)), set_p_id) });
    }
    static async create(req, res, next) {
        var default_p_and_f_id = new mongoose_1.default.Types.ObjectId();
        var f_id = req.body.f_id;
        var p_id = req.body.p_id;
        if (!!!f_id)
            f_id = default_p_and_f_id;
        if (!!!p_id)
            p_id = default_p_and_f_id;
        if (!req.headers.authorization)
            return res.status(401).send({ access_token: false });
        const decodeToken = (0, jsonwebtoken_1.decode)(req.headers.authorization);
        var account = await auth_dto_1.default.findOne({ email: decodeToken.email, sub: decodeToken.sub });
        var comment = await comments_dto_1.default.findOneAndUpdate({ id_video: req.body.id_video }, {
            $push: {
                map: {
                    f_id: f_id,
                    p_id: p_id,
                    id_user: account === null || account === void 0 ? void 0 : account.id,
                    hash_user: req.body.hash_user,
                    note: req.body.note,
                }
            }
        }).then(docs => {
            if (!!!docs) {
                const comment = new comments_dto_1.default({
                    id_video: req.body.id_video, map: {
                        f_id: f_id,
                        p_id: p_id,
                        id_user: account === null || account === void 0 ? void 0 : account.id,
                        hash_user: req.body.hash_user,
                        note: req.body.note,
                    }
                }).save();
                return comment;
            }
            return docs;
        });
        return res.status(200).send({ data: comment, message: `$ success`, });
    }
}
exports.default = CommentsService;
