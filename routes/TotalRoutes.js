import express from "express";
import {
    totaldatacontroller
} from "../controllers/TotalController.js";

import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/alldata",totaldatacontroller)


export default router;
