import { init } from "../../init";
import AppMongo from "./app.dto";
import _ from "lodash";
export default class AppService {
    private static instance: AppService;
    private constructor() {
    }
    static getInstance(): AppService {
        if (!AppService.instance) { AppService.instance = new AppService(); }
        return AppService.instance;
    }
    static async createSnapShot() {
        return await AppMongo.findOne({ project: init.project }).then(result => {
            if (!!!result) new AppMongo({
                project: init.project,
                app: {
                    logo: {
                        dark: "clouldinary-url",
                        light: "clouldinary-url",
                        main: "clouldinary-url",
                    },
                    reserve_images: {
                        avatar: {
                            male: "",
                            female: "",
                            different: '',
                        },
                        images_items: "",
                    },
                }
            }).save()
        })
    }
    static async getAll() {
        return await AppMongo.find({ 'project': init.project }).limit(1);
    }
}