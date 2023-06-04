import express from "express";
import cors from "cors";
import { createCollection, getAllCollections } from "../controllers/collections.controller.js";

const router = express.Router();
try {
    router.route("/collections").post(createCollection);
    router.route("/collections").get(getAllCollections);
} catch (error) {
    console.log("Error in Auth Rout:: ", error.message);
}


export default router;