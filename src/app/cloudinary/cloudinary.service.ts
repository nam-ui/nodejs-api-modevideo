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
    uploadImage(uploadPath: any) {
        return new Promise((resolve) => {
            this.cloudinary.uploader.upload(
                uploadPath, { resource_type: "auto" }
            ).then(result => resolve(result)).catch(err => console.log(err));
        })
    }
    async cloudinaryServiceFlastFile(file: UploadedFile, dirFile: String) {
        try {
            var _file = file;
            await path.join(__dirname + dirFile + _file.name);
            await this.uploadImage(path.join(__dirname + dirFile + _file.name));
            await fs.unlinkSync(__dirname + dirFile + _file.name);
            return true;    
        } catch (error) {
            console.error(error);
            return false;            
        }
    }

}
export default new CloudinaryService(Cloudinary.v2);