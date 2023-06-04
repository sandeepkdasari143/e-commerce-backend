import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
    productName: {
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

    productPhotos: [
        {
            public_id: {
                type: String,
                required: true
            },
            secure_url: {
                type: String,
                required: true
            }
        }
    ],

    stock: {
        type: Number,
        default: 0
    },

    sold: {
        type: Number,
        default: 0
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