import { model, Schema } from 'mongoose';
import { IDescriptions } from './descriptions.interface';
const descriptionsShema = new Schema<IDescriptions>({
// Descriptions hasd tag and deps
});

const DescriptionsMongo = model<IDescriptions>('Descriptions', descriptionsShema);
export default DescriptionsMongo;