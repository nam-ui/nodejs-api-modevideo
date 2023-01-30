import Cloudinary from "cloudinary";
import { UploadedFile } from "express-fileupload";
import path from "path";
import fs from "fs";
class CloudinaryService {
    constructor(private readonly cloudinary: typeof Cloudinary.v2) {
        this.cloudinary = cloudinary;
    }
    readByUrl(name: string) {
        this.cloudinary.url(name, { width: 100, height: 150, crop: "fill", fetch_format: "auto" })
    }
    async saveVideo(file: any) {
        await this.cloudinary.video(file, { quality: "auto", fetch_format: "auto" });
    }
    uploadFile(uploadPath: string, public_id: string) {
        return new Promise((resolve, reject) => {
            this.cloudinary.uploader.upload(
                uploadPath, { resource_type: "auto", public_id: public_id }
            ).then(result => resolve(result)).catch(err => reject(err));
        })
    }
    async cloudinaryServiceFlastFile(file: UploadedFile, dirFile: String, public_id: string) {
        let pathDir = path.join(dirFile + file.name);
        await file.mv(pathDir);
        return await this.uploadFile(pathDir, `${public_id}/${file.name}`).then(result => result).catch(() => false);
    }
    async deleteFolder(public_id: string) {
        await this.cloudinary.api.delete_folder(`apiCandy/videoLong/decodeTokensuperId`, console.log);
    }
    async deleteAllFile(public_id: string) {
        await this.cloudinary.uploader.destroy(public_id,);
    }
}
export default new CloudinaryService(Cloudinary.v2);


