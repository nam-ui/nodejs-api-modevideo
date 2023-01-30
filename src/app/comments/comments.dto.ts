import { model, Schema } from 'mongoose';
import { IComments } from './comments.interface';
const commentsShema = new Schema<IComments>({
    
});

const CommentsMongo = model<IComments>('Comments', commentsShema);
export default CommentsMongo;