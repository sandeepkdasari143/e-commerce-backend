import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fileUpload from 'express-fileupload';
dotenv.config();

const app = express();

// const whitelist = ['http://localhost:5173/']
// const corsOptions = {
//     origin: function (origin, callback) {
//         if (whitelist.indexOf(origin) !== -1) {
//         callback(null, true)
//         } else {
//         callback(new Error('Not allowed by CORS'))
//         }
//     }
// }
app.use(cors({
    origin: "http://localhost:5173/"
}));

app.use(express.json());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/temp"
}));

import authRouter from "./routers/auth.router.js";
import collectionsRouter from "./routers/collections.router.js";
import productsRouter from "./routers/products.router.js";
import ordersRouter from "./routers/orders.router.js";

app.use('/api/v1/', authRouter);
app.use('/api/v1/', collectionsRouter);
app.use('/api/v1/', productsRouter);
app.use('/api/v1/', ordersRouter);

app.get("*", (_req, res) => {
    return res.status(404).json({
        error: true,
        message: "404 Not Found",
    })
})

export default app;