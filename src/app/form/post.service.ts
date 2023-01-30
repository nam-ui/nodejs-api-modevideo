import MainRouter from "../index.interface";
import express from "express";
import path from "path";
import { UploadedFile } from "express-fileupload";
import cloudinaryService from "../cloudinary/cloudinary.service";
import PostMongo from "./post.dto";
import FileService from "../files/files.service";
import fs from "fs";
import { verify } from "jsonwebtoken";
import CategoriesService from "../categories/categories.service";
import { init } from "../../init";
import CommentsService from "../comments/comments.service";
import DescriptionsService from "../descriptions/descriptions.service";
import RatingService from "../rating/rating.service";
import StatusService from "../status/rating.service";
class PostService extends MainRouter {
    constructor() {
        super();
    }
    static async createVideoLong(req: express.Request, res: express.Response, next: express.NextFunction) {
        var _returnFunc = true;
        var _sendData;
        // const decodeToken = await verify(req.headers.x_authorization as string, process.env.NODE_ENV_ACCESS_TOKEN_SECRET as string, { ignoreExpiration: true, }) as { name: string, email: string, superId: String };
        // if (decodeToken) {
        const id_categories = await CategoriesService.findByType("video-long");
        const id_files = await FileService.create({ dir: `${init.projectDir}/videoLong/${"decodeTokensuperId"}`, featuredImage: "", perview: "", upload: "" });
        const id_comments = await CommentsService.create();
        const id_descriptions = await DescriptionsService.create();
        const id_rating = await RatingService.create();
        const id_status = await StatusService.create();

        const __dir = `garbageCan/${(id_files).dir}`
        const fileSource = __dirname + `../../../${__dir}/`;
        const public_id = id_files.dir as string;
        if (!fs.existsSync(fileSource)) {
            fs.mkdirSync(fileSource, { recursive: true });
        }
        if (req.files?.featured_image) {
            const cloudinaryPushFeaturedImage = new Promise((resolve, reject) => {
                if (req.files?.featured_image) {
                    resolve(cloudinaryService.cloudinaryServiceFlastFile(req.files.featured_image as UploadedFile, fileSource, public_id));
                } else {
                    reject("Args featured_image is possibly 'null' or 'undefined'")
                }
            });
            const cloudinaryPushFileUpload = new Promise((resolve, reject) => {
                if (req.files?.file_upload) {
                    cloudinaryService.cloudinaryServiceFlastFile(req.files.file_upload as UploadedFile, fileSource, public_id).then(result => { resolve(result); }).catch(err => { reject(err); });
                } else {
                    reject("Args file_upload is possibly 'null' or 'undefined'")
                }
            });
            const cloudinaryPushPreviewFileUpload = new Promise((resolve, reject) => {
                if (req.files?.file_upload) {
                    cloudinaryService.cloudinaryServiceFlastFile(req.files.perview_file_upload as UploadedFile, fileSource, public_id).then(result => { resolve(result); }).catch(err => { reject(err); });
                } else {
                    reject("Args perview_file_upload is possibly 'null' or 'undefined'");
                }
            });
            await Promise.allSettled([cloudinaryPushFeaturedImage, cloudinaryPushFileUpload, cloudinaryPushPreviewFileUpload]).then(results => {
                results.forEach(result => {
                    if (result.status === "rejected") {
                        _returnFunc = false;

                    }
                })
                _sendData = results;
                return results;
            })

            // new PostMongo({
            //     id_categories: id_categories,
            //     id_comments: id_comments,
            //     id_descriptions: id_descriptions,
            //     id_files: id_files.id,
            //     id_rating: id_rating,
            //     id_status: id_status,
            //     postTags: req.body.postTags || "--",
            //     purchasePrice: req.body.purchasePrice || "--",
            //     resolutionAspectRatio: req.body.resolutionAspectRatio || "--",
            //     title: req.body.title || "--",
            // }).save()
        }
        await fs.rmSync(fileSource, { recursive: true, force: true })
        if (!_returnFunc) {
        }
        if (_returnFunc) {
            return _sendData;
        }
        cloudinaryService.deleteAllFile(public_id).then(result => console.log(result)).catch(err => console.error(err));
        return _returnFunc;
    }

}
export default PostService;