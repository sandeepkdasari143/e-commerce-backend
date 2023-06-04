import dotenv from "dotenv";
import app from "./src/app.js";
import mongoose from "mongoose";
import { configColudinary } from "./src/config/cloudinary.config.js";


dotenv.config();
const { PORT, MONGODB_URL, CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

const listenToPort = (PORT) => {
    app.listen(PORT, ()=>console.log(`Server listening on ${PORT}`))
}

const connectToMongoDB = async (MONGODB_URL) => {
    try {
        await mongoose.connect(MONGODB_URL);
        console.log("DB Connected Successfully");
    } catch (error) {
        console.log("Database Connection Error: ", error.message);
        process.exit(1);
    }
}

const initApplication = async () => {
    try {
        listenToPort(PORT);
        await connectToMongoDB(MONGODB_URL);
        await configColudinary(CLOUDINARY_NAME,CLOUDINARY_API_KEY,CLOUDINARY_API_SECRET)
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

initApplication();

//exit on uncaught errors
process.on('uncaughtException', error => {
    console.log(`There was an uncaught error: ${error}`);
    process.exit(1);
})