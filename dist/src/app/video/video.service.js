"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const jsonwebtoken_1 = require("jsonwebtoken");
const init_1 = require("../../init");
const hashToTagHTML_1 = require("../../utils/hashToTagHTML");
const auth_dto_1 = __importDefault(require("../auth/auth.dto"));
const cloudinary_service_1 = __importDefault(require("../cloudinary/cloudinary.service"));
const comments_dto_1 = __importDefault(require("../comments/comments.dto"));
const index_interface_1 = __importDefault(require("../index.interface"));
const status_dto_1 = __importDefault(require("../status/status.dto"));
const video_dto_1 = __importDefault(require("./video.dto"));
class PostService extends index_interface_1.default {
    constructor() {
        super();
    }
    static async createVideo(req, res, next) {
        var _a, _b;
        var _returnFunc = true;
        var _sendData;
        var token_account;
        if (req.headers.authorization) {
            token_account = (0, jsonwebtoken_1.decode)(req.headers.authorization);
        }
        var account = await auth_dto_1.default.findOne({ sub: token_account === null || token_account === void 0 ? void 0 : token_account.sub, email: token_account === null || token_account === void 0 ? void 0 : token_account.email });
        const status = await new status_dto_1.default({ access_user: req.body.access_user, only_view: req.body.only_view }).save();
        const comment = await new comments_dto_1.default({});
        const video = await new video_dto_1.default({ hashtag: req.body.hashtag, id_comments: comment.id, id_status: status.id, note: req.body.note, tag_account: req.body.tag_account, id_account: account === null || account === void 0 ? void 0 : account.id });
        const __dir = `garbageCan/${video.id}/`;
        const fileSource = __dirname + `../../../${__dir}/`;
        const public_id = `${init_1.init.projectDir}/${account === null || account === void 0 ? void 0 : account.sub}/${video.id}`;
        if (!fs_1.default.existsSync(fileSource)) {
            fs_1.default.mkdirSync(fileSource, { recursive: true });
        }
        if (((_a = req.files) === null || _a === void 0 ? void 0 : _a.cover_picture) && ((_b = req.files) === null || _b === void 0 ? void 0 : _b.file_upload)) {
            const cloudinaryPushCoverPicture = new Promise((resolve, reject) => {
                var _a;
                if ((_a = req.files) === null || _a === void 0 ? void 0 : _a.cover_picture) {
                    resolve(cloudinary_service_1.default.cloudinaryServiceFlastFile(req.files.cover_picture, fileSource, public_id));
                }
                else {
                    reject("Args cover_picture is possibly 'null' or 'undefined'");
                }
            });
            const cloudinaryPushFileUpload = new Promise((resolve, reject) => {
                var _a;
                if ((_a = req.files) === null || _a === void 0 ? void 0 : _a.file_upload) {
                    cloudinary_service_1.default.cloudinaryServiceFlastFile(req.files.file_upload, fileSource, public_id).then(result => { resolve(result); }).catch(err => { reject(err); });
                }
                else {
                    reject("Args file_upload is possibly 'null' or 'undefined'");
                }
            });
            await Promise.allSettled([cloudinaryPushCoverPicture, cloudinaryPushFileUpload]).then(results => {
                results.map((result, index) => {
                    if (result.status === "rejected") {
                        _returnFunc = false;
                    }
                    else {
                        index == 0 ? video.cover_picture = result.value : null;
                        index == 1 ? video.video_url = result.value : null;
                    }
                });
                video.save();
                _sendData = results;
                return results;
            });
        }
        await fs_1.default.rmSync(fileSource, { recursive: true, force: true });
        return _returnFunc;
    }
    static async getById(req, res, next) {
        var video = await video_dto_1.default.findById(req.params.idVideo);
        var comments = await comments_dto_1.default.findById(video === null || video === void 0 ? void 0 : video.id_comments);
        var status = await status_dto_1.default.findById(video === null || video === void 0 ? void 0 : video.id_status);
        var account = await auth_dto_1.default.findById(video === null || video === void 0 ? void 0 : video.id_account);
        return {
            video_url: video === null || video === void 0 ? void 0 : video.video_url,
            cover_picture: video === null || video === void 0 ? void 0 : video.cover_picture,
            note: video === null || video === void 0 ? void 0 : video.note,
            tag_account: video === null || video === void 0 ? void 0 : video.tag_account,
            hashtag: video === null || video === void 0 ? void 0 : video.hashtag,
            comments: comments,
            status: status,
            account: {
                given_name: account === null || account === void 0 ? void 0 : account.given_name,
                family_name: account === null || account === void 0 ? void 0 : account.family_name,
                picture: account === null || account === void 0 ? void 0 : account.picture,
                sub: account === null || account === void 0 ? void 0 : account.sub,
            }
        };
    }
    static async getList(req, res, next) {
        var video = await video_dto_1.default.find().limit(10);
        return await Promise.all(video.map(async (el) => {
            var status = await status_dto_1.default.findById(el.id_status);
            var video_note = await (0, hashToTagHTML_1.toHTMLHashtag)(el.note);
            var account = await auth_dto_1.default.findById(el.id_account);
            return {
                to_path_user: `@${(account === null || account === void 0 ? void 0 : account.sub)}`,
                to_path_video: `@${(account === null || account === void 0 ? void 0 : account.sub)}/video/${el.id}`,
                follow: { isFollow: true, sub: account === null || account === void 0 ? void 0 : account.id },
                video: {
                    id: el.id,
                    video_url: el.video_url,
                    cover_picture: el.cover_picture,
                    note: video_note,
                    tag_account: el.tag_account,
                    hashtag: el.hashtag,
                },
                status: {
                    view: status === null || status === void 0 ? void 0 : status.view,
                    heart: status === null || status === void 0 ? void 0 : status.heart,
                },
                account: account,
            };
        })).then(value => value);
    }
}
exports.default = PostService;
