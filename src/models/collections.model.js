import mongoose from "mongoose";

const collectionsSchema = new mongoose.Schema({
    collectionName: {
        type: String,
        required: ["true", "Please provide a collection name"],
        trim: true,
        maxLength: [30, "Collection name should not be under 30 chars"]
    },
    collectionDescription: {
        type: String,
        required: ["true", "Please provide a collection name"],
        trim: true,
        maxLength: [100, "Collection description should not be under 100 chars"]
    },
    products: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            // required: true
    }],
    collectionLogo: {
        publicID: {
            type: String,
            required: true
        },
        secureURL: {
            type: String,
            required: true
        }
    }
},{
    timestamps: true
});

const Collection = mongoose.model('Collections', collectionsSchema);

export default Collection;