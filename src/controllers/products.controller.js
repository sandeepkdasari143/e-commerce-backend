import Mongoose from "mongoose";
import BigPromise from "../lib/BigPromise.js";
import CustomError from "../lib/customError.js";
import Product from "../models/products.model.js";
import cloudinary from "cloudinary";

export const createProduct = BigPromise(async (req, res, next) => {
    const { productTitle, productDescription, stock, collectionID, minimumRetailPrice, discountPercentage } = req.body;
    
    if (!(productTitle && productDescription && stock && collectionID && minimumRetailPrice && discountPercentage)) throw new CustomError("All the fields are required!", 400);

    
    const productID = new Mongoose.Types.ObjectId().toHexString();

    // console.log(req.files);
    let productImages = [];
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
        sold: 0,
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
});

export const updateProduct = BigPromise(async (req, res, next) => {
    const { productTitle, productDescription, stock, collectionID, minimumRetailPrice, discountPercentage } = req.body;

    if (!(productTitle && productDescription && stock && collectionID && minimumRetailPrice && discountPercentage)) throw new CustomError("All the fields are required!", 400);

    const productID = req.params.productID;
    if (!productID) throw new CustomError("collectionID is required in request params :(", 400);

    const productToUpdate = await Product.findById(productID);
    if (!productToUpdate) throw new CustomError("Unfortunately! We couldn't find that resource :(", 400);

    let productImages = [];

    if (req.files) {
        //Destroy the Existing Banner Image in the Cloudinary
        productToUpdate?.productImages?.map(async (image) => await cloudinary.v2.uploader.destroy(image?.publicID));
        
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
    
    const updatedProduct = await Product.findByIdAndUpdate(productID, {
        productTitle,
        productDescription,
        stock,
        collectionID,
        minimumRetailPrice,
        discountPercentage,
        productPrice,
        productImages
    }, {runValidators: false, new: false});

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.status(200).json({
        success: true,
        message: `Product is updated successfully :)`,
        updatedProduct
    });
});

export const getAllProducts = BigPromise(async (req, res, next) => {
    const products = await Product.find();
    if (!products) throw new CustomError("Unfortunately! Products aren't fetched properly :(", 400);
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.status(200).json({
        success: true,
        message: "Products fetched successfully :)",
        products
    })
})

export const getProductByID = BigPromise(async (req, res, next) => {
    const productID = req.params.productID;
    if (!productID) throw new CustomError("collectionID is required in request params :(", 400);
    const product = await Product.findById(productID);
    if (!product) throw new CustomError("Unfortunately! Product isn't fetched properly :(", 400);
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.status(200).json({
        success: true,
        message: "Products fetched successfully :)",
        product
    })
})

export const getProductsByCollectionID = BigPromise(async (req, res, next) => {
    const collectionID = req.params.collectionID;
    if (!collectionID) throw new CustomError("collectionID is required in request params :(", 400);
    const products = await Product.find({ collectionID });
    if (!products) throw new CustomError("We are unable to find products with given collectionID", 400);
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.status(200).json({
        success: true,
        message: "Products fetched successfully :)",
        products
    })
});



export const deleteProduct = BigPromise(async(req, res, next) => {
    const productID = req.params.productID;
    if (!productID) throw new CustomError("collectionID is required in request params :(", 400);
    await Product.findByIdAndDelete(productID);
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.status(200).json({
        success: true,
        message: `Product is Deleted :)`
    });
})