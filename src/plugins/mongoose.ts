import mongoose from "mongoose";

export default class Mongoose {
    private static instance: Mongoose;
    private constructor() {
        if (process.env.NODE_ENV_MONGO) {
            mongoose
                .connect(process.env.NODE_ENV_MONGO, { connectTimeoutMS: 1000 })
                .then((result) => {
                    console.log('🍀 connected data mongodb ✅')
                })
                .catch((error) => {
                    console.log(error);
                    console.log('error data mongodb ❌')
                    process.exit(1)
                });
        } else {
            console.log('error data mongodb ❌')
        }
    }
    static getInstance(): Mongoose {
        if (!Mongoose.instance) { Mongoose.instance = new Mongoose(); }
        return Mongoose.instance;
    }
}