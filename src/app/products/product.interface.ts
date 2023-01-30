import { Types } from 'mongoose';

export interface IProduct {
    propertyTitle: string;
    description: string;
    status: boolean;
    room: number;
    tags: string[];

    price: { day: Number, month: Number, year: Number };

    expiryDate: string;
    postDate: string;
    location: {
        address: string;
        countryOrigin: string;
        cty: string;
        location: {
            lat: Number
            lon: Number
        },
    }
    detailedInformation: { title: string, content: string }[],

    images: string[];
    propertyAttachments: string;
    video: string;

    id_review: Types.ObjectId;
}