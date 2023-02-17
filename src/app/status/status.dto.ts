import { model, Schema } from 'mongoose';
import { IStatus } from './status.interface';
const statusShema = new Schema<IStatus>({
//     Bình luận
// Duet
// Stitch
// Cong khai , ban be,rieng tu
});

const StatusMongo = model<IStatus>('Status', statusShema);
export default StatusMongo;