import { model, Schema } from 'mongoose';
import { IFiles } from './files.interface';
const filesSchema = new Schema<IFiles>({
    dir: String,
    featuredImage: String,
    perview: String,
    upload: String,
});

const filesMongo = model<IFiles>('Files', filesSchema);
export default filesMongo;