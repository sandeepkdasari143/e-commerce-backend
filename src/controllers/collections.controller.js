import BigPromise from "../lib/BigPromise.js";
import CustomError from "../lib/customError.js";
import Collection from "../models/collections.model.js";
import Mongoose from "mongoose";
import cloudinary from "cloudinary";

export const createCollection = BigPromise(async (req, res, next) => {

    const { collectionName, collectionDescription } = req.body;

    if (!collectionName) throw new CustomError("Collection Name must be provided", 400);
    if (!collectionDescription) throw new CustomError("Collection Description must be provided", 400);

    const collectionID = new Mongoose.Types.ObjectId().toHexString();
    if (!collectionID) throw new CustomError("Internal Server Error in Collections Controller", 500);

    let cloudinaryResult; //block scope variable, so declared outside of If condition...
    
    if (req.files) {
        let collectionLogo = req.files.collectionLogo;
        cloudinaryResult = await cloudinary.v2.uploader.upload(collectionLogo.tempFilePath, {
            folder:`${collectionName}_${collectionID}`
        });
    }

    const newCollection = await Collection.create({
        _id: collectionID,
        collectionName,
        collectionDescription,
        products:[],
        collectionLogo: {
            publicID: cloudinaryResult.public_id,
            secureURL: cloudinaryResult.secure_url
        }
    }) 
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');

    res.status(200).json({
        success: true,
        message: `${collectionName} successfully added :)`,
        newCollection
    })
})

export const getAllCollections = BigPromise(async (req, res, next) => {
    const collections = await Collection.find();
    if (!collections) throw new CustomError(`Failed to fetch collections :(`, 500);
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.status(200).json({
        success: true,
        message: `Successfully fetched all Collections`,
        collections
    })
})