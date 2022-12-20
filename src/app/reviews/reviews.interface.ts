import { Types } from 'mongoose';

export interface IReview {
    id_user: Types.ObjectId;
    product_reviews: {
        [key_product: string]: {
            id_product: Types.ObjectId;
            reviews: {
                [key_user: string]: {
                    id_user: Types.ObjectId,
                    comment: string,
                    rating: Number,
                    property_attachment_review: string;
                }
            }
        }
    }
}