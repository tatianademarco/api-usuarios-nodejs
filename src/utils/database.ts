import mongoose, { Mongoose } from "mongoose";

declare global {
    var mongoose: Mongoose | undefined;
}

const URI: string = 'mongodb+srv://102521:kuBVsM8VBIX58uoc@cluster0.wdynp79.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const databaseConnection = async (): Promise<Mongoose> => {
    if (!global.mongoose) {
        mongoose.set("strictQuery", false);
        global.mongoose = await mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true } as any)
            .then(() => {
                console.log('Connected to MongoDB');
                return mongoose;
            })
            .catch(e => {
                console.error('Error connecting to MongoDB:', e);
                throw e;
            });
    }
    return global.mongoose;
};

export default databaseConnection;
