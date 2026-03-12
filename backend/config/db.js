import mongoose from 'mongoose';

const connectToDb = async () => {
    try {
        const uri = process.env.MONGO_URI;
        
        if (!uri) {
            throw new Error("MONGO_URI is undefined. Check your .env file!");
        }
        await mongoose.connect(uri);
        console.log("🚀 DataBase Connected Successfully");
    } catch (error) {
        console.error("Error in DataBase Connection:", error.message);
        process.exit(1);
    }
};

export default connectToDb;
