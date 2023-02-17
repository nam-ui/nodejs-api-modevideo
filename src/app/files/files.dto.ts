import { model, Schema } from 'mongoose';
import { IFiles } from './files.interface';
const filesSchema = new Schema<IFiles>({
    dir: { type: Map, of: String },
});

const FilesMongo = model<IFiles>('Files', filesSchema);
export default FilesMongo;