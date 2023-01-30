import CategoriesMongo from "./categories.dto";
import { ICategories } from "./categories.interface";

export default class CategoriesService {
    static readonly categories: ['video-long', 'video-short', 'audio', 'blog'];
    static id_categories: [];
    private constructor() { }
    static create(type: ICategories) {
        return new CategoriesMongo({ type: type }).save();
    }
    static async createSnapShot() {
        await this.categories.map(el => {
            const isExist = CategoriesMongo.find({ type: el });
            if (!isExist) {
                new CategoriesMongo({ type: el }).save();
            }
        })
    }
    static async findByType<T extends typeof this.categories[number]>(arg: T) {
        return await CategoriesMongo.find({ type: arg });
    }
}