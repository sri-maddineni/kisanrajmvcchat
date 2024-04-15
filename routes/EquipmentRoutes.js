import express from "express";
import { requireSignIn, isAdmin, isUser } from "../middlewares/authMiddleware.js";
import {
    createEquipmentCategoryController,
    getEquipmentCategoryController,
    getEquipmentController,
    getEquipmentListing,
    postEquipmentController,
    gethireequipmentcontroller,
    getbuyequipmentcontroller
} from "../controllers/EquipmentController.js";
const router = express.Router();

//routes

router.post('/create-equipment-category', requireSignIn, isUser, isAdmin, createEquipmentCategoryController);
router.post('/post-equipment', requireSignIn, isUser, postEquipmentController);
router.get('/equipment-categories', requireSignIn, isUser, getEquipmentCategoryController);
router.get('/hire-equipment/', requireSignIn, isUser, getEquipmentController);
router.get('/my-equipment-listing/:userId', requireSignIn, isUser, getEquipmentListing);


router.post('/postequipment', requireSignIn, isUser, postEquipmentController)
router.get('/gethireequipment',requireSignIn,isUser, gethireequipmentcontroller)
router.get('/getbuyequipment',requireSignIn,isUser, getbuyequipmentcontroller)
export default router;