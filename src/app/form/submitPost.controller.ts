import express from "express";
import { UploadedFile } from "express-fileupload";
import path from "path";
import { Observable } from 'rxjs';
import cloudinaryService from "../cloudinary/cloudinary.service";
import PostMongo from "./post.dto"
export default class PostController {
    private static application: express.Application;
    private static baseURL: string;
    constructor(app: express.Application, baseURL: string) {
        PostController.application = app;
        PostController.baseURL = baseURL;
    }
    start() {
        PostController.application.post(`${PostController.baseURL}/post`, async (req, res, next) => {
            try {
                // PROMISE then save db error log bug send user
                console.log("GET ME");
                let sampleFile;
                let uploadPath;
                let fileUpload;
                let previewFileUpload;
                let _video;
                let _preview_video;
                if (req.files?.featured_image) {
                    sampleFile = req.files.featured_image as UploadedFile;
                    fileUpload = req.files.file_upload as UploadedFile;
                    previewFileUpload = req.files.perview_file_upload as UploadedFile;
                    uploadPath = path.join(__dirname + "../../../public/images/" + sampleFile.name);
                    _video = path.join(__dirname + "../../../public/images/" + fileUpload.name);
                    _preview_video = path.join(__dirname + "../../../public/images/" + previewFileUpload.name);
                    await sampleFile.mv(uploadPath);
                    await fileUpload.mv(_video);
                    await previewFileUpload.mv(_preview_video);
                    let c_ = await cloudinaryService.uploadImage(path.join(__dirname + "../../../public/images/" + sampleFile.name))
                    let b_ = await cloudinaryService.uploadImage(path.join(__dirname + "../../../public/images/" + fileUpload.name))
                    let a_ = await cloudinaryService.uploadImage(path.join(__dirname + "../../../public/images/" + previewFileUpload.name))
                    return res.send({ c: c_, b: b_, a: a_ })
                }
            } catch (error) {
                return res.send({ status: 404, message: error })
            }
        });
    }
}
