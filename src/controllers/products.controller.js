import BigPromise from "../lib/BigPromise.js";
import CustomError from "../lib/customError.js";
import Product from "../models/products.model.js";

export const createProduct = BigPromise(async(req, res, next) => {
    const { productName, productDescription, stock, collectionID, minimumRetailPrice, discountPercentage } = req.body;
    
    if (!productName) throw new CustomError();

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
})