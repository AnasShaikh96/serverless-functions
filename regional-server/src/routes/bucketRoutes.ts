import {
  deleteUserFunction,
  getUserBucket,
  getUserFunction,
  initUserFunction,
  storeUserFunction,
} from "../controllers/bucketController";
import express from "express";

const router = express.Router();

router.get("/user-bucket/:id", getUserBucket);
router.post("/store-function", storeUserFunction);
router.post('/init-function', initUserFunction)
router.post("/get-function", getUserFunction)


router.delete("/function/:owner/:fnName", deleteUserFunction)

export default router;
