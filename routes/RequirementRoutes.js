import express from "express";
import { 
    postRequirementController,
    getRequirementController, 
    postPotentialController, 
    getPotentialController, 
    getProductPotentialController,
    postToNegHisRequirementController,
    proposeOfferController,
    declineOfferController,
    negotiateController,
    getAllPotentialsController,
    addidcontroller,
    addtowishlistcontroller,
    removefromorderscontroller,
 } from "../controllers/RequirementController.js";

import { isAdmin, isUser, requireSignIn } from "../middlewares/authMiddleware.js";


const router = express.Router();

//propose offer
router.post("/propose-offer",requireSignIn,isUser,proposeOfferController)



//propose offer
router.post("/decline",declineOfferController)


//register user method post
router.post("/post-requirement", postRequirementController);

//save to neg history for posted requirement
router.post("/post-requirement", postToNegHisRequirementController);

//get requirement based on pid, sellerid, buyerid
router.post("/get-requirement", getRequirementController);


//POST requirement for potential lead method post
router.post("/post-potential",requireSignIn,isUser, postPotentialController);


//get all potentials posted by a user
router.post("/get-potentials",requireSignIn,isUser, getPotentialController);



//get all potentials posted by a user
router.post("/get-product-potentials",requireSignIn,isUser, getProductPotentialController);


//get all potentials posted by a user
router.get("/get-all-potentials",requireSignIn,isUser, getAllPotentialsController);

//post an id to auths proposalssentids 
router.post("/addid",requireSignIn,isUser,addidcontroller)

//wishlist an item
router.post("/addtowishlist",requireSignIn,isUser,addtowishlistcontroller)


//wishlist an item
router.post("/removefromorders",requireSignIn,isUser,removefromorderscontroller)




//post a negotiation to someone
router.post("/negotiate",requireSignIn,isUser,negotiateController)
export default router;
