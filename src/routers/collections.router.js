import express from "express";
import cors from "cors";
import { createCollection, getAllCollections } from "../controllers/collections.controller.js";

const router = express.Router();
router.route("/collections").post(createCollection);
router.route("/collections").get(getAllCollections);


export default router;