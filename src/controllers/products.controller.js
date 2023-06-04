import Mongoose from "mongoose";
import BigPromise from "../lib/BigPromise.js";
import CustomError from "../lib/customError.js";
import Product from "../models/products.model.js";
import cloudinary from "cloudinary";

export const createProduct = BigPromise(async(req, res, next) => {
    const { productTitle, productDescription, stock, collectionID, minimumRetailPrice, discountPercentage } = req.body;
    
    // if (!(productTitle && productDescription && stock && collectionID && minimumRetailPrice && discountPercentage)) throw new CustomError("All the fields are required!", 400);

    
    const productID = new Mongoose.Types.ObjectId().toHexString();

    // console.log(req.files);
    let productImages=[];
    if (req.files) {
        let Images = req.files;
        for (const productImage in Images) {
            console.log(Images[productImage].tempFilePath)
            let cloudinaryResult = await cloudinary.v2.uploader.upload(Images[productImage].tempFilePath, {
                folder: `${collectionID}/${productID}`
            });
            console.log(cloudinaryResult);
            productImages.push({
                publicID: cloudinaryResult.public_id,
                secureURL: cloudinaryResult.secure_url
            })
        }
    }

    let productPrice;

    if (Math.sign(discountPercentage) === -1) {
        throw new CustomError("Discount percentage must be positive.", 400)
    }
    if (Math.sign(discountPercentage) === 1) {
        let discount = minimumRetailPrice * (discountPercentage / 100);
        productPrice = minimumRetailPrice - discount;
    }
    
    const newProduct = await Product.create({
        _id: productID,
        productTitle,
        productDescription,
        stock,
        sold:0,
        collectionID,
        minimumRetailPrice,
        discountPercentage,
        productPrice,
        productImages
    });

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.status(200).json({
        success: true,
        message: `${productTitle} is successfully added :)`,
        newProduct
    });
})

export const getAllProducts = BigPromise(async (req, res, next) => {
    const products = await Product.find();
    if (!products) throw new CustomError("Unfortunately! Products aren't fetched properly :(", 400);
    res.status(200).json({
        success: true,
        message: "Products fetched successfully :)",
        products
    })
})

export const updateProduct = BigPromise(async(req, res, next) => {
    const { productName, productDescription, stock, collectionID, minimumRetailPrice, discountPercentage } = req.body;
    
    if (!(productName && productDescription && stock && collectionID && minimumRetailPrice && discountPercentage)) throw new CustomError("All the fields are required!", 400);

    if (req.files) {
        
    }

    let productPrice;

    if (Math.sign(discountPercentage) === -1) {
        throw new CustomError("Discount percentage must be positive.", 400)
    }
    if (Math.sign(discountPercentage) === 1) {
        let discount = minimumRetailPrice * (discountPercentage / 100);
        productPrice = minimumRetailPrice - discount;
    }
    
    const newProduct = await Product.create({
        productName,
        productDescription,
        stock,
        collectionID,
        minimumRetailPrice,
        discountPercentage,
        productPrice
    });

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.status(200).json({
        success: true,
        message: `${productName} is successfully added :)`,
        newProduct
    });
})

export const deleteProduct = BigPromise(async(req, res, next) => {
    const { productName, productDescription, stock, collectionID, minimumRetailPrice, discountPercentage } = req.body;
    
    if (!(productName && productDescription && stock && collectionID && minimumRetailPrice && discountPercentage)) throw new CustomError("All the fields are required!", 400);

    if (req.files) {
        
    }

    let productPrice;

    if (Math.sign(discountPercentage) === -1) {
        throw new CustomError("Discount percentage must be positive.", 400)
    }
    if (Math.sign(discountPercentage) === 1) {
        let discount = minimumRetailPrice * (discountPercentage / 100);
        productPrice = minimumRetailPrice - discount;
    }
    
    const newProduct = await Product.create({
        productName,
        productDescription,
        stock,
        collectionID,
        minimumRetailPrice,
        discountPercentage,
        productPrice
    });

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.status(200).json({
        success: true,
        message: `${productName} is successfully added :)`,
        newProduct
    });
})