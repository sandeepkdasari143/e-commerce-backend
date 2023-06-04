import mongoose from "mongoose";

const collectionsSchema = new mongoose.Schema({

}, {
    timestamps: true
});

const Collection = mongoose.model('Collections', collectionsSchema);
export default Collection;