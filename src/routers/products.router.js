import express from "express";
import { createProduct, getAllProducts, getProductsByCollectionID, getProductByID } from "../controllers/products.controller.js";

const router = express.Router();
router.route("/products").post(createProduct);
router.route("/products").get(getAllProducts);
router.route("/products/:collectionID").get(getProductsByCollectionID);
router.route("/product/:productID").get(getProductByID);


export default router;