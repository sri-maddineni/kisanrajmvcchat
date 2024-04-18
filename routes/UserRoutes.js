import express from "express";
import {
    getUserData,updateUserData,
    followController,
    getalluserscontroller,
    getorderscontroller,
    getBasicDetails
} from "../controllers/authController.js";




const router = express.Router();

////register user method post

router.get("/profile/:uid", getUserData);

//get user basic details
router.get("/profile/basic/:uid",getBasicDetails)

//to get orders of user
router.get("/profile/orders/:uid", getorderscontroller);




//change or edit profile

router.post("/updateuserdata/:uid",updateUserData)

//follow clicking routes
router.post("/follow",followController)

//get all users list
router.get("/getallusers",getalluserscontroller)




export default router;
