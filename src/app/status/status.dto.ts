import { model, Schema } from 'mongoose';
import { IStatus } from './status.interface';
const statusShema = new Schema<IStatus>({

});

const StatusMongo = model<IStatus>('Status', statusShema);
export default StatusMongo;