import express from "express";
import { UploadedFile } from "express-fileupload";
import fs from "fs";
import { decode } from "jsonwebtoken";
import { init } from "../../init";
import AccountMongo from "../auth/auth.dto";
import cloudinaryService from "../cloudinary/cloudinary.service";
import CommentsMongo from "../comments/comments.dto";
import MainRouter from "../index.interface";
import StatusMongo from "../status/status.dto";
import VideoMongo from "./video.dto";
class PostService extends MainRouter {
    constructor() {
        super();
    }
    static async createVideo(req: express.Request, res: express.Response, next: express.NextFunction) {
        var _returnFunc = true;
        var _sendData;
        var token_account;
        if (req.headers.authorization) {
            token_account = decode(req.headers.authorization) as unknown as { email: String, sub: String, email_verified: Boolean };
        }
        var account = await AccountMongo.findOne({ sub: token_account?.sub, email: token_account?.email });
        const status = await new StatusMongo({ access_user: req.body.access_user, only_view: req.body.only_view }).save();
        const comment = await new CommentsMongo({});
        const video = await new VideoMongo({ hashtag: req.body.hashtag, id_comments: comment.id, id_status: status.id, note: req.body.note, tag_account: req.body.tag_account, id_account: account?.id });
        const __dir = `garbageCan/${video.id}/`;
        const fileSource = __dirname + `../../../${__dir}/`;
        const public_id = `${init.projectDir}/${account?.sub}/${video.id}` as string;
        if (!fs.existsSync(fileSource)) {
            fs.mkdirSync(fileSource, { recursive: true });
        }
        if (req.files?.cover_picture && req.files?.file_upload) {
            const cloudinaryPushCoverPicture = new Promise((resolve, reject) => {
                if (req.files?.cover_picture) {
                    resolve(cloudinaryService.cloudinaryServiceFlastFile(req.files.cover_picture as UploadedFile, fileSource, public_id));
                } else {
                    reject("Args cover_picture is possibly 'null' or 'undefined'")
                }
            });
            const cloudinaryPushFileUpload = new Promise((resolve, reject) => {
                if (req.files?.file_upload) {
                    cloudinaryService.cloudinaryServiceFlastFile(req.files.file_upload as UploadedFile, fileSource, public_id).then(result => { resolve(result); }).catch(err => { reject(err); });
                } else {
                    reject("Args file_upload is possibly 'null' or 'undefined'")
                }
            });
            await Promise.allSettled([cloudinaryPushCoverPicture, cloudinaryPushFileUpload]).then(results => {
                results.map((result, index) => {
                    if (result.status === "rejected") {
                        _returnFunc = false;
                    } else {
                        index == 0 ? video.cover_picture = result.value as String : null;
                        index == 1 ? video.video_url = result.value as String : null;
                    }

                })
                video.save();
                _sendData = results;
                return results;
            })
        }
        await fs.rmSync(fileSource, { recursive: true, force: true })
        return _returnFunc;
    }


    static async getById(req: express.Request, res: express.Response, next: express.NextFunction) {
        var video = await VideoMongo.findOne({ id: req.params.idVideo });
        var comments = await CommentsMongo.findById(video?.id_comments);
        var status = await StatusMongo.findById(video?.id_status);
        return {
            video_url: video?.video_url,
            cover_picture: video?.cover_picture,
            note: video?.note,
            tag_account: video?.tag_account,
            hashtag: video?.hashtag,
            comments: comments,
            status: status,
        };
    }
}
export default PostService;