import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
    productTitle: {
        type: String,
        required: ["true", "please provide a product name"],
        trim: true,
        maxLength: [120, "product name should not be max than 120 chars"]
    },

    minimumRetailPrice: {
        type: Number,
        required: ["true", "Please provide a product price"],
    },

    discountPercentage: {
        type: Number,
        required: ["true", "Please provide a discount"],
    },

    productPrice: {
        type: Number,
        required: true
    },

    productDescription: {
        type: String
    },

    productImages: [
        {
            publicID: {
                type: String,
                required: true
            },
            secureURL: {
                type: String,
                required: true
            }
        }
    ],

    stock: {
        type: Number,
        required: true,
    },

    sold: {
        type: Number,
        required: true,
    },
    
    collectionID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Collection"
    }
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productsSchema);
export default Product;