import { model, Schema } from 'mongoose';
import { IRating } from './rating.interface';
const ratingShema = new Schema<IRating>({

});

const RatingMongo = model<IRating>('Rating', ratingShema);
export default RatingMongo;