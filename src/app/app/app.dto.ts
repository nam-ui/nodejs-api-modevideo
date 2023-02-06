import { model, Schema } from 'mongoose';
const appSchema = new Schema({
    app: Map,
    project: {
        type: String,
        require: true,
        unique: true,
    }
});

const appMongo = model('App', appSchema);
export default appMongo;