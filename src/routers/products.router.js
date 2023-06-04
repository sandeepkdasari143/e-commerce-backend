import express from "express";
import { createProduct } from "../controllers/products.controller.js";

const router = express.Router();
router.route("/products").post(createProduct);


export default router;