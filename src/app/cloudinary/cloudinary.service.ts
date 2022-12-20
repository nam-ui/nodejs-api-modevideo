import Cloudinary from "cloudinary";
import { UploadedFile } from "express-fileupload";
import path from "path";
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
    async uploadImage(uploadPath: any) {
        await this.cloudinary.uploader.upload(uploadPath).then(result => console.log(result)
        ).catch(err => console.log(err)
        );
    }

}
export default new CloudinaryService(Cloudinary.v2);