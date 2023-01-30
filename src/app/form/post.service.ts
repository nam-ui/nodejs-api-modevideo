import MainRouter from "../index.interface";
import express from "express";
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
        // const decodeToken = await verify(req.headers.x_authorization as string, process.env.NODE_ENV_ACCESS_TOKEN_SECRET as string, { ignoreExpiration: true, }) as { name: string, email: string, superId: String };
        // if (decodeToken) {
        const id_categories = await CategoriesService.findByType("video-long");
        const id_files = await FileService.create({ dir: `${init.project}/video-long/${"decodeToken.superId"}`, featuredImage: "", perview: "", upload: "" });
        const id_comments = await CommentsService.create();
        const id_descriptions = await DescriptionsService.create();
        const id_rating = await RatingService.create();
        const id_status = await StatusService.create();


        const fileSource = `../../garbage-can/${"decodeTokensuperId"}/${(id_files).dir}`;
        console.log("DIR");
        console.log(fileSource);
        if (!fs.existsSync(fileSource)) {
            console.log("CREATE - DIR");
            fs.mkdirSync(fileSource, { recursive: true });
        }
        let featuredImage;
        let fileUpload;
        let previewFileUpload;
        if (req.files?.featured_image) {
            featuredImage = req.files.featured_image as UploadedFile;
            fileUpload = req.files.file_upload as UploadedFile;
            previewFileUpload = req.files.perview_file_upload as UploadedFile;
            // await cloudinaryService.cloudinaryServiceFlastFile(featuredImage, fileSource);
            // await cloudinaryService.cloudinaryServiceFlastFile(fileUpload, fileSource);
            // await cloudinaryService.cloudinaryServiceFlastFile(previewFileUpload, fileSource);
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
        // fs.rmSync(fileSource, { recursive: true });
        return true;
        // }
    }

}
export default PostService;