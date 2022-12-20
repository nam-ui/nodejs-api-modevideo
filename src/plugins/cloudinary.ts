import cloudinary from "cloudinary";
class CloudinaryController {
    private static instance: CloudinaryController;
    private constructor() {
        cloudinary.v2.config({ api_key: process.env.NODE_ENV_CLOUDINARY_API_KEY, cloud_name: process.env.NODE_ENV_CLOUDINARY_NAME, api_secret: process.env.NODE_ENV_CLOUDINARY_API_SECRET, secure: true, })
    }
    public static getInstance(): CloudinaryController {
        if (!CloudinaryController.instance) { CloudinaryController.instance = new CloudinaryController(); }
        return CloudinaryController.instance;
    }
}
export default CloudinaryController;