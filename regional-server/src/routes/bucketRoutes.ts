import {
  getUserBucket,
  storeUserFunction,
} from "../controllers/bucketController.ts";
import express from "express";

const router = express.Router();

router.get("/user-bucket/:id", getUserBucket);
router.get("/store-function", storeUserFunction);

export default router;
