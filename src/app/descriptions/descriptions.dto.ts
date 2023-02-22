import { model, Schema } from 'mongoose';
import { IDescriptions } from './descriptions.interface';
const descriptionsShema = new Schema<IDescriptions>({
    note: { type: String, require: true },
    tagAccount:{ type: Object , of: {
        value: String,
        text: String,
    }},
    hashtag: { type: Object , of: {
        value: String,
        text: String,
    }},
});

const DescriptionsMongo = model<IDescriptions>('Descriptions', descriptionsShema);
export default DescriptionsMongo;