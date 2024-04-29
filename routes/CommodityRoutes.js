import express from "express";
import { requireSignIn, isAdmin, isUser } from "../middlewares/authMiddleware.js"
import {
    createProductController,
    productFilterController,
    updateProductController,
    productPhotoController,
    deleteProductController,
    getProductController,
    getSingleProductController,
    getAllProductController,
    proposedListController,
    addtoorderscontroller,
    proposalsRecievedList,
    getProductsController,
    removefromwishlistcontroller,
    getcatproductscontroller,
    getSameNamedController,
}
    from "../controllers/ProductController.js";
import formidable from "express-formidable";

const router = express.Router();

//routes

router.post('/create-product', requireSignIn, formidable(), createProductController)

//get all posted products only for listings
router.get("/get-posted-products", requireSignIn, getProductController)

//get all products
router.get("/get-all-product", getAllProductController)

//for loggedin user get products to buy
router.get("/get-all-products", requireSignIn, getProductsController)

//get single product
router.get("/get-product/:id", requireSignIn, isUser, getSingleProductController)

//get photo route
router.get("/product-photo/:pid", productPhotoController)

//delete product route
router.get("/delete-product/:pid", deleteProductController)

//update product
router.put("/update-product/:pid", requireSignIn, isUser, formidable(), updateProductController)

//filter routes
router.post("/product-filter", productFilterController)

//proposed list  proposals sent list
router.post("/proposedlist", requireSignIn, isUser, proposedListController)


// proposals recieved list
router.post("/proposals-recieved", requireSignIn, isUser, proposalsRecievedList)


//add to orders
router.post("/addtoorders", requireSignIn, isUser, addtoorderscontroller)

//add to orders
router.post("/removefromwishlist", requireSignIn, isUser, removefromwishlistcontroller)

//get products of same name for oterh sellers in productdetnegotiation page
router.post("/get-same-named",requireSignIn,isUser,getSameNamedController)


//get products based on category slug in params
router.get("/getcatproducts/:product",getcatproductscontroller)






export default router;