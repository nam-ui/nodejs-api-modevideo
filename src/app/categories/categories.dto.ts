import { model, Schema } from 'mongoose';
import { ICategories } from './categories.interface';
const categoriesShema = new Schema<ICategories>({
    type: {
        type: String,
        enum: ['video-long', 'video-short', 'audio', 'blog'],
        description: "can only be either 'video-long' or 'video-short' or 'audio' or 'blog'"
    }
});

const CategoriesMongo = model<ICategories>('Categories', categoriesShema);
export default CategoriesMongo;