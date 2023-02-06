import CategoriesMongo from "./categories.dto";
import { ICategories } from "./categories.interface";

export default class CategoriesService {
    private static readonly categories: ['video-long', 'video-short', 'audio', 'blog'] = ['video-long', 'video-short', 'audio', 'blog'];
    private constructor() { }
    static create(type: ICategories) {
        return new CategoriesMongo({ type: type }).save();
    }
    static async createSnapShot() {
        try {
            CategoriesService.categories.map(el => {
                CategoriesMongo.findOneAndUpdate({ type: el }, { type: el }, {}, function (error, result) {
                    if (error) return;
                    if (!!!result) new CategoriesMongo({ type: el }).save()
                })
            })
        } catch (error) {
            console.error(error);
        }
    }
    static async findByType<T extends typeof CategoriesService.categories[number]>(arg: T) {
        return await CategoriesMongo.find({ type: arg });
    }
    static async getAll() {
        return await CategoriesMongo.find().catch(err => console.error(err));
    }
}