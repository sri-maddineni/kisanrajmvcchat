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
 } from "../controllers/RequirementController.js";

import { isAdmin, isUser, requireSignIn } from "../middlewares/authMiddleware.js";


const router = express.Router();

//propose offer
router.post("/propose-offer",proposeOfferController)

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




//post a negotiation to someone
router.post("/negotiate",requireSignIn,isUser,negotiateController)
export default router;
