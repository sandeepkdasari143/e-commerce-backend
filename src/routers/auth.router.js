import express from "express";
import cors from "cors";
const whitelist = ['http://localhost:5173/', 'http://localhost:3000/', 'https://sandeep.fun', 'http://ecommerce.sandeep.fun']
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
        callback(null, true)
        } else {
        callback(new Error('Not allowed by CORS'))
        }
    }
}
const router = express.Router();
try {
    
} catch (error) {
    console.log("Error in Auth Rout:: ", error.message);
}

export default router;