import { model, Schema } from 'mongoose';
import { IStatus } from './status.interface';
const statusShema = new Schema<IStatus>({
    only_view: {
        type: String,
        enum: ['Công khai', 'Bạn bè', 'Riêng tư'],
        description: "can only be either 'Công khai' or 'Bạn bè' or 'Riêng tư'."
    },
    access_user: [String],
    view: { type: Number, default: 1 },
    heart: { type: Number, default: 1 },
});

const StatusMongo = model<IStatus>('Status', statusShema);
export default StatusMongo;