import {
  getUserBucket,
  storeUserFunction,
} from "../controllers/bucketController";
import express from "express";

const router = express.Router();

router.get("/user-bucket/:id", getUserBucket);
router.post("/store-function", storeUserFunction);

export default router;
