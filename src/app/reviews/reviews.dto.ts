import { Schema, model, connect } from 'mongoose';
import { IReview } from './reviews.interface';
const accountShema = new Schema<IReview>({
    id_user: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    product_reviews: {
        required: true,
        type: Map,
        of: {
            _id : false,
            id_product: {
                required: true,
                type: Schema.Types.ObjectId,
                ref: 'Products'
            },
            reviews: {
                type: Map,
                of: {
                    _id : false,
                    id_user: {
                        required: true,
                        type: Schema.Types.ObjectId,
                        ref: 'Users'
                    },
                    comment: {
                        required: true,
                        type: String,
                    },
                    rating: {
                        required: true,
                        type: String,
                    },
                    property_attachment_review: {
                        required: true,
                        type: String,
                    }
                }

            }
        }

    }

});

const AccountMongo = model<IReview>('Reviews', accountShema);
export default AccountMongo;
