import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { createcoldcontroller } from "../controllers/ColdStorageController.js";


const router = express.Router();

//create cold storage
router.post("/createcold",requireSignIn,isAdmin, createcoldcontroller); 


export default router;
