import express from "express";
import { isAdmin, isUser, requireSignIn } from "../middlewares/authMiddleware.js";
import { createcoldcontroller,getColdController } from "../controllers/ColdStorageController.js";


const router = express.Router();

//create cold storage
router.post("/createcold",requireSignIn,isAdmin, createcoldcontroller); 



router.get("/getcold", getColdController); 




export default router;
