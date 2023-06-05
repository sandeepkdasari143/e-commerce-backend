import express from "express";
import { createProduct, getAllProducts, getProductsByCollectionID, getProductByID, deleteProduct, updateProduct } from "../controllers/products.controller.js";

const router = express.Router();
router.route("/products").post(createProduct);
router.route("/products").get(getAllProducts);
router.route("/products/collectionID/:collectionID").get(getProductsByCollectionID);
router.route("/products/:productID").get(getProductByID);
router.route("/product/:productID").get(deleteProduct);
router.route("/product/:productID").post(updateProduct);


export default router;