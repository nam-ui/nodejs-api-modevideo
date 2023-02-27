"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = __importDefault(require("cloudinary"));
const path_1 = __importDefault(require("path"));
class CloudinaryService {
    constructor(cloudinary) {
        this.cloudinary = cloudinary;
        this.cloudinary = cloudinary;
    }
    readByUrl(name) {
        this.cloudinary.url(name, { width: 100, height: 150, crop: "fill", fetch_format: "auto" });
    }
    async saveVideo(file) {
        await this.cloudinary.video(file, { quality: "auto", fetch_format: "auto" });
    }
    uploadFile(uploadPath, public_id) {
        return new Promise((resolve, reject) => {
            this.cloudinary.uploader.upload(uploadPath, { resource_type: "auto", public_id: public_id }).then(result => resolve(result.url)).catch(err => reject(err));
        });
    }
    async cloudinaryServiceFlastFile(file, dirFile, public_id) {
        let pathDir = path_1.default.join(dirFile + file.name);
        await file.mv(pathDir);
        return await this.uploadFile(pathDir, `${public_id}/${file.name}`).then(result => result).catch(() => false);
    }
    async deleteFolder(public_id) {
        await this.cloudinary.api.delete_folder(`apiCandy/videoLong/decodeTokensuperId`, console.log);
    }
    async deleteAllFile(public_id) {
        await this.cloudinary.uploader.destroy(public_id);
    }
}
exports.default = new CloudinaryService(cloudinary_1.default.v2);
